import { productControllers } from "@/controllers";

export async function GET(_request, { params }) {
  const { category, id } = params; // /products/category/id
  const product = await productControllers[category].getOne(id);
  console.log(product);
  //return new Response(product); // prints [object Object]. Response expects a string, JSON.stringify to turn object into string
  return new Response(JSON.stringify(product)); // apply .JSON() to turn string back into a JS object (in AddButton.js)
}
