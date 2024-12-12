"use client";

import {
  Card, CheckboxGroup, Checkbox, Slider, Image, Table, TableHeader, TableBody,
  TableColumn, TableRow, TableCell, Pagination
} from "@nextui-org/react";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSharedData } from "@/context/SharedDataContext";

export default function PowerSupplyClient({ initialData }) {
  // Contains all PC parts from sibling serverAction.js file
  const components = initialData;
  // Adds PC part to current PC Workshop build
  const { updateSelectedPowerSupply } = useSharedData();

  // Filter states
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [selectedFormFactors, setSelectedFormFactors] = useState([]);
  const [selectedEfficiency, setSelectedEfficiency] = useState([]);
  const [wattageRange, setWattageRange] = useState([0, 1650]);
  const [selectedModularity, setSelectedModularity] = useState([]);
  const [lengthRange, setLengthRange] = useState([0, 220]);
  const [priceRange, setPriceRange] = useState([0, 800]);

  // Filtered components
  const filteredComponents = useMemo(() => {
    return components.filter((powerSupply) => {
      return (
        (selectedManufacturers.length === 0 || selectedManufacturers.includes(powerSupply.manufacturer.toLowerCase())) &&

        (selectedFormFactors.length === 0 || selectedFormFactors.includes(powerSupply.formFactor.toLowerCase())) &&

        (selectedEfficiency.length === 0 || selectedEfficiency.includes(powerSupply.efficiency.toLowerCase())) &&

        powerSupply.wattage >= wattageRange[0] &&
        powerSupply.wattage <= wattageRange[1] &&

        (selectedModularity.length === 0 ||
          (selectedModularity.includes(powerSupply.modularity.toLowerCase())) ||
          (selectedModularity.includes('semi') && powerSupply.modularity.toLowerCase().includes('semi')) ||
          (selectedModularity.includes('non') && powerSupply.modularity.toLowerCase().includes('non'))) &&

        powerSupply.length >= lengthRange[0] &&
        powerSupply.length <= lengthRange[1] &&

        powerSupply.price >= priceRange[0] &&
        powerSupply.price <= priceRange[1]
      );
    });
  }, [components, selectedManufacturers, selectedFormFactors, selectedEfficiency,
    selectedModularity, wattageRange, lengthRange, priceRange]);

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
      <div className="flex flex-col gap-3 w-1/6 mt-4"> {/* Container for filter cards */}

        {/* Filter card for manufacturers */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Manufacturer</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedManufacturers}>
            <Checkbox value="cooler master">Cooler Master</Checkbox>
            <Checkbox value="corsair">Corsair</Checkbox>
            <Checkbox value="evga">EVGA</Checkbox>
            <Checkbox value="thermaltake">Thermaltake</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for PSU form factors */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Form Factor</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedFormFactors}>
            <Checkbox value='atx'>ATX</Checkbox>
            <Checkbox value='sfx'>SFX</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for efficiency rating */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Efficiency Tier</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedEfficiency}>
            <Checkbox value="80+ titanium">80+ Titanium</Checkbox>
            <Checkbox value="80+ platinum">80+ Platinum</Checkbox>
            <Checkbox value="80+ gold">80+ Gold</Checkbox>
            <Checkbox value="80+ bronze">80+ Bronze</Checkbox>
            <Checkbox value="80+">80+</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for wattage range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Wattage (W)</h2>
          <Slider
            step={50}
            minValue={0}
            maxValue={1650}
            defaultValue={[0, 1650]}
            className="max-w-md"
            label=" " // Keep the label for the slider
            onChange={setWattageRange}
          />
        </Card>

        {/* Slider card for performance */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Modularity</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedModularity}>
            <Checkbox value="fully-modular">Full</Checkbox>
            <Checkbox value="semi">Semi</Checkbox>
            <Checkbox value="non">Non-Modular</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for length range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Length (mm)</h2>
          <Slider
            step={20}
            minValue={0}
            maxValue={220}
            defaultValue={[0, 220]}
            className="max-w-md"
            label=" " // Keep the label for the slider
            onChange={setLengthRange}
          />
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

      {/* Container for Table and Load More button */}
      <div className="flex-grow flex flex-col items-start mt-4 gap-4">
        <Table
          aria-label="Power Supply Information Table"
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
            <TableColumn>Form Factor</TableColumn>
            <TableColumn>Efficiency Rating</TableColumn>
            <TableColumn>Wattage</TableColumn>
            <TableColumn>Modularity</TableColumn>
            <TableColumn>Length</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody items={products}>
            {(powerSupply) => (
              <TableRow key={powerSupply.psuId}>
                <TableCell>
                  {powerSupply.name
                    //.replace(`(${powerSupply.partNum})`, "")
                    .replace("Power Supply", "")
                    .replace(powerSupply.efficiency, "")
                    .replace("Titanium", "")
                    .replace("Platinum", "")
                    .replace("Gold", "")
                    .replace("GOLD", "")
                    .replace("Bronze", "")
                    .replace("White", "")
                    .replace("Form Factor", "")
                    .replace(`${powerSupply.wattage} W`, "")
                    .replace(powerSupply.formFactor, "")
                    .replace("Fully", "")
                    .replace("Semi", "")
                    .replace("Modular", "")
                    .replace("MODULAR", "")
                    .replace("FULL", "")
                    .replace("-modular", "")
                    .replace("Certified", "")
                    .replace("ATX", "")
                    .replace("SFX", "")
                  }
                  <Image src={powerSupply.image} width={70} height={70} alt="Power Supply" />
                </TableCell>
                <TableCell>{powerSupply.formFactor}</TableCell>
                <TableCell>{powerSupply.efficiency}</TableCell>
                <TableCell>{`${powerSupply.wattage} W`}</TableCell>
                <TableCell>{powerSupply.modularity}</TableCell>
                <TableCell>{`${powerSupply.length} mm`}</TableCell>
                <TableCell>{`$${powerSupply.price}`}</TableCell>
                <TableCell>
                  <Link href="/workshop">
                    <button
                      className="bg-[#DBAE58] text-black px-4 py-2 rounded transition-transform transform active:scale-95"
                      onClick={() => updateSelectedPowerSupply(powerSupply)}>
                      Add to Build
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