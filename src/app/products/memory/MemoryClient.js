"use client";

import {
  Card, CheckboxGroup, Checkbox, Slider, Image, Table, TableHeader, TableBody,
  TableColumn, TableRow, TableCell, Pagination
} from "@nextui-org/react";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSharedData } from "@/context/SharedDataContext";

export default function MemoryClient({ initialData }) {
  // Contains all PC parts from sibling serverAction.js file
  const components = initialData;
  // Adds PC part to current PC Workshop build
  const { updateSelectedMemory } = useSharedData();

  // Filter states
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [selectedMemoryType, setSelectedMemoryType] = useState([]);
  const [speedRange, setSpeedRange] = useState([2100, 8400]);
  const [latencyRange, setLatencyRange] = useState([13, 40]);
  const [trueLatencyRange, setTrueLatencyRange] = useState([7.3, 15.4]);
  //const [selectedModules, setSelectedModules] = useState([1, 2]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 800]);

  // Filtered components
  const filteredComponents = useMemo(() => {
    return components.filter((memory) => {
      return (
        (selectedManufacturers.length === 0 || selectedManufacturers.includes(memory.manufacturer.toLowerCase())) &&

        (selectedMemoryType.length === 0 || selectedMemoryType.includes(memory.memoryType.toLowerCase())) &&

        memory.speed >= speedRange[0] &&
        memory.speed <= speedRange[1] &&

        memory.casLatency >= latencyRange[0] && memory.casLatency <= latencyRange[1] &&

        memory.trueLatency >= trueLatencyRange[0] && memory.trueLatency <= trueLatencyRange[1] &&

        //(selectedModules.length === 0 || selectedModules.includes(memory.modules)) &&
        //memory.modules >= selectedModules[0] && memory.modules <= selectedModules[1] &&

        (selectedColor.length === 0 || selectedColor.includes(memory.color.toLowerCase())) &&

        memory.price >= priceRange[0] &&
        memory.price <= priceRange[1]
      );
    });
  }, [components, selectedManufacturers, selectedMemoryType, speedRange,
    latencyRange, trueLatencyRange, /*selectedModules,*/ selectedColor, priceRange]);

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 16;
  const pages = Math.ceil(filteredComponents.length / rowsPerPage);

  const products = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredComponents.slice(start, end);
  }, [page, filteredComponents]);

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
            maxValue={8400}
            defaultValue={[2100, 8400]}
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
            minValue={13}
            maxValue={40}
            defaultValue={[13, 40]}
            className="max-w-md"
            label=" " // Keep the label for the slider
            onChange={setLatencyRange}
          />
        </Card>

        {/* Slider card for True latency range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">True Latency (ns)</h2>
          <Slider
            step={0.1}
            minValue={7.0}
            maxValue={15.5}
            defaultValue={[7.0, 15.5]}
            className="max-w-md"
            label=" " // Keep the label for the slider
            onChange={setTrueLatencyRange}
          />
        </Card>

        {/* Filter card for Module range */}
        {/*
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
        */}

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
            maxValue={800}
            defaultValue={[0, 800]}
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
          aria-label="Motherboard Information Table"
          className="border-collapse w-full text-[#4D585B] rounded pr-4" // Full width for the table with right padding
          isStriped
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="warning"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader className="bg-[#488A99] text-[#DBAE58] rounded">
            <TableColumn>Name</TableColumn>
            <TableColumn>Memory Type</TableColumn>
            <TableColumn>Speed</TableColumn>
            <TableColumn>Capacity</TableColumn>
            <TableColumn>CAS Latency</TableColumn>
            <TableColumn>True Latency</TableColumn>
            {/*<TableColumn>Price per GB</TableColumn>*/}
            <TableColumn>Color</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody items={products}>
            {(memory) => (
              <TableRow key={memory.memoryId}>
                <TableCell>
                  {memory.name
                    //.replace(`(${memory.partNum})`, "")
                    .replace(`${memory.capacity} GB`, "")
                    .replace(`(${memory.modules} x ${memory.capacity} GB)`, "")
                    .replace(`${memory.memoryType}-${memory.speed}`, "")
                    .replace(`CL${memory.casLatency}`, "")
                    .replace("Memory", "")}
                  <Image src={memory.image}
                    width={70}
                    height={65}
                    alt="memory" />
                </TableCell>
                <TableCell>{memory.memoryType}</TableCell>
                <TableCell>{memory.speed + ` MHz`}</TableCell>
                <TableCell>{`${memory.capacity} GB`}</TableCell>
                <TableCell>{`CL${memory.casLatency}`}</TableCell>
                <TableCell>{memory.trueLatency + ` ns`}</TableCell>
                {/*<TableCell>{`$` + memory.pricePerGig}</TableCell>*/}
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
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}