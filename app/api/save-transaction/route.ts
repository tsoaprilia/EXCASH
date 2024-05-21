import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { transactionDetails, nominalPayment } = await req.json();

    const transactionTotal = await prisma.$transaction(async (prisma) => {
      const productUpdates = transactionDetails.map(async (detail: any) => {
        const product = await prisma.product.findUnique({ where: { id: detail.productId } });
        if (!product) throw new Error("Product not found");
        if (product.stock < detail.quantity) throw new Error("Insufficient stock");
        const updatedProduct = await prisma.product.update({
          where: { id: detail.productId },
          data: { stock: product.stock - detail.quantity },
        });
        return { ...updatedProduct, quantity: detail.quantity, price: detail.price };
      });

      const updatedProducts = await Promise.all(productUpdates);
      const total = updatedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);

      const transaction = await prisma.transactionRecord.create({
        data: {
          nominalPayment,
          total,
          change: nominalPayment - total,
          transactionDetails: {
            create: updatedProducts.map(product => ({
              productId: product.id,
              quantity: product.quantity,
              price: product.price,
            })),
          },
        },
      });

      return transaction;
    });

    return NextResponse.json(transactionTotal, { status: 200 });
  } catch (error) {
    console.error("Error saving transaction:", error);
    
    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fallback in case error is not an instance of Error
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
