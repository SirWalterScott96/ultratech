"use client";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { addItemToCart } from "@/lib/actions/cart.action";
import CartModal from "./cart-modal";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";

const AddToCart = ({
  product,
  quantity,
  className = "",
}: {
  product: Product;
  quantity: number;
  className: string;
}) => {
  const t = useTranslations("LinksAndGeneral");
  const [open, setOpen] = useState(false);
  const addItem = useCallback(async () => {
    await addItemToCart(product, quantity);
    setOpen(true);
  }, [product, quantity]);

  return (
    <>
      <Button onClick={addItem} className={className}>
        {parse(t("buy"))}
      </Button>
      <CartModal open={open} setOpen={setOpen} />
    </>
  );
};

export default AddToCart;
