'use client'

import { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

export function DataTable({ columns, data }) {
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <div className="w-full md:max-w-7xl px-2 md:px-4">
      <div className="px-1.5 md:px-0 mt-2 flex flex-col md:flex-row items-start md:items-center md:justify-between border-b-1.5 border-gray-200 dark:border-gray-200/50">
        <p className="px-0.5 md:px-1.5 text-lg font-bold">
          {table.getFilteredRowModel().rows.length} Parts Found
        </p>
        <div className="relative max-w-sm md:max-w-lg w-full py-2 md:py-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2
          min-h-5 min-w-5 size-4 text-muted-foreground" />
          <Input
            className="bg-slate-200/50 pl-10"
            placeholder="Search for parts..."
            value={(table.getColumn("part.name")?.getFilterValue()) ?? ""}
            onChange={(event) =>
              table.getColumn("part.name")?.setFilterValue(event.target.value)
            } />
        </div>
      </div>

      <div className="mt-4 rounded-md md:border border-gray-200 dark:border-gray-200/50">
        {/*========================= Desktop View =========================*/}
        <Table className="hidden md:table">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/*========================== Mobile View ==========================*/}
        <div className="block md:hidden">
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => {
              const cellName = row.getVisibleCells().at(0); // product Name
              const cellColumns = row.getVisibleCells().slice(
                1, row.getVisibleCells().length - 1); // products columns
              const cellAddBtn = row.getVisibleCells().at(
                row.getVisibleCells().length - 1); // AddButton

              return (
                <Card key={row.id} className="h-[390px] border-t-1 border-x-0 border-black/25 dark:border-white/50 shadow-lg">
                  <CardHeader className="">
                    <CardTitle className="text-base font-semibold">
                      {cellName && flexRender(cellName.column.columnDef.cell, cellName.getContext())}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {cellColumns.map(cell => (
                      <div key={cell.id}>
                        <p className="text-sm text-muted-foreground font-medium">
                          {cell.column.columnDef.header?.toString()}
                        </p>
                        <p className="text-sm">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex items-center justify-start">
                    {cellAddBtn && flexRender(cellAddBtn.column.columnDef.cell, cellAddBtn.getContext())}
                  </CardFooter>
                </Card>
              )
            })
          ) : (
            <p className="text-center text-sm text-muted-foreground">No results.</p>
          )}
        </div>
      </div>

      {/*============================ Paginaton ============================*/}
      <div className="flex items-center justify-between pt-5 pb-6 md:py-4">
        <p className="px-1.5 text-base text-muted-foreground md:text-sm">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </p>
        <div className="px-1.5 md:px-0 flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
};