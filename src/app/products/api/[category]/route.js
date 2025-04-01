import { productControllers } from "@/controllers";

export async function GET(_request, { params }) {
  //const { category } = params;
  
  const products = await productControllers[params.category].getAll();
  //const products = await productControllers[category].getAll();
  //const product = await productControllers[category].getOne(id);
  
  //return new Response(products); // prints [object Object],[object Object],...
  return new Response(JSON.stringify(products)); // prints all Cpu records

  //return new Response(category); // prints cpu if const { category } = params;
  //return new Response(params.category); // prints cpu
}