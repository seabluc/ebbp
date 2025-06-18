'use client'

import AddButton from "@/components/add-button"
import Image from "next/image"

export const storageColumns = [
  {
    accessorKey: "Part.name",
    id: "Part.name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.Part?.name
        ?.replace(`(${row.original.Part?.partNum})`, '')
        ?.replace(row.original.Part?.type, '')
        ?.replace('Solid State Drive', '')
        ?.replace('Internal Hard Drive', "HDD")
        ?.replace(row.original.interface, '')
        ?.replace(row.original.formFactor, '')
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
    accessorKey: 'capacity',
    header: 'Capacity',
    cell: ({ row }) => {
      const capacity = (row.original.capacity >= 1000) ?
        `${row.original.capacity / 1000} TB` : `${row.original.capacity} GB`
      return (
        <span>{capacity}</span>
      )
    }
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'formFactor',
    header: 'Form Factor',
  },
  {
    accessorKey: 'interface',
    header: 'Interface',
  },
  {
    accessorKey: "storageId",
    header: "",
    cell: ({ row }) => {
      return (
        <AddButton category='storage' id={row.original.storageId} />
      )
    }
  },
]