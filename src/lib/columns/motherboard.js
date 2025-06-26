'use client'

import AddButton from "@/components/add-button"
import Image from "next/image"

export const motherboardColumns = [
  {
    accessorKey: "part.name",
    id: "part.name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.part?.name
        ?.replace(`(${row.original.part?.partNum})`, '')
        ?.replace(row.original.part?.type, '')
        ?.replace(row.original.formFactor, '')
        ?.replace(row.original.socket, '')
        ?.replace('Micro ATX', '')
      // ?.replace(/Micro ATX|Mini|ITX/g, "")
      const image = row.original.part?.image

      return (
        <div className="flex items-center space-x-2">
          {image && (
            <Image
              src={image}
              alt={name}
              width={60}
              height={60}
              className="m-1 border-2 border-black/25 dark:border-white/50 rounded-xl object-contain"
            />
          )}
          <span>{name}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'socket',
    header: 'Socket',
  },
  {
    accessorKey: 'memoryType',
    header: 'Memory Type',
  },
  {
    accessorKey: 'formFactor',
    header: 'Form Factor',
  },
  {
    accessorKey: 'memoryMax',
    header: 'Max Memory Capacity',
    cell: ({ row }) => {
      const capacity = `${row.original.memoryMax} GB`
      return (
        <span>{capacity}</span>
      )
    }
  },
  {
    accessorKey: 'memorySlot',
    header: 'Memory Slots',
  },
  {
    accessorKey: "motherboardId",
    header: "",
    cell: ({ row }) => {
      return (
        <AddButton category='motherboard' id={row.original.motherboardId} />
      )
    }
  },
]