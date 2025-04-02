// api/product-search.ts
import { NextResponse } from "next/server";
import { CategoryEnum } from "@/validation/schema";
import {
  getAllProducts,
  getProductsByCategory,
} from "@/lib/actions/products.action";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchByCategory = searchParams.get("searchByCategory");
  const validateCategory = CategoryEnum.safeParse(searchByCategory);
  try {
    if (!searchByCategory)
      return NextResponse.json(
        { message: "searchByCategory parameter is required" },
        { status: 400 }
      );

    if (searchByCategory === "all") {
      const response = await getAllProducts();
      return NextResponse.json(response);
    } else if (validateCategory.success) {
      const response = await getProductsByCategory({
        category: validateCategory.data,
      });
      return NextResponse.json(response);
    } else {
      return NextResponse.json(
        { message: "Invalid query param" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("Error while fetching search option:", error);
    return NextResponse.json(
      { message: "Failed to fetch search option" },
      { status: 500 }
    );
  }
}
