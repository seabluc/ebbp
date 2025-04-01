import AddButton from "./AddButton";
import { productControllers } from "@/controllers";

export const dynamic = "force-dynamic";

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
  {/*<tr key={item[`${category}Id`]} className="border-4 border-double bg-cyan-100">*/ }
  {/*<AddButton category={category} id={item[`${category}Id`]} />*/ }
  return (
    <table className="flex flex-col items-center">
      <thead>
        <tr>
          <th className="pt-2 text-2xl">{category} name</th>
        </tr>
      </thead>
      <tbody>
        {parts.map((item) => (
          <tr key={item[primaryKey]} className="border-4 border-double bg-cyan-100">
            <td className="pl-3 py-1">
              <div className="flex items-center">
                <img src={item.Part?.image} alt="o nooo" width="50" height="50" className="mr-2" />
                {item.Part?.name}
                <AddButton category={category} id={item[primaryKey]} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProductTable