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
  const { updateSelectedVideoCard } = useSharedData();

  useEffect(() => {
    fetchComponents("../api/videoCards", setComponent, setError);
  }, []);

  return (
    <div className="min-h-screen bg-[#4D585B] flex gap-4 p-4"> {/* Main background color */}
      <div className="flex flex-col gap-3 w-1/4 mt-4"> {/* Container for filter cards */}

        {/* Filter card for manufacturers */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Manufacturer</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value="MSI">MSI</Checkbox>
            <Checkbox value="xfx">XFX</Checkbox>
            <Checkbox value="yeston">Yeston</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for chipsets */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Chipset</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value="rtx 4090">GeForce RTX 4090</Checkbox>
            <Checkbox value="rtx 4080">GeForce RTX 4080</Checkbox>
            <Checkbox value="rtx 4070 super">GeForce RTX 4070 SUPER</Checkbox>
            <Checkbox value="rtx 4070">GeForce RTX 4070</Checkbox>
            <Checkbox value="rtx 4060">GeForce RTX 4060</Checkbox>
            <Checkbox value="rtx 3080 ti">GeForce RTX 3080 TI</Checkbox>
            <Checkbox value="rtx 3080">GeForce RTX 3080</Checkbox>
            <Checkbox value="rtx 3070">GeForce RTX 3070</Checkbox>
            <Checkbox value="rtx 3060">GeForce RTX 3060</Checkbox>
            {/*<Checkbox value="rtx 2080">GeForce RTX 2080</Checkbox>
            <Checkbox value="rtx 2070">GeForce RTX 2070</Checkbox>
            <Checkbox value="rtx 2060">GeForce RTX 2060</Checkbox>*/}
            <Checkbox value="rx 7900 XT">Radeon RX 7900 XTX</Checkbox>
            <Checkbox value="rx 7900 XT">Radeon RX 7900 XT</Checkbox>
            <Checkbox value="rx 7800 XT">Radeon RX 7800 XT</Checkbox>
            <Checkbox value="rx 7700 XT">Radeon RX 7700 XT</Checkbox>
            <Checkbox value="rx 7600 XT">Radeon RX 7600 XT</Checkbox>
            <Checkbox value="rx 6900 XT">Radeon RX 6900 XT</Checkbox>
            <Checkbox value="rx 6800 XT">Radeon RX 6800 XT</Checkbox>
            {/*
            <Checkbox value="rx 6700 XT">Radeon RX 6700 XT</Checkbox>
            <Checkbox value="rx 6600 XT">Radeon RX 6600 XT</Checkbox>
            <Checkbox value="rx 6500 XT">Radeon RX 6500 XT</Checkbox>
            <Checkbox value="rx 5700 XT">Radeon RX 5700 XT</Checkbox>
            <Checkbox value="rx 5600 XT">Radeon RX 5600 XT</Checkbox>
            <Checkbox value="rx 5500 XT">Radeon RX 5500 XT</Checkbox>*/}
          </CheckboxGroup>
        </Card>

        {/* Filter card for GDDR types */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]" >Graphics Memory Type</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value="GDDR6X">GDDR6X</Checkbox>
            <Checkbox value="GDDR6">GDDR6</Checkbox>
            <Checkbox value="GDDR5X">GDDR5X</Checkbox>
            <Checkbox value="GDDR5">GDDR5</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for VRAM range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">VRAM</h2>
          <Slider
            step={2}
            minValue={6}
            maxValue={24}
            defaultValue={[6, 24]}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>

        {/* Slider card for TDP range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">TDP (W)</h2>
          <Slider
            step={5}
            minValue={0}
            maxValue={200}
            defaultValue={[0, 200]}
            className="max-w-md"
            label=" " // Keep the label for the slider
          //onChange={setTdpRange}
          />
        </Card>

        {/* Slider card for length range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Length (mm)</h2>
          <Slider
            step={5}
            minValue={200}
            maxValue={500}
            defaultValue={[0, 500]}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>

        {/* Slider card for price range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Price ($)</h2>
          <Slider
            step={10}
            minValue={0}
            maxValue={3500}
            defaultValue={[0, 3500]}
            formatOptions={{ style: "currency", currency: "USD" }}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>
      </div>

      {/* Container for table */}
      <div className="flex-grow flex items-start justify-center mt-4 gap-4">
        <Table
          aria-label="Video Card Information Table"
          className="border-collapse w-full text-[#4D585B] rounded pr-4" // Full width for the table with right padding
          isStriped
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
          <TableBody>
            {component.map((videoCard) => (
              <TableRow key={videoCard.videoCardId}>
                <TableCell>
                  {videoCard.name}
                  <Image src={videoCard.image}
                    width="70"
                    height="70"
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}