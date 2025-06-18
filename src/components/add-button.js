'use client'

import { useRouter } from "next/navigation";
import useBuildStore from "@/lib/useBuildStore";
import { Button } from "@/components/ui/button";

const AddButton = ({ category, id }) => {
  const router = useRouter();
  const { addCpu, addMotherboard, addMemory, addStorage,
    addVideoCard, addCpuCooler, addPowerSupply } = useBuildStore();

  // add a PC part to build
  const handleAdd = async () => {
    try {
      const response = await fetch(`/products/api/${category}/${id}`);
      const product = await response.json();
      console.log(`\nsrc/components/ui/AddButton.js - PRODUCT RETRIEVED: ${product.part.name}\n${JSON.stringify(product)}\n`);

      if (product) {
        switch (product.part.type) {
          case 'CPU':
            addCpu(product);
            break;
          case 'Motherboard':
            addMotherboard(product);
            break;
          case 'Memory':
            addMemory(product);
            break;
          case 'Storage':
            addStorage(product);
            break;
          case 'Video Card':
            addVideoCard(product);
            break;
          case 'CPU Cooler':
            addCpuCooler(product);
            break;
          case 'Power Supply':
            addPowerSupply(product);
            break;
        }
        //router.push("/workshop"); // navigate to workshop, revealing the fetched PC part on table
        router.push("/workshop"); // navigate to workshop, revealing the fetched PC part on table
      }
    } catch (error) {
      console.error("Error retrieving PC part:", error);
    }
  };

  return (
    <Button
      className="border-2 md:ml-2 p-2 bg-[#DBAE58] hover:bg-[#E4C577] text-black shadow-md"
      onClick={handleAdd}>
      Add to Build
    </Button>
  )
}

export default AddButton;