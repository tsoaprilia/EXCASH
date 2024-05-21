import { NextApiRequest, NextApiResponse } from 'next';
import { saveTransaction } from '@/lib/transactions';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { transactionDetails, nominalPayment } = req.body;

    try {
      console.log('API endpoint called with:', req.body);
      const transaction = await saveTransaction(transactionDetails, nominalPayment);
      res.status(200).json(transaction);
    } catch (error: unknown) {
      console.error('Error in API handler:', error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
