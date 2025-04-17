"use server";
import { cookies } from "next/headers";
import { Product } from "@/types";
import { prisma } from "@/db/prisma";

async function getAllItems() {
  const cookieStore = cookies();
  const sessionCartCookie = (await cookieStore).get("sessionCart")?.value;
  const sessionCart = sessionCartCookie ? JSON.parse(sessionCartCookie) : [];
  return sessionCart;
}

export async function getProductsFromCart() {
  const sessionCart = await getAllItems();

  if (!sessionCart.length) return [];

  const slugs = sessionCart.map((item) => item.product_slug);

  const products = await prisma.product.findMany({
    where: {
      slug: { in: slugs },
    },
  });
  return products.map((product) => ({
    ...product,
    quantity:
      sessionCart.find((item) => item.product_slug === product.slug)
        ?.quantity || 1,
  }));
}

export async function addItemToCart(product: Product, quantity: number) {
  try {
    const cookieStore = cookies();
    const sessionCart = await getAllItems();

    const existingItem = sessionCart.find(
      (item: any) => item.product_slug === product.slug
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      sessionCart.push({ product_slug: product.slug, quantity });
    }

    (await cookieStore).set("sessionCart", JSON.stringify(sessionCart), {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (error) {
    console.error("Error while adding product in cart", error);
  }
}

export async function updateCartItemQuantity(
  productSlug: string,
  newQuantity: number
) {
  const cookieStore = cookies();
  const sessionCartCookie = (await cookieStore).get("sessionCart")?.value;
  const sessionCart = sessionCartCookie ? JSON.parse(sessionCartCookie) : [];

  const updatedCart = sessionCart.map((item) =>
    item.product_slug === productSlug
      ? { ...item, quantity: newQuantity }
      : item
  );

  (await cookieStore).set("sessionCart", JSON.stringify(updatedCart), {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7days
  });

  return updatedCart;
}

export async function removeItemFromCart(productSlug: string) {
  const cookieStore = cookies();
  const sessionCartCookie = (await cookieStore).get("sessionCart")?.value;
  const sessionCart = sessionCartCookie ? JSON.parse(sessionCartCookie) : [];

  const updatedCart = sessionCart.filter(
    (item) => item.product_slug !== productSlug
  );

  (await cookieStore).set("sessionCart", JSON.stringify(updatedCart), {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return updatedCart;
}

export async function clearCart() {
  "use server";
  const cookieStore = await cookies();

  cookieStore.set("sessionCart", "", {
    expires: new Date(0), // Set to epoch time to effectively delete
    path: "/",
  });
  return { success: true };
}
