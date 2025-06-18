'use client'

import AddButton from "@/components/add-button"
import Image from "next/image"

export const memoryColumns = [
  {
    accessorKey: "part.name",
    id: "part.name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.part?.name
        ?.replace(`(${row.original.part?.partNum})`, '')
        ?.replace(row.original.part?.type, '')
        ?.replace(`${row.original.capacity} GB`, '')
        ?.replace(`${row.original.memoryType}-${row.original.speed}`, '')
        ?.replace(`CL${row.original.casLatency}`, '')
      const image = row.original.part?.image

      return (
        <div className="flex items-center space-x-2">
          {image && (
            <Image
              src={image}
              alt={name}
              width={60}
              height={60}
              className="p-1 border-2 border-black/25 rounded-xl object-contain"
            />
          )}
          <span>{name}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'memoryType',
    header: 'Memory Type',
  },
  {
    accessorKey: 'speed',
    header: 'Speed',
    cell: ({ row }) => {
      const speed = `${row.original.speed} MHz`
      return (
        <span>{speed}</span>
      )
    }
  },
  {
    accessorKey: 'capacity',
    header: 'Capacity',
    cell: ({ row }) => {
      const capacity = `${row.original.capacity} GB`
      return (
        <span>{capacity}</span>
      )
    }
  },
  {
    accessorKey: 'casLatency',
    header: 'CAS Latency',
    cell: ({ row }) => {
      const casLatency = `CL${row.original.casLatency}`
      return (
        <span>{casLatency}</span>
      )
    }
  },
  {
    accessorKey: 'trueLatency',
    header: 'True Latency',
    cell: ({ row }) => {
      const trueLatency = `${row.original.trueLatency} ns`
      return (
        <span>{trueLatency}</span>
      )
    }
  },
  {
    accessorKey: 'color',
    header: 'Color',
  },
  {
    accessorKey: "memoryId",
    header: "",
    cell: ({ row }) => {
      return (
        <AddButton category='memory' id={row.original.memoryId} />
      )
    }
  },
]