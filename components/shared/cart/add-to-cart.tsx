"use client";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { addItemToCart } from "@/lib/actions/cart.action";
import CartModal from "./cart-modal";

const AddToCart = ({
  product,
  quantity,
  className = "",
}: {
  product: Product;
  quantity: number;
  className: string;
}) => {
  const [open, setOpen] = useState(false);
  const addItem = useCallback(async () => {
    await addItemToCart(product, quantity);
    setOpen(true);
  }, [product, quantity]);

  return (
    <>
      <Button onClick={addItem} className={className}>
        Купити
      </Button>
      <CartModal open={open} setOpen={setOpen} />
    </>
  );
};

export default AddToCart;
