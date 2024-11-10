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
  const { updateSelectedPowerSupply } = useSharedData();

  useEffect(() => {
    fetchComponents("../api/powerSupplys", setComponent, setError);
  }, []);

  return (
    <div className="min-h-screen bg-[#4D585B] flex gap-4 p-4"> {/* Main background color */}
      <div className="flex flex-col gap-4 w-1/4 mt-4"> {/* Container for filter cards */}

        {/* Filter card for manufacturers */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Manufacturer</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value="MSI">MSI</Checkbox>
            <Checkbox value="xfx">XFX</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for PSU form factors */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Form Factor</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value='ATX'>ATX</Checkbox>
            <Checkbox value='SFX'>SFX</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for efficiency rating */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Efficiency Tier</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value="80+ Titanium">80+ Titanium</Checkbox>
            <Checkbox value="80+ Platinum">80+ Platinum</Checkbox>
            <Checkbox value="80+ Gold">80+ Gold</Checkbox>
            <Checkbox value="80+ Silver">80+ Silver</Checkbox>
            <Checkbox value="80+ Bronze">80+ Bronze</Checkbox>
            <Checkbox value="80+">80+</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for wattage range */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Wattage (W)</h2>
          <Slider
            step={50}
            minValue={0}
            maxValue={1200}
            defaultValue={[0, 1200]}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>

        {/* Slider card for performance */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Modularity</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value="fully modular">Full</Checkbox>
            <Checkbox value="semi-modular">Semi</Checkbox>
            <Checkbox value="non-modular">Non-Modular</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for length range */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Length (mm)</h2>
          <Slider
            step={10}
            minValue={100}
            maxValue={200}
            defaultValue={[0, 200]}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>

        {/* Slider card for price range (still in last position) */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Price ($)</h2>
          <Slider
            step={10}
            minValue={0}
            maxValue={500}
            defaultValue={[0, 500]}
            formatOptions={{ style: "currency", currency: "USD" }}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>
      </div>

      <div className="flex-grow flex items-start justify-center mt-4 gap-4"> {/* Container for table */}
        <Table
          aria-label="Power Supply Information Table"
          className="border-collapse w-full text-[#4D585B] rounded pr-4" // Full width for the table with right padding
          isStriped
        >
          <TableHeader className="bg-[#488A99] text-[#DBAE58] rounded">
            <TableColumn>Name</TableColumn>
            <TableColumn>Form Factor</TableColumn>
            <TableColumn>Efficiency Rating</TableColumn>
            <TableColumn>Wattage</TableColumn>
            <TableColumn>Modularity</TableColumn>
            <TableColumn>Length</TableColumn>
            {/*<TableColumn>Color</TableColumn>*/}
            <TableColumn>Price</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody>
            {component.map((powerSupply) => (
              <TableRow key={powerSupply.powerSupplyId}>
                <TableCell>
                  {powerSupply.name}
                  <Image src={powerSupply.image}
                    width="70"
                    height="70"
                    alt="powerSupply" />
                </TableCell>
                <TableCell>{powerSupply.formFactor}</TableCell>
                <TableCell>{powerSupply.efficiency}</TableCell>
                <TableCell>{powerSupply.wattage + ` W`}</TableCell>
                <TableCell>{powerSupply.modularity}</TableCell>
                <TableCell>{powerSupply.length + ` mm`}</TableCell>
                {/*<TableCell>{powerSupply.color || "--"}</TableCell>*/}
                <TableCell>{`$` + powerSupply.price}</TableCell>
                <TableCell>
                  <Link href="/workshop">
                    <button
                      className="bg-[#DBAE58] text-black px-4 py-2 rounded transition-transform transform active:scale-95"
                      onClick={() => { updateSelectedPowerSupply(powerSupply); }}>Add to Build
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