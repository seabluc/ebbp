// route handler for selecting a specific record of a particular product
import { productControllers } from "@/controllers";

export async function GET(_request, { params }) {
  const { category, id } = params; // /products/category/id
  // would it be better if i use URL query parameters instead of using params?
  // nah query parameters are for searching, sorting/filtering, and pagination.

  const product = await productControllers[category].getOne(id);
  const productString = `\nsrc/app/products/api/[category]/[id]/route.js - PRODUCT SELECTED: ${product.Part.name}\n${JSON.stringify(product)} \n`;
  console.log(productString);

  //const product = await JSON.stringify(productControllers[category].getOne(id));
  //const productString = `\n PRODUCT SELECTED: ${product}\n`;
  //console.log(productString);
  //return new Response(product); // prints [object Object]. Response expects a string, JSON.stringify to turn object into string

  return new Response(JSON.stringify(product)); // apply .JSON() to turn string back into a JS object (in AddButton.js)

  //return new Response(product);
}
