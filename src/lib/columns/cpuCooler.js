'use client'

import AddButton from "@/components/add-button"
import Image from "next/image"

export const cpuCoolerColumns = [
  {
    accessorKey: "Part.name",
    id: "Part.name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.Part?.name
        ?.replace(`(${row.original.Part?.partNum})`, '')
        ?.replace(`Liquid ${row.original.Part?.type}`, '')
        ?.replace(row.original.Part?.type, '')
        ?.replace(row.original.radiatorSize, '')
      const image = row.original.Part?.image

      return (
        <div className="flex items-center space-x-2">
          {image && (
            <Image
              src={image}
              alt={name}
              width={64}
              height={64}
              className="p-1 border-2 border-black/25 rounded-xl object-contain"
            />
          )}
          <span>{name}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'fanRPM',
    header: 'Fan RPM',
    cell: ({ row }) => {
      const speed = `${row.original.fanRPM} RPM`
      return (
        <span>{speed}</span>
      )
    }
  },
  {
    accessorKey: 'noiseLevel',
    header: 'Noise Level',
    cell: ({ row }) => {
      const noise = `${row.original.noiseLevel} dB`
      return (
        <span>{noise}</span>
      )
    }
  },
  {
    accessorKey: 'height',
    header: 'Height',
    cell: ({ row }) => {
      const height = (row.original.height) ?
        `${row.original.height} mm` : '--'
      return (
        <span>{height}</span>
      )
    }
  },
  {
    accessorKey: 'radiatorSize',
    header: 'Radiator Size',
    cell: ({ row }) => {
      const aio = (row.original.radiatorSize) ?
        `${row.original.radiatorSize} mm` : '--'
      return (
        <span>{aio}</span>
      )
    }
  },
  {
    accessorKey: "cpuCoolerId",
    header: "",
    cell: ({ row }) => {
      return (
        <AddButton category='cpu-cooler' id={row.original.cpuCoolerId} />
      )
    }
  },
]
