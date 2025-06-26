'use client'

import AddButton from "@/components/add-button"
import Image from "next/image"

export const powerSupplyColumns = [
  {
    accessorKey: "part.name",
    id: "part.name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.part?.name
        ?.replace('Cooler Master V SFX Gold ATX 3.0 850 W 80+ Gold Certified Fully Modular SFX Power Supply (MPY-8501-SFHAGV-3US)', 'Cooler Master V 3.0')
        ?.replace(`(${row.original.part?.partNum})`, '')
        ?.replace(row.original.part?.type, '')
        ?.replace(row.original.formFactor, '')
        ?.replace(`${row.original.wattage} W`, '')
        ?.replace(`V${row.original.wattage}`, '')
        ?.replace(row.original.wattage, '')
        ?.replace(`${row.original.efficiency} Certified`, '')
        ?.replace(row.original.modularity, '')
        ?.replace(/Fully Modular|FULL MODULAR|White|Bronze|Silver|Gold|Platinum|WHITE|BRONZE|SILVER|GOLD|PLATINUM/g, "")
        ?.replace(row.original.formFactor, '')
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
    accessorKey: 'formFactor',
    header: 'Form Factor',
  },
  {
    accessorKey: 'efficiency',
    header: 'Efficiency Rating',
  },
  {
    accessorKey: 'wattage',
    header: 'Wattage',
    cell: ({ row }) => {
      const watts = `${row.original.wattage} W`
      return (
        <span>{watts}</span>
      )
    }
  },
  {
    accessorKey: 'modularity',
    header: 'Modularity',
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
    accessorKey: "psuId",
    header: "",
    cell: ({ row }) => {
      return (
        <AddButton category='power-supply' id={row.original.psuId} />
      )
    }
  },
]