"use client";
import ProductCard from "@/components/shared/product/product-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchByCategory = searchParams.get("searchByCategory") || "all";

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategoryOption = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/product-search?searchByCategory=${searchByCategory}`
        );
        if (!response.ok) throw new Error("Failed to fetch category options");

        const data: Product[] = await response.json();
        setProducts(data);
        setFilteredProducts(data);

        const uniqueBrands = [...new Set(data.map((product) => product.brand))];
        setBrands(uniqueBrands);
      } catch (error) {
        console.error("Error fetching category options:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategoryOption();
  }, [searchByCategory]);

  useEffect(() => {
    if (selectedBrands.length === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => selectedBrands.includes(product.brand))
      );
    }
  }, [selectedBrands, products]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedBrands([]);
  };

  return (
    <div className="wrapper flex gap-6 my-5 h-fit">
      <div className="w-1/4 p-4 border rounded-md shadow-md h-fit">
        <h2 className="text-lg font-bold mb-3">Фільтр за брендом</h2>
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
          <p>Бренди не знайдені</p>
        )}
        <Button variant="outline" onClick={resetFilters} className="mt-4">
          Скинути фільтри
        </Button>
      </div>
      <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <p className="text-lg font-semibold">Триває пошук...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))
        ) : (
          <p>Немає товарів, що відповідають фільтрам.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
