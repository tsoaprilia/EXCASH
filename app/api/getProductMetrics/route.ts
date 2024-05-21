import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany();
    console.log(products); // Add this line to debug the fetched products
    const totalProducts = products.length;
    const totalStock = products.reduce((acc, product) => acc + product.stock, 0);

    return NextResponse.json({ totalProducts, totalStock, products });
  } catch (error) {
    console.error("Failed to fetch product metrics:", error);
    return NextResponse.json({ message: "Failed to fetch product metrics" }, { status: 500 });
  }
}

