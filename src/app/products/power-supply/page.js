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
  const { updateSelectedPowerSupply } = useSharedData();

  // Filter states
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [selectedFormFactors, setSelectedFormFactors] = useState([]);
  const [selectedEfficiency, setSelectedEfficiency] = useState([]);
  const [wattageRange, setWattageRange] = useState([0, 1800]);
  const [selectedModularity, setSelectedModularity] = useState([]);
  const [lengthRange, setLengthRange] = useState([100, 220]);
  const [priceRange, setPriceRange] = useState([0, 500]);

  useEffect(() => {
    fetchComponents("../api/powerSupplys", setComponents, setError);
  }, []);

  // Apply filters whenever the filter values change
  useEffect(() => {
    const filterComponents = () => {
      const filtered = components.filter((powerSupply) => {
        // Apply all filters based on selected criteria
        return (
          (selectedManufacturers.length === 0 || selectedManufacturers.includes(powerSupply.manufacturer.toLowerCase())) &&
          (selectedFormFactors.length === 0 || selectedFormFactors.includes(powerSupply.formFactor.toLowerCase())) &&
          (selectedEfficiency.length === 0 || selectedEfficiency.includes(powerSupply.efficiency.toLowerCase())) &&
          powerSupply.wattage >= wattageRange[0] && powerSupply.wattage <= wattageRange[1] &&
          (selectedModularity.length === 0 || selectedModularity.includes(powerSupply.modularity.toLowerCase())) &&
          powerSupply.length >= lengthRange[0] && powerSupply.length <= lengthRange[1] &&
          powerSupply.price >= priceRange[0] && powerSupply.price <= priceRange[1]
        );
      });
      setFilteredComponents(filtered);
    };

    filterComponents();
  }, [components, selectedManufacturers, selectedFormFactors, selectedEfficiency,
    selectedModularity, wattageRange, lengthRange, priceRange]);

  return (
    <div className="min-h-screen bg-[#4D585B] flex gap-4 p-4"> {/* Main background color */}
      <div className="flex flex-col gap-4 w-1/5 mt-4"> {/* Container for filter cards */}

        {/* Filter card for manufacturers */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Manufacturer</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedManufacturers}>
            <Checkbox value="asus">Asus</Checkbox>
            <Checkbox value="be quiet!">be quiet!</Checkbox>
            <Checkbox value="corsair">Corsair</Checkbox>
            <Checkbox value="lian li">Lian Li</Checkbox>
            <Checkbox value="msi">MSI</Checkbox>
            <Checkbox value="silverstone">Silverstone</Checkbox>
            <Checkbox value="thermaltake">Thermaltake</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for PSU form factors */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Form Factor</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedFormFactors}>
            <Checkbox value='atx'>ATX</Checkbox>
            <Checkbox value='sfx'>SFX</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for efficiency rating */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Efficiency Tier</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedEfficiency}>
            <Checkbox value="80+ titanium">80+ Titanium</Checkbox>
            <Checkbox value="80+ platinum">80+ Platinum</Checkbox>
            <Checkbox value="80+ gold">80+ Gold</Checkbox>
            <Checkbox value="80+ silver">80+ Silver</Checkbox>
            <Checkbox value="80+ bronze">80+ Bronze</Checkbox>
            <Checkbox value="80+">80+</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for wattage range */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Wattage (W)</h2>
          <Slider
            step={50}
            minValue={0}
            maxValue={1800}
            defaultValue={[0, 1800]}
            className="max-w-md"
            label=" " // Keep the label for the slider
            onChange={setWattageRange}
          />
        </Card>

        {/* Slider card for performance */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Modularity</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedModularity}>
            <Checkbox value="fully-modular">Full</Checkbox>
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
            onChange={setLengthRange}
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
            onChange={setPriceRange}
          />
        </Card>
      </div>

      {/* Container for table */}
      <div className="flex-grow flex items-start justify-center mt-4 gap-4">
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
            {filteredComponents.map((powerSupply) => (
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