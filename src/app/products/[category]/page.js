// should I make this the page.js in /products/ and move my route handlers into [category] and [id]?
import { notFound } from "next/navigation";
import ProductTable from "@/components/ui/ProductTable";
import { Suspense } from "react";
import TableSkeleton from "./loading";
//import { sequelize } from "@/models";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  return {
    title: `Products - ${params.category}`,
  };
}

// async function getProducts(category) {
//   switch (category) {
//     case "cpu":
//       return await getAllCpus();
//     case "motherboard":
//     //return await getAllMotherboards();
//     case "memory":
//     //return await getAllMemory();
//     case "storage":
//     //return await getAllStorage();
//     case "video-card":
//     //return await getAllVideoCards();
//     case "cpu-cooler":
//     //return await getAllCpuCoolers();
//     case "power-supply":
//     //return await getAllPowerSupplies();
//   }
// }

export default async function Products({ params }) {
  //const validCategories = Object.keys(sequelize.models);
  const validCategories = [
    'cpu', 'motherboard', 'memory', 'storage', 'video-card', 'cpu-cooler', 'power-supply'
  ];

  if (!validCategories.includes(params.category)) {
    return notFound();
  }

  //const parts = await getProducts(params.category);

  {/*<Suspense fallback={<h2 className="text-2xl">Loading...</h2>}>*/}
  {/*<Suspense fallback={<ProductTable category={'LOADING...'} />}>*/}
  return (
    <Suspense fallback={<TableSkeleton />}>
      <ProductTable category={params.category} />
    </Suspense>
  );
}