// move this page.js to app/products/,and move my route handlers into [category] and [id]?
import { notFound } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { productControllers } from "@/controllers";
import { productColumns } from "@/lib/columns";
import Link from "next/link";
import { ArrowUpToLine } from "lucide-react";

export const dynamic = "force-dynamic"; // look into revalidating or if i want
// default SSG (static — prerender at build time) as opposed to SSR (dynamic — rendered on request)?

const partName = new Map([
  ['cpu', 'CPU'],
  ['motherboard', 'Motherboard'],
  ['memory', 'Memory'],
  ['storage', 'Storage Drive'],
  ['video-card', 'Video Card'],
  ['cpu-cooler', 'CPU Cooler'],
  ['power-supply', 'Power Supply Unit']
]);

export async function generateMetadata({ params }) {
  return { title: `Products—${partName.get(params.category)}` };
}

export default async function Page({ params }) {
  // check validity of product type
  const validCategories = [
    'cpu', 'motherboard', 'memory', 'storage',
    'video-card', 'cpu-cooler', 'power-supply'
  ];
  if (!validCategories.includes(params.category)) return notFound();

  // Artificial delay for skeleton testing
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // dynamic retrieval of PC parts for Data Table
  const parts = await productControllers[params.category].getAll();

  // dynamic retrieval of Product columns for Data Table
  const columns = await productColumns[params.category];

  return (
    <div id="" className="flex flex-col items-center gap-6 md:gap-12 mb-6 md:mb-12">
      <header className="page-header">
        <h1>Select Your PC Build's {partName.get(params.category)}</h1>
      </header>

      <section className="w-full flex justify-center">
        <DataTable columns={columns} data={parts} />
      </section>

      {/* <div role="navigation" aria-label="Scroll to top"
        className="w-full flex justify-center pb-4 md:pb-1 text-muted-foreground">
        <Link href="#">
          <span className="text-gray-500 dark:text-gray-300 block transform transition duration-250 ease-in-out hover:scale-110 hover:-translate-y-1.5">
            <ArrowUpToLine />
          </span>
        </Link>
      </div> */}
    </div>
  );
}