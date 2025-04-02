"use client";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import CartModal from "../cart/cart-modal";
import { Badge } from "@/components/ui/badge";
import { getProductsFromCart } from "@/lib/actions/cart.action";

const MyCart = () => {
  const [open, setOpen] = useState(false);
  const [lengthCart, setLengthCart] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProductInCart = await getProductsFromCart();
        setLengthCart(allProductInCart.length);
      } catch (error) {
        console.error("Помилка при отриманні продуктів з кошика", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        <div className="flex items-center gap-2 relative">
          <Badge className="absolute bg-blue-500 -top-2 -left-3 rounded-full">
            {lengthCart}
          </Badge>
          <ShoppingCart width={36} height={36} />
          Мій Кошик
        </div>
      </div>
      <CartModal open={open} setOpen={setOpen} />
    </>
  );
};

export default MyCart;
