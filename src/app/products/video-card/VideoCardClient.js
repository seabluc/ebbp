"use client";

import {
  Card, CheckboxGroup, Checkbox, Slider, Image, Table, TableHeader, TableBody,
  TableColumn, TableRow, TableCell, Pagination
} from "@nextui-org/react";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSharedData } from "@/context/SharedDataContext";

export default function VideoCardClient({ initialData }) {
  // Contains all PC parts from sibling serverAction.js file
  const components = initialData;
  // Adds PC part to current PC Workshop build
  const { updateSelectedVideoCard } = useSharedData();

  // Filter states
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [selectedChipset, setSelectedChipset] = useState([]);
  const [selectedVRAMType, setSelectedVRAMType] = useState([]);
  const [vramCapacityRange, setVramCapacityRange] = useState([0, 24]);
  //const [speedRange, setSpeedRange] = useState([0, 2600]);
  const [tdpRange, setTdpRange] = useState([0, 450]);
  const [lengthRange, setLengthRange] = useState([0, 500]);
  const [priceRange, setPriceRange] = useState([0, 4500]);

  // Filtered components
  const filteredComponents = useMemo(() => {
    return components.filter((gpu) => {
      return (
        (selectedManufacturers.length === 0 || selectedManufacturers.includes(gpu.manufacturer.toLowerCase())) &&

        (selectedChipset.length === 0 ||
          selectedChipset.includes(gpu.chipset.toLowerCase()) ||
          (selectedChipset.includes('geforce rtx 40') && gpu.chipset.toLowerCase().includes('geforce rtx 40')) ||
          (selectedChipset.includes('geforce rtx 30') && gpu.chipset.toLowerCase().includes('geforce rtx 30')) ||
          (selectedChipset.includes('geforce gtx 16') && gpu.chipset.toLowerCase().includes('geforce gtx 16')) ||
          (selectedChipset.includes('rx 5') && (gpu.chipset.toLowerCase().includes('radeon rx 5') && gpu.memoryType === 'GDDR5')) ||
          (selectedChipset.includes('radeon rx 5') && (gpu.chipset.toLowerCase().includes('radeon rx 5')) && gpu.memoryType != 'GDDR5') ||
          (selectedChipset.includes('radeon rx 6') && gpu.chipset.toLowerCase().includes('radeon rx 6')) ||
          (selectedChipset.includes('radeon rx 7') && gpu.chipset.toLowerCase().includes('radeon rx 7'))) &&

        (selectedVRAMType.length === 0 || selectedVRAMType.includes(gpu.memoryType.toLowerCase())) &&

        gpu.memory >= vramCapacityRange[0] &&
        gpu.memory <= vramCapacityRange[1] &&

        //gpu.coreClock >= speedRange[0] &&
        //gpu.coreClock <= speedRange[1] &&

        gpu.tdp >= tdpRange[0] &&
        gpu.tdp <= tdpRange[1] &&

        gpu.length >= lengthRange[0] &&
        gpu.length <= lengthRange[1] &&

        gpu.price >= priceRange[0] &&
        gpu.price <= priceRange[1]
      );
    });
  }, [components, selectedManufacturers, selectedChipset, selectedVRAMType,
    vramCapacityRange, /*speedRange*/, tdpRange, lengthRange, priceRange,
  ]);

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
        {/*
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Manufacturer</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedManufacturers}>
            <Checkbox value="radeon">AMD Radeon RX</Checkbox>
            <Checkbox value="geforce">Nvidia Geforce</Checkbox>
          </CheckboxGroup>
        </Card>
        */}

        {/* Filter card for Board Partners */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Board Partners</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedManufacturers}>
            <Checkbox value="asus">Asus</Checkbox>
            <Checkbox value="evga">EVGA</Checkbox>
            <Checkbox value="gigabyte">Gigabyte</Checkbox>
            <Checkbox value="msi">MSI</Checkbox>
            <Checkbox value="xfx">XFX</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for chipsets */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Chipset</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedChipset}>
            <Checkbox value="geforce rtx 40">GeForce RTX 40 Series</Checkbox>
            <Checkbox value="geforce rtx 30">GeForce RTX 30 Series</Checkbox>
            <Checkbox value="geforce gtx 16">GeForce GTX 16 Series</Checkbox>
            <Checkbox value="rx 5">Radeon RX 500 Series</Checkbox>
            <Checkbox value="radeon rx 5">Radeon RX 5000 Series</Checkbox>
            <Checkbox value="radeon rx 6">Radeon RX 6000 Series</Checkbox>
            <Checkbox value="radeon rx 7">Radeon RX 7000 Series</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for GDDR types */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]" >Graphics Memory Type</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedVRAMType}>
            <Checkbox value="gddr6x">GDDR6X</Checkbox>
            <Checkbox value="gddr6">GDDR6</Checkbox>
            <Checkbox value="gddr5">GDDR5</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for VRAM range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">VRAM (GB)</h2>
          <Slider
            step={2}
            minValue={0}
            maxValue={24}
            defaultValue={[0, 24]}
            className="max-w-md"
            label=" " // Keep the label for the slider
            onChange={setVramCapacityRange}
          />
        </Card>

        {/* Slider card for TDP range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">TDP (W)</h2>
          <Slider
            step={25}
            minValue={0}
            maxValue={450}
            defaultValue={[0, 450]}
            className="max-w-md"
            label=" " // Keep the label for the slider
            onChange={setTdpRange}
          />
        </Card>

        {/* Slider card for length range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Length (mm)</h2>
          <Slider
            step={20}
            minValue={0}
            maxValue={400}
            defaultValue={[0, 500]}
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
            maxValue={4500}
            defaultValue={[0, 4500]}
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
          aria-label="Storage Information Table"
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
            <TableColumn>Chipset</TableColumn>
            <TableColumn>Graphics Memory Type</TableColumn> {/* Add (?) icon and provide ToolTip ... GDDR does not need to be equal to Memory DDR */}
            <TableColumn>VRAM</TableColumn> {/* Add (?) icon and provide ToolTip */}
            <TableColumn>Core Clock</TableColumn>
            {/*<TableColumn>Boost Clock (MHz)</TableColumn>*/}
            <TableColumn>TDP</TableColumn>
            <TableColumn>Length</TableColumn>
            {/*<TableColumn>Color</TableColumn>*/}
            <TableColumn>Price</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody items={products}>
            {(videoCard) => (
              <TableRow key={videoCard.videoCardId}>
                <TableCell>
                  {videoCard.name
                    //.replace(`(${videoCard.partNum})`, "")
                    .replace(`${videoCard.chipset}`, "")
                    .replace(`${videoCard.memory} GB`, "")
                    .replace("Video Card", "")
                  }
                  <Image src={videoCard.image}
                    width={70}
                    height={65}
                    alt="videoCard" />
                </TableCell>
                <TableCell>{videoCard.chipset}</TableCell>
                <TableCell>{videoCard.memoryType}</TableCell>
                <TableCell>{videoCard.memory + ` GB`}</TableCell>
                <TableCell>{videoCard.coreClock + ` MHz`}</TableCell>
                {/*<TableCell>{videoCard.boostClock || "--"}</TableCell>*/}
                <TableCell>{videoCard.tdp + ` W`}</TableCell>
                <TableCell>{videoCard.length + ` mm`}</TableCell>
                {/*<TableCell>{videoCard.color}</TableCell>*/}
                <TableCell>{`$` + videoCard.price}</TableCell>
                <TableCell>
                  <Link href="/workshop">
                    <button
                      className="bg-[#DBAE58] text-black px-4 py-2 rounded transition-transform transform active:scale-95"
                      onClick={() => { updateSelectedVideoCard(videoCard); }}>Add to Build
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