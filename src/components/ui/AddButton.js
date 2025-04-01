'use client'
import { useRouter } from "next/navigation";

const AddButton = ({ category, id }) => {
  const router = useRouter();

  const handleAdd = async () => {
    try {
      //const product = (await fetch(`/products/api/${category}/${id}`)).json();
      const response = await fetch(`/products/api/${category}/${id}`);
      const product = await response.json();

      if (product) {
        router.push("/workshop"); // navigate to workshop, revealing the fetched PC part on table
      }
    } catch (error) {
      console.error("Error retrieving PC part:", error);
    }
  };

  return (
    <button className="border-2 ml-2 p-1" onClick={handleAdd}>
      Add to Build
    </button>
  )
}

export default AddButton