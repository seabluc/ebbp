"use client";

import { Card, CheckboxGroup, Checkbox, Slider } from "@nextui-org/react";
import { useEffect, useState } from 'react';

export default function Filters() {
  // Filter states
  //const [filteredComponents, setFilteredComponents] = useState([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [selectedMemoryType, setSelectedMemoryType] = useState([]);
  const [speedRange, setSpeedRange] = useState([2133, 8400]);
  const [latencyRange, setLatencyRange] = useState([13, 40]);
  const [trueLatencyRange, setTrueLatencyRange] = useState([7.3, 15.4]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 800]);

  return (
    <div className="flex flex-col gap-3 w-1/5 mt-4"> {/* Container for filter cards */}
      {/* Filter card for Manufacturers */}
      <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
        <h2 className="text-[#DBAE58]">Manufacturer</h2>
        <CheckboxGroup className="my-2" onChange={setSelectedManufacturers}>
          <Checkbox value="corsair">Corsair</Checkbox>
          <Checkbox value="crucial">Crucial</Checkbox>
          <Checkbox value="g.skill">G.Skill</Checkbox>
          <Checkbox value="kingston">Kingston</Checkbox>
        </CheckboxGroup>
      </Card>

      {/* Filter card for Memory Types */}
      <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
        <h2 className="text-[#DBAE58]" >Memory Type</h2>
        <CheckboxGroup className="my-2" onChange={setSelectedMemoryType}>
          <Checkbox value="ddr5">DDR5</Checkbox>
          <Checkbox value="ddr4">DDR4</Checkbox>
        </CheckboxGroup>
      </Card>

      {/* Slider card for speed range */}
      <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
        <h2 className="text-[#DBAE58]">Speed (MHz)</h2>
        <Slider
          step={100}
          minValue={2133}
          maxValue={8400}
          defaultValue={[2133, 8400]}
          className="max-w-md"
          label=" " // Keep the label for the slider
          onChange={setSpeedRange}
        />
      </Card>

      {/* Slider card for CAS latency range */}
      <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
        <h2 className="text-[#DBAE58]">CAS Latency</h2>
        <Slider
          step={1}
          minValue={13}
          maxValue={40}
          defaultValue={[13, 40]}
          className="max-w-md"
          label=" " // Keep the label for the slider
          onChange={setLatencyRange}
        />
      </Card>

      {/* Slider card for True latency range */}
      <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
        <h2 className="text-[#DBAE58]">True Latency (ns)</h2>
        <Slider
          step={0.1}
          minValue={7.0}
          maxValue={15.5}
          defaultValue={[7.0, 15.5]}
          className="max-w-md"
          label=" " // Keep the label for the slider
          onChange={setTrueLatencyRange}
        />
      </Card>

      {/* Filter card for Color */}
      <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
        <h2 className="text-[#DBAE58]">Color</h2>
        <CheckboxGroup className="my-2" onChange={setSelectedColor}>
          <Checkbox value="black">Black</Checkbox>
          <Checkbox value="white">White</Checkbox>
        </CheckboxGroup>
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
  );
}