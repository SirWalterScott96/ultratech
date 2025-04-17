"use client";
import { useEffect, useState } from "react";
import ProductModal from "./product-modal";
import {
  getProductsFromCart,
  removeItemFromCart,
  updateCartItemQuantity,
} from "@/lib/actions/cart.action";
import { Product } from "@/types";
import type { CartItem } from "@/types";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";

const OrderList = ({ className }: { className?: string }) => {
  const t = useTranslations("LinksAndGeneral");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [removedItems, setRemovedItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const products = await getProductsFromCart();
      setCartItems(products);
    };
    fetchCartItems();
  }, []);

  const handleQuantityChange = async (
    product: Product,
    newQuantity: number
  ) => {
    try {
      await updateCartItemQuantity(product.slug, newQuantity);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.slug === product.slug ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Помилка оновлення кількості:", error);
    }
  };

  const handleRemoveItem = async (product: Product) => {
    try {
      setRemovedItems((prev) => [...prev, product.slug]);

      await removeItemFromCart(product.slug);

      setTimeout(() => {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.slug !== product.slug)
        );
        setRemovedItems((prev) => prev.filter((slug) => slug !== product.slug));
      }, 300);
    } catch (error) {
      console.error("Помилка видалення товару:", error);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <div className={className}>
      <div>
        {cartItems.map((product) => (
          <ProductModal
            key={product.slug}
            product={product}
            onQuantityChange={(qty) => handleQuantityChange(product, qty)}
            onRemove={() => handleRemoveItem(product)}
            isRemoving={removedItems.includes(product.slug)}
          />
        ))}
      </div>
      {/* Total Price */}
      <div className="flex justify-between items-center border-t pt-4">
        <span className="text-lg font-bold">{parse(t("fullPrice"))}:</span>
        <span className="text-xl font-bold text-blue-600">
          {totalPrice.toLocaleString()} грн
        </span>
      </div>
    </div>
  );
};

export default OrderList;
