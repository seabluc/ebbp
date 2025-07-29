import { notFound } from "next/navigation";
import { guidesItems } from "@/lib/data/guides-items";
import { LeftSidebar } from "@/components/left-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator";
import { RightSidebar } from "@/components/right-sidebar";

const partName = new Map([
  ['cpu', 'CPU'],
  ['motherboard', 'Motherboard'],
  ['memory', 'Memory'],
  ['storage', 'Storage'],
  ['video-card', 'Video Card'],
  ['cpu-cooler', 'CPU Cooler'],
  ['power-supply', 'Power Supply']
]);

export async function generateMetadata({ params }) {
  return { title: `Guides—${partName.get(params.topic)}` };
}

export default async function Page({ params }) {
  // check validity of part type
  const validCategories = [
    'cpu', 'motherboard', 'memory', 'storage',
    'video-card', 'cpu-cooler', 'power-supply'
  ];
  if (!validCategories.includes(params.topic)) return notFound();

  const guidePart = guidesItems.find(
    (item) => item.type === partName.get(params.topic)
  );
  return (
    <SidebarProvider className="relative">
      <LeftSidebar className="sticky pt-9 h-auto bg-background" />
      <SidebarInset>
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center bg-[#7A8588] dark:bg-[#4C5557] md:bg-background md:dark:bg-background border-b"> {/* make header a component, containing both breadrumbs and sidebartrigger? */}
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 h-8 md:hidden bg-white dark:bg-white/70" />
            <Breadcrumb>
              <BreadcrumbList className="text-white/70 dark:text-white/70 md:text-black/70 md:dark:text-white/70">
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">
                    Core PC Components
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white dark:text-white/90 md:text-black md:dark:text-white">
                    {guidePart.type}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <section className="w-full flex flex-col md:items-center">
          <div className="md:max-w-2xl mt-4 md:mt-2 ml-4 md:ml-0 md:mr-6 mb-10 pl-4 pr-8 md:px-0 flex flex-col gap-6 md:gap-12">
            <section>
              <h1 className="pb-1 text-3xl font-[650]">{guidePart.type}</h1>
              <p className="md:text-base">{guidePart.description}</p>
            </section>
            {guidePart.topics.map((topic) => (
              <section key={topic.id} className="">
                <h2 id={topic.id} className="pb-0.5 text-xl font-[550]">{topic.label}</h2>
                <p className="md:text-base">{topic.content}</p>
              </section>
            ))}
          </div>
        </section>
      </SidebarInset>
      <RightSidebar topic={guidePart} className="hidden md:block sticky pt-9 h-auto bg-background" />
    </SidebarProvider>
  );
};