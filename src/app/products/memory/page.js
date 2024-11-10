"use client";

import {
  Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Card,
  CheckboxGroup, Checkbox, Slider
} from "@nextui-org/react";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchComponents } from '@/utils/fetchUtils';
import { useSharedData } from "@/context/SharedDataContext";

export default function App() {
  const [components, setComponents] = useState([]);
  const [error, setError] = useState(null);
  const { updateSelectedMemory } = useSharedData();

  useEffect(() => {
    fetchComponents("../api/memorys", setComponents, setError);
  }, []);

  return (
    <div className="min-h-screen bg-[#4D585B] flex gap-4 p-4"> {/* Main background color */}
      <div className="flex flex-col gap-4 w-1/5 mt-4"> {/* Container for filter cards */}

        {/* Filter card for Manufacturers */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Manufacturer</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value="corsair">Corsair</Checkbox>
            <Checkbox value="crucial">Crucial</Checkbox>
            <Checkbox value="g.skill">G.Skill!</Checkbox>
            <Checkbox value="kingston">Kingston</Checkbox>
            <Checkbox value="patriot">Patriot</Checkbox>
            <Checkbox value="silicon">Silicon</Checkbox>
            <Checkbox value="teamgroup">TEAMGROUP</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for Memory Types */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]" >Memory Type</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value="DDR5">DDR5</Checkbox>
            <Checkbox value="DDR4">DDR4</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for speed range */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Speed (MHz)</h2>
          <Slider
            step={100}
            minValue={2133}
            maxValue={6400}
            defaultValue={[2133, 6400]}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>

        {/* Slider card for CAS latency range */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">CAS Latency</h2>
          <Slider
            step={1}
            minValue={15}
            maxValue={38}
            defaultValue={[15, 38]}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>

        {/* Slider card for True latency range */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">True Latency (ns)</h2>
          <Slider
            step={1}
            minValue={8}
            maxValue={14}
            defaultValue={[8, 14]}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>

        {/* Filter card for Module count */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]" >Module Count</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value="2">2</Checkbox>
            <Checkbox value="1">1</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for Color */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Color</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value="black">Black</Checkbox>
            <Checkbox value="white">White</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for price range (still in last position) */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Price ($)</h2>
          <Slider
            step={10}
            minValue={0}
            maxValue={400}
            defaultValue={[0, 400]}
            formatOptions={{ style: "currency", currency: "USD" }}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>
      </div>

      <div className="flex-grow flex items-start justify-center mt-4 gap-4"> {/* Container for table */}
        <Table
          aria-label="Memory Information Table"
          className="border-collapse w-full text-[#4D585B] rounded pr-4" // Full width for the table with right padding
          isStriped
        >
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
            {components.map((memory) => (
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
      </div>
    </div>
  );
}