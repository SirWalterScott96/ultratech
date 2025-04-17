"use client";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import CartModal from "../cart/cart-modal";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";
import { usePathname, useSearchParams } from "next/navigation";

interface MyCartProps {
  isMobile?: boolean;
}

const MyCart = ({ isMobile = false }: MyCartProps) => {
  const t = useTranslations("LinksAndGeneral");
  const [open, setOpen] = useState(false);
  const [lengthCart, setLengthCart] = useState(0);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Add a navigation key for better debugging
  const navigationKey = `${pathname}?${searchParams}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // Add cache: 'no-store' to prevent caching
          cache: "no-store",
        });

        if (response.ok) {
          const data = await response.json();
          setLengthCart(data.products.length);
        } else {
          console.error("Failed to fetch cart data:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchData();
  }, [navigationKey, open]); // Using navigationKey instead of separate dependencies

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        <div className="flex items-center gap-2 relative">
          <Badge className="absolute bg-blue-500 -top-2 -left-3 rounded-full">
            {lengthCart}
          </Badge>
          <ShoppingCart width={36} height={36} className="w-[24px]" />
          {!isMobile && parse(t("cart"))}
        </div>
      </div>
      <CartModal open={open} setOpen={setOpen} />
    </>
  );
};

export default MyCart;
