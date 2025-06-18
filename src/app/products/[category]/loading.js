'use client'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const columnCount = 5;

export default function TableSkeleton() {
  return (
    <main className="flex flex-col items-center justify-center gap-12">
      {/* Fake header that mimics <header> */}
      <header className="w-full md:p-5 bg-[#7A8588] text-white text-center md:text-2xl font-bold shadow-md">
        Select your PC Build's blank
        {/* <Skeleton className="h-10 md:h-12 w-full rounded-none bg-[#7A8588]" /> */}
      </header>

      {/* DataTable mimic */}
      <div className="w-full px-4 md:px-0 max-w-7xl">
        <div className="flex items-center py-4">
          <Skeleton className="h-9 w-[250px] rounded-md" />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {Array.from({ length: columnCount }).map((_, i) => (
                  <TableHead key={`header-${i}`}>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, rowIdx) => (
                <TableRow key={`row-${rowIdx}`}>
                  {Array.from({ length: columnCount }).map((_, colIdx) => (
                    <TableCell key={`cell-${rowIdx}-${colIdx}`}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between py-4">
          <Skeleton className="h-4 w-[120px]" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-[80px] rounded-md" />
            <Skeleton className="h-8 w-[80px] rounded-md" />
          </div>
        </div>
      </div>
    </main>
  );
}
