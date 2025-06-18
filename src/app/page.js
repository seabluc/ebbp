import HomeGrid from "@/components/home-grid"
import { ArrowUpToLine } from "lucide-react"
import Link from "next/link"

export default function Page() {
  return (
    <main id="" className="flex flex-col gap-6 md:gap-12">
      <div className="w-full">
        <HomeGrid />
      </div>
      <div role="navigation" aria-label="Scroll to top"
        className="w-full flex justify-center pb-4 md:pb-2 text-muted-foreground">
        <Link href="#">
          <span className="block transform transition duration-250 ease-in-out hover:scale-110 hover:-translate-y-1.5">
            <ArrowUpToLine />
          </span>
        </Link>
      </div>
    </main>
  )
};