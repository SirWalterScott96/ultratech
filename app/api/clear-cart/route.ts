import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set("sessionCart", "", {
    expires: new Date(0), // Set to epoch time to effectively delete
    path: "/",
  });

  return NextResponse.json({ success: true });
}
