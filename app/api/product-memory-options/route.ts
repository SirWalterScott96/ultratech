// api/device-memory-options.ts
import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const baseModel = searchParams.get("baseModel");

  if (!baseModel) {
    return NextResponse.json(
      { message: "baseModel parameter is required" },
      { status: 400 }
    );
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        model: baseModel,
      },
      select: {
        slug: true,
        memory: true,
      },
    });

    const memoryOptions = products
      .filter((product) => product.memory !== null)
      .map((product) => ({
        memory: product.memory as number,
        slug: product.slug,
      }))
      .sort((a, b) => a.memory - b.memory);

    return NextResponse.json(memoryOptions);
  } catch (error) {
    console.error("Error fetching memory options:", error);
    return NextResponse.json(
      { message: "Failed to fetch memory options" },
      { status: 500 }
    );
  }
}
