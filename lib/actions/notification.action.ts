"use server";

import { CartItem } from "@/types";

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ||
  "6608413775:AAF8wsU_g3rquvY8ox4aY6YCylEGk2CoKe0";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "-4064558372";
const EMAIL_RECIPIENT =
  process.env.EMAIL_RECIPIENT || "elrctronikone@gmail.com";

type OrderData = {
  fullName: string;
  phoneNumber: string;
  product?: string;
  products?: CartItem[];
  price?: string;
  city?: string;
  warehouse?: string;
};

// Utility function to sanitize message
function sanitizeMessage(message: string): string {
  return message.replace(/-/g, "").replace(/;/g, ",").replace(/\+/g, "&#43;");
}

// Send message to Telegram
export default async function sendTelegramMessage(
  order: OrderData,
  isMainOrder = false
) {
  const message = isMainOrder
    ? await createMainMessage(order)
    : await createSmallMessage(order);
  const sanitizedMessage = sanitizeMessage(message);
  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(
      `${telegramUrl}?chat_id=${TELEGRAM_CHAT_ID}&parse_mode=html&text=${encodeURIComponent(
        sanitizedMessage
      )}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Telegram message sending failed");
    }
    return true;
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    return false;
  }
}

// Main function for creating a small message
async function createSmallMessage(data: OrderData) {
  const { fullName, phoneNumber, product, price } = data;

  // Prepare message
  const message = `
  📱 Нове замовлення:
  📞 Телефон: ${phoneNumber}
  👤 Ім'я: ${fullName || "Не вказано"} 
  📦 Товар: ${product || "Не вказано"} 
  💵 Ціна: ${price || "Не вказано"} грн
  🌐 Сайт: ${process.env.NEXT_PUBLIC_SITE_URL || "Невідомо"}
  `.trim();

  return message;
}

// Main function for creating a main message
async function createMainMessage(data: OrderData) {
  const { fullName, phoneNumber, products = [], city, warehouse } = data;

  const productsList = products
    .map((product) => {
      return `📦 ${product.fullName} - ${product.quantity} шт. - ${
        product.price * product.quantity
      } грн`;
    })
    .join("\n  ");

  const message = `
  📱 Нове замовлення:
  📞 Телефон: ${phoneNumber}
  👤 Ім'я: ${fullName || "Не вказано"} 
  🛒 Товари:
  ${productsList || "Не вказано"}
  🏙️ Місто: ${city || "Не вказано"}
  🏤 Відділення: ${warehouse || "Не вказано"}
  🌐 Сайт: ${process.env.NEXT_PUBLIC_SITE_URL || "Невідомо"}
  `.trim();

  return message;
}
