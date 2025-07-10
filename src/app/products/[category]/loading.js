'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function ProductsLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 md:gap-12">
      <header className="page-header">
        <h1><Skeleton className="h-7 md:h-8 w-[260px] md:w-80 mx-auto bg-white/30" /></h1>
      </header>

      <section className="w-full md:max-w-7xl px-2 md:px-4">
        <div className="px-1.5 md:px-0 mt-3 flex flex-col md:flex-row items-start md:items-center md:justify-between border-b-1.5 border-gray-200 dark:border-gray-200/50">
          <div className="px-0.5 md:px-1.5 text-lg font-bold">
            <Skeleton className="h-6 w-36 md:w-36" />
          </div>
          <div className="relative max-w-sm md:max-w-lg w-full py-2 md:py-4">
            <Skeleton className="h-10 w-full rounded-md bg-slate-200/50" />
          </div>
        </div>
        <div className="mt-4 rounded-md md:border border-gray-200 dark:border-gray-200/50">
          {/*========================= Desktop View =========================*/}
          <Table className="hidden md:table">
            <TableHeader>
              <TableRow>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <TableHead key={idx}>
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, rowIdx) => (
                <TableRow key={rowIdx}>
                  {Array.from({ length: 5 }).map((_, cellIdx) => (
                    <TableCell key={cellIdx}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/*========================== Mobile View ==========================*/}
        <div className="block md:hidden">
          {Array.from({ length: 10 }).map((_, idx) => (
            <Card key={idx} className="h-[390px] border-t-1 border-x-0 border-black/25 dark:border-white/50 shadow-lg mb-4">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  <Skeleton className="h-4 w-36" />
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-x-4 gap-y-2">
                {Array.from({ length: 4 }).map((_, cIdx) => (
                  <div key={cIdx}>
                    <div className="text-sm text-muted-foreground font-medium">
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <div className="text-sm">
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Skeleton className="h-8 w-24" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/*========================== Pagination + Spinner ==========================*/}
      <div className="flex items-center justify-between pt-5 pb-6 w-full px-2 md:px-4">
        <Skeleton className="h-4 w-32" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>

      <div className="w-full flex justify-center pb-4 text-muted-foreground">
        <span className="text-gray-500 dark:text-gray-300 block transform transition duration-250 ease-in-out">
          <Loader2 className="animate-spin" />
        </span>
      </div>
    </div>
  );
}