"use server"
import { z } from 'zod';
import {del, put} from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma'; 
import { getProductById } from './data';

const ProductSchema = z.object({
  nameProduct: z.string(),
  description: z.string(),
  price: z.number().int(),
  stock: z.number().int().min(1),
  image: z
  .instanceof(File)
  .refine((file) => file.size > 0, {message: "image is required"})
  .refine((file) => file.size === 0 || file.type.startsWith("image/"), {message: "only images are allowed"})
  .refine((file) => file.size < 10000000, {message: "Image must less than 4MB"}),
});

export const saveProduct = async (prevState: any, formData: FormData) => {
  
  const validatedFields = ProductSchema.safeParse({
    nameProduct: formData.get('nameProduct') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')), 
    stock: Number(formData.get('stock')), 
    image: formData.get('image') as File,
  })

  

  if(!validatedFields.success){
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const {nameProduct,description, price, stock, image} = validatedFields.data
  const {url} = await put(image.name, image, {
    access: "public",
    multipart: true
  });

  try{

    await prisma.product.create({
      data: {
        nameProduct: validatedFields.data.nameProduct,
        description: validatedFields.data.description,
        price: validatedFields.data.price,
        stock: validatedFields.data.stock,
        image: url,
      }
    });

  }catch(error){
    return {message : "Create error",error}
  }
  revalidatePath('/products');
  redirect('/products');
};

export const updateProduct = async (id:string, prevState: any, formData: FormData) => {
  
  const validatedFields = ProductSchema.safeParse({
    nameProduct: formData.get('nameProduct') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')), 
    stock: Number(formData.get('stock')), 
    image: formData.get('image') as File,
  })

  

  if(!validatedFields.success){
    return {
      Error: validatedFields.error.flatten().fieldErrors,
      image: undefined,
    }
  }

  const product = await getProductById(id);
  if(!product) return {message: "No Data Found"};

  const {nameProduct,description, price, stock, image} = validatedFields.data
  let imagePath;
  if(!image || image.size <= 0){
    imagePath = product.image;
  }else{
    await del(product.image);
    const {url} = await put(image.name, image,{
      access: "public",
      multipart: true,
    });
    imagePath= url;
  }
  

  try{
    await prisma.product.update({
      data: {
        nameProduct: validatedFields.data.nameProduct,
        description: validatedFields.data.description,
        price: validatedFields.data.price,
        stock: validatedFields.data.stock,
        image: imagePath,
      },
      where:{id}
    });

  }catch(error){
    return {message : "update error",error}
  }
  revalidatePath('/products');
  redirect('/products');
};

export const deleteProduct = async (id:string) => {
  try{
    await prisma.product.delete({
      where:{id}
    });

  }catch(error){
    return {message : "delete error"}
  }
  revalidatePath('/products');
};
