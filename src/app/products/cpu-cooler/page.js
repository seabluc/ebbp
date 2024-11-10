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
  const { updateSelectedCPUCooler } = useSharedData();

  useEffect(() => {
    fetchComponents("../api/cpuCoolers", setComponent, setError);
  }, []);

  return (
    <div className="min-h-screen bg-[#4D585B] flex gap-4 p-4"> {/* Main background color */}
      <div className="flex flex-col gap-4 w-1/5 mt-4"> {/* Container for filter cards */}

        {/* Filter card for manufacturers */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Manufacturer</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value="asus">Asus</Checkbox>
            <Checkbox value="arctic">Arctic</Checkbox>
            <Checkbox value="be quiet!">Be Quiet!</Checkbox>
            <Checkbox value="coolermaster">CoolerMaster</Checkbox>
            <Checkbox value="corsair">Corsair</Checkbox>
            <Checkbox value="deepcool">Deepcool</Checkbox>
            <Checkbox value="kraken">Kraken</Checkbox>
            <Checkbox value="noctua">Noctua</Checkbox>
            <Checkbox value="nzxt">NZXT</Checkbox>
            <Checkbox value="thermalright">Thermalright</Checkbox>
            <Checkbox value="vetroo">Vetroo</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for processors */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Compatible Sockets</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value="lga1851">LGA1851</Checkbox>
            <Checkbox value="lga1700">LGA1700</Checkbox>
            <Checkbox value="lga1200">LGA1200</Checkbox>
            <Checkbox value="am5">AM5</Checkbox>
            <Checkbox value="am4">AM4</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for RPM range */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Fan Speed (RPM)</h2>
          <Slider
            step={100}
            minValue={500}
            maxValue={2500}
            defaultValue={[0, 2500]}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>

        {/* Slider card for noise level range */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Noise Level (dB)</h2>
          <Slider
            step={2}
            minValue={10}
            maxValue={40}
            defaultValue={[10, 40]}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>

        {/* Slider card for height range */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Height (mm)</h2>
          <Slider
            step={10}
            minValue={0}
            maxValue={200}
            defaultValue={[0, 200]}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>

        {/* Filter card for Radiator Sizes */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Radiator Sizes</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value="240">240 mm</Checkbox>
            <Checkbox value="360">360 mm</Checkbox>
            <Checkbox value="420">420 mm</Checkbox>
            <Checkbox value="none">None</Checkbox>
          </CheckboxGroup>
        </Card>

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
          //onChange={setPriceRange}
          />
        </Card>
      </div>

      <div className="flex-grow flex items-start justify-center mt-4 gap-4"> {/* Container for table */}
        <Table
          aria-label="CPU Cooler Information Table"
          className="border-collapse w-full text-[#4D585B] rounded pr-4" // Full width for the table with right padding
          isStriped
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
          <TableBody>
            {component.map((cpuCooler) => (
              <TableRow key={cpuCooler.cpuCoolerId}>
                <TableCell>
                  {cpuCooler.name}
                  <Image src={cpuCooler.image}
                    width="70"
                    height="70"
                    alt="cpuCooler" />
                </TableCell>
                <TableCell>{cpuCooler.fanRPM + ` RPM`}</TableCell>
                <TableCell>{cpuCooler.noiseLevel + ` dB`}</TableCell>
                <TableCell>{cpuCooler.height || "--"}</TableCell>
                <TableCell>{cpuCooler.radiatorSize || "--"}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}