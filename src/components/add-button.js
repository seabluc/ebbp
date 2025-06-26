'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import useBuildStore from "@/lib/useBuildStore";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const AddButton = ({ category, id }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { addCpu, addMotherboard, addMemory, addStorage,
    addVideoCard, addCpuCooler, addPowerSupply } = useBuildStore();

  // add a PC part to build
  const handleAdd = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/products/api/${category}/${id}`);
      const product = await response.json();
      console.log(`\nsrc/components/ui/AddButton.js - PRODUCT RETRIEVED: 
        ${product.part.name}\n${JSON.stringify(product)}\n`);

      if (product) {
        switch (product.part.type) {
          case 'CPU': addCpu(product); break;
          case 'Motherboard': addMotherboard(product); break;
          case 'Memory': addMemory(product); break;
          case 'Storage': addStorage(product); break;
          case 'Video Card': addVideoCard(product); break;
          case 'CPU Cooler': addCpuCooler(product); break;
          case 'Power Supply': addPowerSupply(product); break;
        }
        router.push("/workshop"); // WorkshopTable shows newly added PC part
      }
    } catch (err) {
      console.error("Error retrieving PC part:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      className="border-1 border-black/25 dark:border-white/50 p-2 md:ml-0 w-28 md:w-32 bg-[#DBAE58] hover:bg-[#E4C577] shadow-md font-semibold text-base text-black"
      onClick={handleAdd}
      disabled={loading}
    >
      {loading ? (<Loader2 className="size-2 animate-spin" />) : ("Add to Build")}
    </Button>
  );
}

export default AddButton;