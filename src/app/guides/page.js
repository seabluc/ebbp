import { LeftSidebar } from "@/components/left-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider className="relative">
      <LeftSidebar className="absolute" />
      <SidebarInset>
        <header className="md:hidden flex h-14 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-8 md:hidden" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

/*
// /guides/page.js
export async function generateMetadata() {
  return { title: 'Guides' };
}

export default function Page() {
  return (
    <section className="w-full flex flex-col md:items-center">
      <div className="md:max-w-2xl mt-10 md:mt-12 md:mr-12 mb-10 pl-4 pr-8 md:px-0 flex flex-col gap-6 md:gap-12">
        <section>
          <h1 className="pb-1 text-3xl font-[650]">Introduction</h1>
          <p className="md:text-base">As you can see, this part is quite unfinished</p>
        </section>
        <section className="">
          <h2 className="pb-0.5 text-xl font-[550]">I'll finish this up soon</h2>
          <p className="md:text-base">I promise</p>
        </section>
      </div>
    </section>
  );
};

// /guides/layout.js
import { SidebarProvider } from "@/components/ui/sidebar";
import { GuidesSidebar } from "@/components/guides-sidebar";

export default function GuidesLayout({ children }) {

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <nav className=""><GuidesSidebar /></nav>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}

// /guides/[topic]/page.js
import { notFound } from "next/navigation";
import { guidesItems } from "@/lib/data/guides-items";

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
    <section className="w-full flex flex-col md:items-center">
      <div className="md:max-w-2xl mt-10 md:mt-12 md:mr-12 mb-10 pl-4 pr-8 md:px-0 flex flex-col gap-6 md:gap-12">
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
  );
};
*/