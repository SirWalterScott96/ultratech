"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";
import ProductFilters from "./product-filter";
import { useState } from "react";

interface MobileFilterButtonProps {
  brands: string[];
  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
  resetFilters: () => void;
}

const MobileFilterButton = ({
  brands,
  selectedBrands,
  toggleBrand,
  resetFilters,
}: MobileFilterButtonProps) => {
  const t = useTranslations("LinksAndGeneral");
  const [open, setOpen] = useState(false);

  const handleToggleBrand = (brand: string) => {
    toggleBrand(brand);
    setOpen(false);
  };

  const handleResetFilters = () => {
    resetFilters();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 md:hidden">
          <SlidersHorizontal />
          {parse(t("filter"))}
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-2xl">{parse(t("filter"))}</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="mt-4 flex justify-center">
          <ProductFilters
            brands={brands}
            selectedBrands={selectedBrands}
            toggleBrand={handleToggleBrand}
            resetFilters={handleResetFilters}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterButton;
