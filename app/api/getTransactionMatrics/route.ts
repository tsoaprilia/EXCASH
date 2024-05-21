// /pages/api/getTransactionMetrics.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const transactions = await prisma.transactionRecord.findMany({
      include: {
        transactionDetails: true,
      },
    });

    const totalRevenue = transactions.reduce((acc, transaction) => acc + transaction.total, 0);

    return NextResponse.json({
      totalTransactions: transactions.length,
      totalRevenue,
      transactions,
    });
  } catch (error) {
    console.error("Failed to fetch transaction metrics:", error);
    return NextResponse.json({ message: "Failed to fetch transaction metrics" }, { status: 500 });
  }
}
