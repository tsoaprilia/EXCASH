import UpdateForm from "@/components/edit-form";
import { getProductById } from "@/lib/data";
import { notFound } from "next/navigation";
const UpdateProductPage = async({params}: {params:{id:string}}) => {
    const id = params.id;
    const product = await getProductById(id);

    if(!product){
        notFound();
    }
   return(
    <div className="flex-1 pt-20 ml-10 pl-60 mr-10">
    <h1 className="mb-10 font-bold text-2xl">UPDATE PRODUCT</h1> 
            <UpdateForm product={product}/>
         </div>
   ); 
}

export default UpdateProductPage;