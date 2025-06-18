'use client'

import AddButton from "@/components/add-button"
import Image from "next/image"

export const videoCardColumns = [
  {
    accessorKey: "part.name",
    id: "part.name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.part?.name
        ?.replace(`(${row.original.part?.partNum})`, '')
        ?.replace(row.original.part?.type, '')
        ?.replace(row.original.chipset, '')
        ?.replace(`${row.original.memory} GB`, '')
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
    accessorKey: 'chipset',
    header: 'Chipset',
  },
  {
    accessorKey: 'memoryType',
    header: 'Graphics Memory Type',
  },
  {
    accessorKey: 'memory',
    header: 'VRAM',
    cell: ({ row }) => {
      const memory = `${row.original.memory} GB`
      return (
        <span>{memory}</span>
      )
    }
  },
  {
    accessorKey: 'coreClock',
    header: 'Core Clock',
    cell: ({ row }) => {
      const speed = `${row.original.coreClock} MHz`
      return (
        <span>{speed}</span>
      )
    }
  },
  {
    accessorKey: 'tdp',
    header: 'TDP',
    cell: ({ row }) => {
      const watts = `${row.original.tdp} W`
      return (
        <span>{watts}</span>
      )
    }
  },
  {
    accessorKey: 'length',
    header: 'Length',
    cell: ({ row }) => {
      const length = `${row.original.length} mm`
      return (
        <span>{length}</span>
      )
    }
  },
  {
    accessorKey: "videoCardId",
    header: "",
    cell: ({ row }) => {
      return (
        <AddButton category='video-card' id={row.original.videoCardId} />
      )
    }
  },
]