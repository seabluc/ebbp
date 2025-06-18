
import {
  Table,
  TableBody,
  TableCaption,
  TableFooter, //might not need this
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
//import { Skeleton } from "@/components/ui/skeleton";
import AddButton from "@/components/add-button";
import { productControllers } from "@/controllers";
import React from "react";

export const dynamic = "force-dynamic"; // keep until revalidation/caching strats are implemented (revalidate for ISR)..? 

async function getProducts(category) {
  /*
  return (productControllers[category]) ?
    await productControllers[category].getAll() : null;
    implement error handling soon
  */
  return await productControllers[category].getAll();
}

const ProductTable = async ({ category }) => {
  const parts = await getProducts(category);

  const categoryIdMap = {
    "video-card": "videoCardId",
    "cpu-cooler": "cpuCoolerId",
    "power-supply": "psuId"
  };

  const primaryKey = categoryIdMap[category] || `${category}Id`;

  return (
    <Table className="flex flex-col items-center border-4">
      {/*<Skeleton />*/}
      <TableCaption className="text-2xl">Select a {category.charAt(0).toUpperCase() + category.slice(1)}</TableCaption>
      <TableHeader className="border-2">
        <TableRow>
          <TableHead className="text-xl">ye</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {parts.map((item) => (
          <TableRow key={item[primaryKey]} className="border-4 border-double bg-cyan-200">
            <TableCell className="flex flex-row items-center pl-3 py-1">
              <>
                <img src={item.Part?.image} alt="o nooo" width="50" height="50" className="mr-2" />
                {item.Part?.name}
                <AddButton category={category} id={item[primaryKey]} />
              </>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ProductTable