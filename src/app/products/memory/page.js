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

  // Filter states
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [selectedMemoryType, setSelectedMemoryType] = useState([]);
  const [speedRange, setSpeedRange] = useState([2133, 6400]);
  const [latencyRange, setLatencyRange] = useState([15, 38]);
  const [trueLatencyRange, setTrueLatencyRange] = useState([8, 14]);
  const [selectedModules, setSelectedModules] = useState([1, 2]);
  //const [selectedModules, setSelectedModules] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 400]);

  useEffect(() => {
    fetchComponents("../api/memorys", setComponents, setError);
  }, []);

  // Apply filters whenever the filter values change
  useEffect(() => {
    const filterComponents = () => {
      const filtered = components.filter((memory) => {
        // Apply all filters based on selected criteria
        return (
          (selectedManufacturers.length === 0 || selectedManufacturers.includes(memory.manufacturer.toLowerCase())) &&
          (selectedMemoryType.length === 0 || selectedMemoryType.includes(memory.memoryType.toLowerCase())) &&
          memory.speed >= speedRange[0] && memory.speed <= speedRange[1] &&
          memory.casLatency >= latencyRange[0] && memory.casLatency <= latencyRange[1] &&
          memory.trueLatency >= trueLatencyRange[0] && memory.trueLatency <= trueLatencyRange[1] &&
          //(selectedModules.length === 0 || selectedModules.includes(memory.modules)) &&
          memory.modules >= selectedModules[0] && memory.modules <= selectedModules[1] &&
          (selectedColor.length === 0 || selectedColor.includes(memory.color.toLowerCase())) &&
          memory.price >= priceRange[0] && memory.price <= priceRange[1]
        );
      });
      setFilteredComponents(filtered);
    };

    filterComponents();
  }, [components, selectedManufacturers, selectedMemoryType, speedRange,
    latencyRange, trueLatencyRange, selectedModules, selectedColor, priceRange]);

  return (
    <div className="min-h-screen bg-[#4D585B] flex gap-4 p-4"> {/* Main background color */}
      <div className="flex flex-col gap-3 w-1/5 mt-4"> {/* Container for filter cards */}

        {/* Filter card for Manufacturers */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Manufacturer</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedManufacturers}>
            <Checkbox value="corsair">Corsair</Checkbox>
            <Checkbox value="crucial">Crucial</Checkbox>
            <Checkbox value="g.skill">G.Skill</Checkbox>
            <Checkbox value="kingston">Kingston</Checkbox>
            <Checkbox value="patriot">Patriot</Checkbox>
            <Checkbox value="silicon power">Silicon Power</Checkbox>
            <Checkbox value="teamgroup">TEAMGROUP</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for Memory Types */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]" >Memory Type</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedMemoryType}>
            <Checkbox value="ddr5">DDR5</Checkbox>
            <Checkbox value="ddr4">DDR4</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for speed range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Speed (MHz)</h2>
          <Slider
            step={100}
            minValue={2100}
            maxValue={6400}
            defaultValue={[2100, 6400]}
            className="max-w-md"
            label=" " // Keep the label for the slider
            onChange={setSpeedRange}
          />
        </Card>

        {/* Slider card for CAS latency range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">CAS Latency</h2>
          <Slider
            step={1}
            minValue={15}
            maxValue={38}
            defaultValue={[15, 38]}
            className="max-w-md"
            label=" " // Keep the label for the slider
            onChange={setLatencyRange}
          />
        </Card>

        {/* Slider card for True latency range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">True Latency (ns)</h2>
          <Slider
            step={1}
            minValue={8}
            maxValue={14}
            defaultValue={[8, 14]}
            className="max-w-md"
            label=" " // Keep the label for the slider
            onChange={setTrueLatencyRange}
          />
        </Card>

        {/* Filter card for Module range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Module Count</h2>
          <Slider
            step={1}
            minValue={1}
            maxValue={2}
            defaultValue={[1, 2]}
            className="max-w-md"
            label=" " // Keep the label for the slider
            onChange={setSelectedModules}
          />
        </Card>

        {/* Filter card for Color */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Color</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedColor}>
            <Checkbox value="black">Black</Checkbox>
            <Checkbox value="white">White</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for price range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Price ($)</h2>
          <Slider
            step={10}
            minValue={0}
            maxValue={400}
            defaultValue={[0, 400]}
            formatOptions={{ style: "currency", currency: "USD" }}
            className="max-w-md"
            label=" " // Keep the label for the slider
            onChange={setPriceRange}
          />
        </Card>
      </div>

      {/* Container for table */}
      <div className="flex-grow flex items-start justify-center mt-4 gap-4">
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
      </div>
    </div>
  );
}