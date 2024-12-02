"use client";

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchComponents } from '@/utils/fetchUtils';
import { useSharedData } from "@/context/SharedDataContext";

export default function MemoryTable() {
  const [components, setComponents] = useState([]);
  const [error, setError] = useState(null);
  const { updateSelectedMemory } = useSharedData();

  useEffect(() => {
    fetchComponents("../api/memorys", setComponents, setError);
  }, []);

  return (
    <Table aria-label="Memory Information Table" isStriped
      className="border-collapse w-full text-[#4D585B] rounded pr-4">
      <TableHeader className="bg-[#488A99] text-[#DBAE58] rounded">
        <TableColumn>Name</TableColumn>
        <TableColumn>Memory Type</TableColumn>
        <TableColumn>Speed</TableColumn>
        <TableColumn>CAS Latency</TableColumn>
        <TableColumn>True Latency</TableColumn>
        {/*<TableColumn>Price per GB</TableColumn>*/}
        <TableColumn>Modules</TableColumn>
        <TableColumn>Color</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn></TableColumn>
      </TableHeader>
      <TableBody>
        {filteredComponents.map((memory) => (
          <TableRow className="h-28" key={memory.memoryId}>
            <TableCell>
              {memory.name}
              <Image src={memory.image}
                width="70"
                height="70"
                alt="memory" />
            </TableCell>
            <TableCell>{memory.memoryType}</TableCell>
            <TableCell>{memory.speed + ` MHz`}</TableCell>
            <TableCell>{memory.casLatency}</TableCell>
            <TableCell>{memory.trueLatency + ` ns`}</TableCell>
            {/*<TableCell>{`$` + memory.pricePerGig}</TableCell>*/}
            <TableCell>{memory.modules}</TableCell>
            <TableCell>{memory.color}</TableCell>
            <TableCell>{`$` + memory.price}</TableCell>
            <TableCell>
              <Link href="/workshop">
                <button
                  className="bg-[#DBAE58] text-black px-4 py-2 rounded transition-transform transform active:scale-95"
                  onClick={() => { updateSelectedMemory(memory); }}>Add to Build
                </button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}