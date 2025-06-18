'use client'

import AddButton from "@/components/add-button"
import Image from "next/image"

export const cpuColumns = [
  {
    accessorKey: "Part.name",
    id: "Part.name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.Part?.name
        ?.replace(`(${row.original.Part?.partNum})`, '')
        ?.replace(row.original.Part?.type, '')
        ?.replace('Processor', '')
        ?.replace(`${row.original.coreCount}-Core`, '')
        ?.replace(`${row.original.performanceCoreClock} GHz`, '')
      const image = row.original.Part?.image

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
    accessorKey: "socket",
    header: "Socket",
  },
  {
    accessorKey: "tdp",
    header: "TDP",
    cell: ({ row }) => {
      let watts = 0;
      if (row.original.maxTurboPower) watts = `${row.original.maxTurboPower} W`;
      else if (row.original.integrated === 'None') watts = `${row.original.tdp} W`;
      else watts = `${Math.ceil(row.original.tdp + (row.original.tdp * 0.35))} W`;
      return (
        <span>{watts}</span>
      )
    }
  },
  {
    accessorKey: "microarchitecture",
    header: "Microarchitecture",
  },
  {
    accessorKey: "integrated",
    header: "Integrated Graphics",
  },
  {
    accessorKey: "coreCount",
    header: "Core Count",
  },
  {
    accessorKey: "performanceCoreClock",
    header: "P-Core Clock",
    cell: ({ row }) => {
      const speed = `${row.original.performanceCoreClock} GHz`
      return (
        <span>{speed}</span>
      )
    }
  },
  {
    accessorKey: "performanceCoreBoostClock",
    header: "P-Core Boost Clock",
    cell: ({ row }) => {
      const speed = `${row.original.performanceCoreBoostClock} GHz`
      return (
        <span>{speed}</span>
      )
    }
  },
  {
    accessorKey: "cpuId",
    header: "",
    cell: ({ row }) => {
      return (
        <AddButton category='cpu' id={row.original.cpuId} />
      )
    }
  },
]