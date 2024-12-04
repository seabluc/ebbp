"use client";

import {
  Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Pagination,
  Card, CheckboxGroup, Checkbox, Slider
} from "@nextui-org/react";
import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSharedData } from "@/context/SharedDataContext";

export default function MotherboardClient({ initialData }) {
  // Contains all PC parts from sibling serverAction.js file
  const components = initialData;
  // Adds PC part to current PC Workshop build
  const { updateSelectedMotherboard } = useSharedData();

  // Filter states
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [selectedSockets, setSelectedSockets] = useState([]);
  const [selectedMemoryType, setSelectedMemoryType] = useState([]);
  const [selectedFormFactor, setSelectedFormFactor] = useState([]);
  const [memoryCapacityRange, setMemoryCapacityRange] = useState([32, 256]);
  const [memorySlotRange, setMemorySlotRange] = useState([2, 4]);
  const [priceRange, setPriceRange] = useState([0, 700]);

  // Filtered components
  const filteredComponents = useMemo(() => {
    return components.filter((mobo) => {
      return (
        (selectedManufacturers.length === 0 || selectedManufacturers.includes(mobo.manufacturer.toLowerCase())) &&

        (selectedSockets.length === 0 || selectedSockets.includes(mobo.socket.toLowerCase())) &&

        (selectedMemoryType.length === 0 || selectedMemoryType.includes(mobo.motherboardMemoryType.toLowerCase())) &&

        (selectedFormFactor.length === 0 || selectedFormFactor.includes(mobo.formFactor.toLowerCase())) &&

        mobo.motherboardMemoryMax >= memoryCapacityRange[0] &&
        mobo.motherboardMemoryMax <= memoryCapacityRange[1] &&

        mobo.memorySlot >= memorySlotRange[0] &&
        mobo.memorySlot <= memorySlotRange[1] &&

        mobo.price >= priceRange[0] &&
        mobo.price <= priceRange[1]
      );
    });
  }, [components, selectedManufacturers, selectedSockets, selectedMemoryType,
    selectedFormFactor, memoryCapacityRange, memorySlotRange, priceRange,]);

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

        {/* Filter card for manufacturers */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Manufacturer</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedManufacturers}>
            <Checkbox value="asus">Asus</Checkbox>
            <Checkbox value="asrock">ASRock</Checkbox>
            <Checkbox value="gigabyte">Gigabyte</Checkbox>
            <Checkbox value="msi">MSI</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for processors */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Socket</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedSockets}>
            <Checkbox value="lga1851">LGA1851</Checkbox>
            <Checkbox value="lga1700">LGA1700</Checkbox>
            <Checkbox value="am5">AM5</Checkbox>
            <Checkbox value="am4">AM4</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for Memory Types */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Memory Type</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedMemoryType}>
            <Checkbox value="ddr5">DDR5</Checkbox>
            <Checkbox value="ddr4">DDR4</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for form factors */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Form Factor</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedFormFactor}>
            <Checkbox value="eatx">E-ATX</Checkbox>
            <Checkbox value="atx">ATX</Checkbox>
            <Checkbox value="matx">MATX</Checkbox>
            <Checkbox value="itx">Mini-ITX</Checkbox>
          </CheckboxGroup>
        </Card>


        {/* Slider card for Memory range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Memory Capacity (GB)</h2>
          <Slider
            step={32}
            minValue={32}
            maxValue={256}
            defaultValue={[32, 256]}
            className="max-w-md"
            label=" " // Keep the label for the slider
            onChange={setMemoryCapacityRange}
          />
        </Card>

        {/* Slider card for Memory Slots */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]" >Memory Slots</h2>
          <Slider
            step={2}
            minValue={2}
            maxValue={4}
            defaultValue={[2, 4]}
            className="max-w-md"
            label=" " // Keep the label for the slider
            onChange={setMemorySlotRange}
          />
        </Card>

        {/* Filter card for Color */}
        {/*
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Color</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedColor}>
            <Checkbox value="black">Black</Checkbox>
            <Checkbox value="white">White</Checkbox>
          </CheckboxGroup>
        </Card>
        */}

        {/* Slider card for price range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Price ($)</h2>
          <Slider
            step={10}
            minValue={0}
            maxValue={1000}
            defaultValue={[0, 1000]}
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
            <TableColumn>Socket</TableColumn>
            <TableColumn>Memory Type</TableColumn>
            <TableColumn>Form Factor</TableColumn>
            <TableColumn>Max Memory Capacity</TableColumn>
            <TableColumn>Memory Slots</TableColumn>
            {/*<TableColumn>Color</TableColumn>*/}
            <TableColumn>Price</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody items={products}>
            {(motherboard) => (
              <TableRow key={motherboard.motherboardId}>
                <TableCell>
                  {motherboard.name
                    .replace("Motherboard", "")
                    .replace(motherboard.socket, "")
                    .replace(motherboard.motherboardMemoryType, "")
                    .replace("EATX", "")
                    .replace("ATX", "")
                    .replace("Micro", "")
                    .replace("Mini ITX", "")
                    .replace(`(${motherboard.partNum})`, "")}
                  <Image src={motherboard.image}
                    width="70"
                    height="70"
                    alt="motherboard" />
                </TableCell>
                <TableCell>{motherboard.socket}</TableCell>
                <TableCell>{motherboard.motherboardMemoryType}</TableCell>
                <TableCell>{motherboard.formFactor}</TableCell>
                <TableCell>{motherboard.memoryMax + ` GB`}</TableCell>
                <TableCell>{motherboard.memorySlot}</TableCell>
                {/*<TableCell>{motherboard.color}</TableCell>*/}
                <TableCell>{`$` + motherboard.price}</TableCell>
                <TableCell>
                  <Link href="/workshop">
                    <button
                      className="bg-[#DBAE58] text-black px-4 py-2 rounded transition-transform transform active:scale-95"
                      onClick={() => { updateSelectedMotherboard(motherboard); }}>Add to Build
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