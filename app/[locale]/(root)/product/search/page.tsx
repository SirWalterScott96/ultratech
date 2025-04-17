"use client";
import { Product } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MobileFilterButton from "@/components/shared/search/product-mobile-filter";
import ProductFilters from "@/components/shared/search/product-filter";
import ProductsGrid from "@/components/shared/search/products-grid";

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
    <div className="wrapper my-5">
      <div className="mb-4">
        <MobileFilterButton
          brands={brands}
          selectedBrands={selectedBrands}
          toggleBrand={toggleBrand}
          resetFilters={resetFilters}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="hidden md:block md:w-1/4">
          <ProductFilters
            brands={brands}
            selectedBrands={selectedBrands}
            toggleBrand={toggleBrand}
            resetFilters={resetFilters}
          />
        </div>

        <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProductsGrid
            isLoading={isLoading}
            filteredProducts={filteredProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
