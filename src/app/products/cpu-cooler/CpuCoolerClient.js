"use client";

import {
  Card, CheckboxGroup, Checkbox, Slider, Image, Table, TableHeader, TableBody,
  TableColumn, TableRow, TableCell, Pagination
} from "@nextui-org/react";
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSharedData } from "@/context/SharedDataContext";

export default function CpuCoolerClient({ initialData }) {
  // Contains all PC parts from sibling serverAction.js file
  const components = initialData;
  // Adds PC part to current PC Workshop build
  const { updateSelectedCPUCooler } = useSharedData();

  // AIO Coolers handler
  const [isSelected, setIsSelected] = useState(false);
  const [liquidCoolers, setLiquidCoolers] = useState(false);
  useEffect(() => {
    if (isSelected) {
      setLiquidCoolers(false);
    }
  }, [isSelected])

  // Filter states
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [selectedSockets, setSelectedSockets] = useState([]);
  const [fanRPMRange, setFanRPMRange] = useState([1400, 2900]);
  const [noiseLevelRange, setNoiseLevelRange] = useState([22, 40]);
  const [selectedWaterCooler, setSelectedWaterCooler] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);

  // Filtered components
  const filteredComponents = useMemo(() => {
    return components.filter((cooler) => {
      return (
        (selectedManufacturers.length === 0 || selectedManufacturers.includes(cooler.manufacturer.toLowerCase())) &&

        (selectedSockets.length === 0 ||
          (selectedSockets.includes(cooler.supportedSockets.toLowerCase())) ||
          (selectedSockets.includes('lga1851') && cooler.supportedSockets.toLowerCase().includes('lga1851')) ||
          (selectedSockets.includes('lga1700') && cooler.supportedSockets.toLowerCase().includes('lga1851')) ||
          (selectedSockets.includes('am5') && cooler.supportedSockets.toLowerCase().includes('am5')) ||
          (selectedSockets.includes('am4') && cooler.supportedSockets.toLowerCase().includes('am4'))) &&

        cooler.fanRPM >= fanRPMRange[0] &&
        cooler.fanRPM <= fanRPMRange[1] &&

        cooler.noiseLevel >= noiseLevelRange[0] &&
        cooler.noiseLevel <= noiseLevelRange[1] &&

        (selectedWaterCooler.length === 0 ||
          (selectedWaterCooler.includes('420') && cooler.radiatorSize === 420) ||
          (selectedWaterCooler.includes('360') && cooler.radiatorSize === 360) ||
          (selectedWaterCooler.includes('280') && cooler.radiatorSize === 280) ||
          (selectedWaterCooler.includes('240') && cooler.radiatorSize === 240) ||
          (selectedWaterCooler.includes('120') && cooler.radiatorSize === 120) ||
          (selectedWaterCooler.includes('air') && cooler.radiatorSize === null)) &&

        cooler.price >= priceRange[0] &&
        cooler.price <= priceRange[1]
      );
    });
  }, [components, selectedManufacturers, selectedSockets, fanRPMRange,
    noiseLevelRange, selectedWaterCooler, priceRange]);

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
            <Checkbox value="be quiet!">Be Quiet!</Checkbox>
            <Checkbox value="cooler master">Cooler Master</Checkbox>
            <Checkbox value="corsair">Corsair</Checkbox>
            <Checkbox value="noctua">Noctua</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for processors */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Socket Compatibility</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedSockets}>
            <Checkbox value="lga1851">LGA1851</Checkbox>
            <Checkbox value="lga1700">LGA1700</Checkbox>
            <Checkbox value="am5">AM5</Checkbox>
            <Checkbox value="am4">AM4</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for RPM range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Fan Speed (RPM)</h2>
          <Slider
            step={100}
            minValue={1400}
            maxValue={2900}
            defaultValue={[1400, 2900]}
            className="max-w-md"
            label=" " // Keep the label for the slider
            onChange={setFanRPMRange}
          />
        </Card>

        {/* Slider card for noise level range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Noise Level (dB)</h2>
          <Slider
            step={2}
            minValue={22}
            maxValue={40}
            defaultValue={[22, 40]}
            className="max-w-md"
            label=" " // Keep the label for the slider
            onChange={setNoiseLevelRange}
          />
        </Card>

        {/* Slider card for height range */}
        {/*
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Height (mm)</h2>
          <Slider
            step={10}
            minValue={0}
            maxValue={200}
            defaultValue={[0, 200]}
            className="max-w-md"
            label=" " // Keep the label for the slider
            onChange={setHeightRange}
          />
        </Card>
        */}

        {/* Filter card for Radiator Sizes */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Liquid Coolers (Radiator Sizes)</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedWaterCooler}>
            <Checkbox value="420">420 mm</Checkbox>
            <Checkbox value="360" isSelected={liquidCoolers} isDisabled={liquidCoolers}>360 mm</Checkbox>
            <Checkbox value="280">280 mm</Checkbox>
            <Checkbox value="240">240 mm</Checkbox>
            <Checkbox value="120" isSelected={liquidCoolers} isDisabled={liquidCoolers}>120 mm</Checkbox>
            <Checkbox value="air" isSelected={isSelected} onValueChange={setIsSelected}>None</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for price range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
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
          aria-label="Cpu Information Table"
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
            <TableColumn>Fan RPM</TableColumn>
            <TableColumn>Noise Level</TableColumn>
            <TableColumn>Height (mm)</TableColumn>
            <TableColumn>Raditor Size (mm)</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody items={products}>
            {(cpuCooler) => (
              <TableRow key={cpuCooler.cpuCoolerId}>
                <TableCell>
                  {cpuCooler.name
                    .replace(`(${cpuCooler.partNum})`, "")
                    .replace("Liquid CPU Cooler", "")
                    .replace("CPU Cooler", "")
                    .replace("120L", "")
                    .replace("120", "")
                    .replace("240L", "")
                    .replace("240", "")
                    .replace("280L", "")
                    .replace("280", "")
                    .replace("360L", "")
                    .replace("360", "")
                  }
                  <Image src={cpuCooler.image}
                    width={70}
                    height={70}
                    alt="cpuCooler" />
                </TableCell>
                <TableCell>{cpuCooler.fanRPM + ` RPM`}</TableCell>
                <TableCell>{cpuCooler.noiseLevel + ` dB`}</TableCell>
                <TableCell>{cpuCooler.height ? cpuCooler.height + ' mm' : '--'}</TableCell>
                <TableCell>{cpuCooler.radiatorSize ? cpuCooler.radiatorSize + ' mm' : "--"}</TableCell>
                <TableCell>{`$` + cpuCooler.price}</TableCell>
                <TableCell>
                  <Link href="/workshop">
                    <button
                      className="bg-[#DBAE58] text-black px-4 py-2 rounded transition-transform transform active:scale-95"
                      onClick={() => { updateSelectedCPUCooler(cpuCooler); }}>Add to Build
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