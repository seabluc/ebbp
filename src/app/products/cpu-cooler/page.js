"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  CheckboxGroup,
  Checkbox,
  Card,
  Slider,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSharedData } from "../../../context/SharedDataContext";

export default function App() {
  const [component, setComponent] = useState([]);
  const { updateSelectedCPUCooler } = useSharedData();

  const fetchData = async (url, setData) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSelectedComponent = (component) => {
    updateSelectedCPUCooler(component);
  };

  useEffect(() => {
    fetchData("../api/cpuCoolers", setComponent);
  }, []);

  return (
    <div className="min-h-screen bg-[#4D585B] flex gap-4 p-4"> {/* Main background color */}
      <div className="flex flex-col gap-4 w-1/4 mt-4"> {/* Container for filter cards */}

        {/* Filter card for brands (moved to the first position) */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Select Manufacturer</h2>
          <CheckboxGroup label="Select brands" defaultValue={[]}>
            <Checkbox value="intel">CoolerMaster</Checkbox>
            <Checkbox value="amd">Kraken</Checkbox>
            <Checkbox value="intel">Be Quiet!</Checkbox>
            <Checkbox value="amd">Corsair</Checkbox>
            <Checkbox value="amd">Thermalright</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for processors */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Select Socket</h2>
          <CheckboxGroup label="Select processors" defaultValue={[]}>
            <Checkbox value="intel-i9">LGA1851</Checkbox>
            <Checkbox value="amd-ryzen-7">LGA1700</Checkbox>
            <Checkbox value="intel-i7">LGA1200</Checkbox>
            <Checkbox value="amd-ryzen-5">AM5</Checkbox>
            <Checkbox value="amd-ryzen-5">AM4</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for core count range */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Core Count Range</h2>
          <Slider
            step={1}
            minValue={2}
            maxValue={24}
            defaultValue={[4, 24]}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>

        {/* Slider card for performance */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Select Performance</h2>
          <CheckboxGroup label="Select performance" defaultValue={[]}>
            <Checkbox value="low">Low-end</Checkbox>
            <Checkbox value="medium">Mid-range</Checkbox>
            <Checkbox value="high">High-end</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for core clock range */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Performance Core Clock Range (GHz)</h2>
          <Slider
            step={0.1}
            minValue={0}
            maxValue={6}
            defaultValue={[2.0, 5.0]}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>

        {/* Slider card for performance core boost clock range */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Performance Core Boost Clock Range (GHz)</h2>
          <Slider
            step={0.1}
            minValue={0}
            maxValue={6}
            defaultValue={[2.5, 5.5]}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>

        {/* Filter card for microarchitecture */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Select Microarchitecture</h2>
          <CheckboxGroup label="Select microarchitecture" defaultValue={[]}>
            <Checkbox value="zen2">Zen 3</Checkbox>
            <Checkbox value="zen3">Zen 5</Checkbox>
            <Checkbox value="alder-lake">Arrow Lake</Checkbox>
            <Checkbox value="comet-lake">Alder Lake</Checkbox>
            <Checkbox value="jasper-lake">Raptor Lake Refresh</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for TDP range */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">TDP Range (W)</h2>
          <Slider
            step={10}
            minValue={0}
            maxValue={400}
            defaultValue={[100, 200]}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>

        {/* Filter card for integrated graphics */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Select Integrated Graphics</h2>
          <CheckboxGroup label="Select integrated graphics" defaultValue={[]}>
            <Checkbox value="intel-uhd">Intel Xe</Checkbox>
            <Checkbox value="intel-uhd">Intel UHD</Checkbox>
            <Checkbox value="intel-uhd">Radeon</Checkbox>
            <Checkbox value="none">None</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for price range (still in last position) */}
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Price Range</h2>
          <Slider
            step={50}
            minValue={0}
            maxValue={1000}
            defaultValue={[100, 500]}
            formatOptions={{ style: "currency", currency: "USD" }}
            className="max-w-md"
            label=" " // Keep the label for the slider
          />
        </Card>

        {/* Apply Filters Button */}
        <button className="mt-4 bg-[#DBAE58] text-black px-4 py-2 rounded transition-transform transform active:scale-95">
          Apply Filters
        </button>
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
                      onClick={() => {
                        handleSelectedComponent(cpuCooler);
                      }}>
                      Add to Build
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {/*} Testing the cpu cooler's supported sockets
            {component.map((cpuCooler) => (
              <TableRow key={cpuCooler.cpuCoolerId}>
                <TableCell>
                  {cpuCooler.supportedSockets.map((socket) => (
                    <li key={socket}>{socket}</li>
                  ))}</TableCell>
                <TableCell>sample cell</TableCell>
                <TableCell>sample cell</TableCell>
                <TableCell>sample cell</TableCell>
                <TableCell>sample cell</TableCell>
                <TableCell>sample cell</TableCell>
                <TableCell>sample cell</TableCell>
              </TableRow>
            ))}
              */}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}