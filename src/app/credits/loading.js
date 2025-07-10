import { Skeleton } from "@/components/ui/skeleton";

export default function CreditsLoading() {
  return (
    <div id="" className="flex flex-col gap-6 md:gap-12 mb-6 md:mb-12">
      <header className="page-header">
        <h1><Skeleton className="h-7 md:h-8 w-[260px] md:w-80 mx-auto bg-white/30" /></h1>
      </header>
    </div>
  )
}