//import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  return {
    title: `Products - ${params.productId}`,
  };
}

export default async function Products({ params }) {
  //const { category } = params;
  //const categories = ["cpu", "cpu-cooler", "motherboard", "memory", "power-supply", "storage", "video-card"];
  //if (!categories.includes(category)) {
  //  return notFound(); // 404 page
  //}
  //const products = await getProduct(category);

  //params.productId is what contains the slug thingy

  // access params key insode of the props of your component. in this case: params.productId
  // so if params.productId = cpu we would be at products/cpu... huge.
  // access the URL searchParams as well inside of the props for pages. i.e export default function Page({ params, searchParams }) {}

  // now that we've got routes to find like products/cpu, products/memory, products/cpu/2... 
  // we want to handle the navigation between all of these routes via built-in Next.js Link component
  // <Link href="/products/cpu">I already knew about this??</Link>

  const partId = (await params).productId;
  return (
    <div>
      <div>src/app/products/[category]/[productId]/page.js</div>
      <div>const partId = &#40;await params&#41;.productId</div>
      <div>partId={partId}</div>
      <div>params.productId: {params.productId}</div>
    </div>
  )
}