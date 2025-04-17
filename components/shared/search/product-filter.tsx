"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";

interface ProductFiltersProps {
  brands: string[];
  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
  resetFilters: () => void;
}

const ProductFilters = ({
  brands,
  selectedBrands,
  toggleBrand,
  resetFilters,
}: ProductFiltersProps) => {
  const t = useTranslations("LinksAndGeneral");

  return (
    <div className="p-4 border rounded-md shadow-md h-fit">
      <h2 className="text-lg font-bold mb-3">{parse(t("filterByBrand"))}</h2>
      {brands.length > 0 ? (
        brands.map((brand) => (
          <div key={brand} className="flex items-center gap-2 mb-2">
            <Checkbox
              checked={selectedBrands.includes(brand)}
              onCheckedChange={() => toggleBrand(brand)}
            />
            <span>{brand}</span>
          </div>
        ))
      ) : (
        <p>{parse(t("brandNotFound"))}</p>
      )}
      <Button variant="outline" onClick={resetFilters} className="mt-4 w-full">
        {parse(t("resetFilter"))}
      </Button>
    </div>
  );
};

export default ProductFilters;
