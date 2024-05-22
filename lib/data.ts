import {prisma} from "@/lib/prisma";
import { describe } from "node:test";

const ITEMS_PER_PAGE = 3;

export const getProducts = async (query: string, currentPage: number) =>{
    const offset = (currentPage - 1)* ITEMS_PER_PAGE;
    try{
        const products = await prisma.product.findMany({
            skip: offset,
            take: ITEMS_PER_PAGE,
            where:{
                OR:[{
                    nameProduct: {
                        contains: query,
                        mode: "insensitive"
                    }
                }, 
            {
                description: {
                    contains: query,
                    mode: "insensitive"
                }
            }, 
            // {
            //     stock: {
            //         equals: parseInt(query)
            //     }
            // }, 
        ]
            }
        });
        return products;
    } catch(error){
        throw new Error("Failed to fetch product data");
    }
}

export const getProductById = async(id: string) =>{
    try{
        const product = await prisma.product.findUnique({
            where: {
                id
            },
        });
        return product;
        }catch (error){
            throw new Error("Failed to fetch contact data");
    }
};

export const getProductsPages = async (query: string) =>{
    try{
        const products = await prisma.product.count({
            where:{
                OR:[{
                    nameProduct: {
                        contains: query,
                        mode: "insensitive"
                    }
                }, 
            {
                description: {
                    contains: query,
                    mode: "insensitive"
                }
            }, 
            // {
            //     stock: {
            //         equals: parseInt(query)
            //     }
            // }, 
        ]
            }
        });
        const totalPages = Math.ceil(Number(products) / ITEMS_PER_PAGE)

        return totalPages;
    } catch(error){
        throw new Error("Failed to fetch product data");
    }
}



export const getTransactionRecords = async () => {
  try {
      const transactions = await prisma.transactionRecord.findMany({
          include: {
              transactionDetails: {
                  include: {
                      product: true,
                  },
              },
          },
      });
      return transactions.map(transaction => ({
          ...transaction,
          total: transaction.transactionDetails.reduce((acc, item) => acc + item.quantity * item.price, 0),
      }));
  } catch (error) {
      throw new Error("Failed to fetch transaction records");
  }
};
  // export const getTransactionRecords = async () => {
  //   try {
  //     const transactions = await prisma.transactionRecord.findMany({
  //       include: {
  //         transactionDetails: {
  //           include: {
  //             product: true,
  //           },
  //         },
  //       },
  //     });
  //     return transactions.map(transaction => ({
  //       ...transaction,
  //       total: transaction.transactionDetails.reduce((acc, item) => acc + item.quantity * item.price, 0),
  //     }));
  //   } catch (error) {
  //     throw new Error("Failed to fetch transaction records");
  //   }
  // };

//dashboard
export const getProductMetrics = async () => {
    try {
      const response = await fetch('/api/getProductMetrics');
      if (!response.ok) {
        throw new Error('Failed to fetch product metrics');
      }
      const data = await response.json();
      console.log(data); // Add this line to debug the fetched data
      return data;
    } catch (error) {
      console.error("Failed to fetch product metrics:", error);
      throw new Error("Failed to fetch product metrics");
    }
  };
  
//   export const getTransactionMetrics = async () => {
//     try {
//       const response = await fetch('/api/getTransactionMetrics');
//       if (!response.ok) {
//         throw new Error('Failed to fetch transaction metrics');
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Failed to fetch transaction metrics:", error);
//       throw new Error("Failed to fetch transaction metrics");
//     }
//   };