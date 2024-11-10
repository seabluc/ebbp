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
  const [component, setComponent] = useState([]);
  const [error, setError] = useState(null);
  const { updateSelectedMotherboard } = useSharedData();

  useEffect(() => {
    fetchComponents("../api/motherboards", setComponent, setError);
  }, []);

  return (
    <div className="min-h-screen bg-[#4D585B] flex gap-4 p-4"> {/* Main background color */}
      <div className="flex flex-col gap-4 w-1/5 mt-4"> {/* Container for filter cards */}

        {/* Filter card for manufacturers */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Manufacturer</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value="asus">Asus</Checkbox>
            <Checkbox value="asrock">ASRock</Checkbox>
            <Checkbox value="gigabyte">Gigabyte</Checkbox>
            <Checkbox value="msi">MSI</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for processors */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Socket</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value="lga1851">LGA1851</Checkbox>
            <Checkbox value="lga1700">LGA1700</Checkbox>
            <Checkbox value="lga1200">LGA1200</Checkbox>
            <Checkbox value="am5">AM5</Checkbox>
            <Checkbox value="am4">AM4</Checkbox>
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

        {/* Filter card for form factors */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Form Factor</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value="eatx">E-ATX</Checkbox>
            <Checkbox value="atx">ATX</Checkbox>
            <Checkbox value="matx">mATX</Checkbox>
            <Checkbox value="itx">Mini-ITX</Checkbox>
          </CheckboxGroup>
        </Card>


        {/* Slider card for Memory range */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Memory Capacity (GB)</h2>
          <Slider
            step={32}
            minValue={96}
            maxValue={256}
            defaultValue={[96, 256]}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>

        {/* Filter card for Memory Slots */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]" >Memory Slots</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value="4">4</Checkbox>
            <Checkbox value="2">2</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for Color */}
        {/*
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Color</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value="black">Black</Checkbox>
            <Checkbox value="white">White</Checkbox>
          </CheckboxGroup>
        </Card>
        */}

        {/* Slider card for price range (still in last position) */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Price ($)</h2>
          <Slider
            step={10}
            minValue={0}
            maxValue={700}
            defaultValue={[0, 700]}
            formatOptions={{ style: "currency", currency: "USD" }}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>
      </div>

      <div className="flex-grow flex items-start justify-center mt-4 gap-4"> {/* Container for table */}
        <Table
          aria-label="Motherboard Information Table"
          className="border-collapse w-full text-[#4D585B] rounded pr-4" // Full width for the table with right padding
          isStriped
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
          <TableBody>
            {component.map((motherboard) => (
              <TableRow key={motherboard.motherboardId}>
                <TableCell>
                  {motherboard.name}
                  <Image src={motherboard.image}
                    width="70"
                    height="70"
                    alt="motherboard" />
                </TableCell>
                <TableCell>{motherboard.socket}</TableCell>
                <TableCell>{motherboard.memoryType}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}