import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get("sessionCart");

  let products = [];

  if (cartCookie && cartCookie.value) {
    try {
      products = JSON.parse(cartCookie.value);
    } catch (error) {
      console.error("Error parsing cart cookie:", error);
    }
  }

  return NextResponse.json({ products });
}
