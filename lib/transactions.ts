// lib/transactions.ts
import { prisma } from "@/lib/prisma";

export const saveTransaction = async (transactionDetails: { productId: string, quantity: number, price: number }[], nominalPayment: number) => {
  try {
    const transactionTotal = await prisma.$transaction(async (prisma) => {
      const productUpdates = transactionDetails.map(async (detail) => {
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

    return transactionTotal;
  } catch (error) {
    console.error("Error saving transaction:", error);
    throw error;
  }
};
