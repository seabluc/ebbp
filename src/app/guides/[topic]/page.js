import { partName, validCategories } from "@/lib/data/part-Items";
import { notFound } from "next/navigation";
import { guidesItems } from "@/lib/data/guides-items";
import { LeftSidebar } from "@/components/left-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { RightSidebar } from "@/components/right-sidebar";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateMetadata({ params }) {
  return { title: `Guides—${partName.get(params.topic)}` };
}

export default async function Page({ params }) {
  // check validity of part type
  if (!validCategories.includes(params.topic)) return notFound();

  // retrieve current topic
  const guidesPart = guidesItems.find((item) => item.type === partName.get(params.topic));
  const idx = guidesItems.findIndex((i) => i.type === partName.get(params.topic));

  // retrieve previous and next topics
  const prevPart = idx > 1 ? guidesItems[idx - 1] : null;
  const nextPart = idx < guidesItems.length - 1 ? guidesItems[idx + 1] : null;
  return (
    <SidebarProvider className="relative">
      <LeftSidebar className="sticky pt-6 h-auto bg-background" />
      <SidebarInset>
        <header className="flex md:hidden sticky top-0 h-14 shrink-0 items-center bg-[#7A8588]/[96%] dark:bg-[#4C5557]/[96%] md:bg-background md:dark:bg-background border-b shadow-md">
          <span className="flex items-center pl-4 gap-x-0.5 text-white text-xl font-bold"><SidebarTrigger />Menu</span>
        </header>
        <div className="flex flex-col md:items-center">
          <section className="md:max-w-2xl mt-7 md:mt-8 mb-10 px-5 flex flex-col gap-8 md:gap-10">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-3xl font-semibold">{guidesPart.type}</h1>
              <p className="md:text-base">{guidesPart.description}</p>
            </div>
            <Separator className="bg-black/50 dark:bg-white/50 md:bg-black/30 md:dark:bg-white/30 h-[1.25px]" />
            {guidesPart.topics.map((topic) => (
              <div key={topic.id} className="flex flex-col gap-2">
                <h2 id={topic.id} className="text-2xl font-medium">{topic.label}</h2>
                <p className="md:text-base">{topic.content}</p>
                <Separator className="bg-black/30 dark:bg-white/30 md:bg-black/20 md:dark:bg-white/20 mt-7 md:mt-8" />
              </div>
            ))}
          </section>
          <div className="md:min-w-[672px]">
            <nav className={`px-5 mb-10 flex ${!prevPart ? "justify-end" :
              !nextPart ? "justify-start" : "justify-between"}`}>
              {prevPart && (
                <Button
                  className="border-1 border-black/25 dark:border-white/50 p-4 mt-1 md:p-5 md:mt-2 bg-[#DBAE58] hover:bg-[#E4C577] text-black text-sm font-medium"
                  asChild>
                  <Link href={prevPart.path}><ArrowLeft />{prevPart.type}</Link>
                </Button>
              )}
              {nextPart && (
                <Button
                  className="border-1 border-black/25 dark:border-white/50 p-4 mt-1 md:p-5 md:mt-2 bg-[#DBAE58] hover:bg-[#E4C577] text-black text-sm font-medium"
                  asChild>
                  <Link href={nextPart.path}>{nextPart.type}<ArrowRight /></Link>
                </Button>
              )}
            </nav>
          </div>
        </div>
      </SidebarInset>
      <RightSidebar topic={guidesPart} className="hidden md:block sticky pt-6 h-auto bg-background" />
    </SidebarProvider>
  );
};