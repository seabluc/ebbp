import WorkshopTable from '@/components//workshop-table'
import WorkshopDashboard from '@/components/workshop-dashboard'
import { CompatibilityAudit } from '@/lib/build-summary/build-summary'
// import { ArrowUpToLine } from 'lucide-react'
// import Link from 'next/link'

// Add ShadCN Progress Bar to track POST-able build
// Toast for when a PC part is added? Or only when an issue or incompatibility occurs?
export default function Page() {
  return (
    <div id="" className="flex flex-col gap-6 md:gap-12 mb-6 md:mb-12">
      <header className="page-header">
        <h1>Select Parts to Check Compatibility</h1>
      </header>
      <section className="w-full flex justify-center">
        <WorkshopDashboard />
      </section>
      <section className="w-full flex justify-center">
        <WorkshopTable />
      </section>
      <section id="audit" className="w-full flex justify-center border-t-3 border-gray-200 dark:border-gray-200/50 md:border-none py-2 md:p-0">
        <CompatibilityAudit />
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
  )
}