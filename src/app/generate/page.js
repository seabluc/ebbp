'use client'; // Indicates this is a client component
import React, { useState } from "react";
import { Card, Button, Slider, RadioGroup, Radio, CheckboxGroup, Checkbox } from "@nextui-org/react";

export default function Home() {
  const [priceRange, setPriceRange] = useState([1000, 10000]); // Initial range values

  return (
    <div className="min-h-screen bg-[#4D585B] flex flex-col items-center p-8"> {/* Charcoal background */}
      <h1 className="text-center text-4xl mt-8 mb-4 font-bold text-[#DBAE58]">Generate PC Page</h1> {/* Title: Gold */}

      {/* Card for Price Range Slider */}
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mt-8 p-4"> {/* Background: Gray 500 */}
        <h2 className="text-2xl font-semibold mb-4 text-[#DBAE58] text-center">Price Range</h2> {/* Slider title: Gold */}

        <p className="text-center text-[#D3D3D3] mb-4"> {/* Light Gray text */}
          ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
        </p>

        <Slider
          step={50}
          minValue={1000}
          maxValue={10000}
          defaultValue={priceRange} // Updated range values
          formatOptions={{ style: "currency", currency: "USD" }}
          className="max-w-md"
          onChange={setPriceRange} // Update range values in real-time
        />
      </Card>

      {/* Card for Tower Size Radio Group */}
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#DBAE58] text-center">Tower Size</h2>
        <RadioGroup label={<span className="text-[#D3D3D3]">Select Tower Size</span>} defaultValue="mid">
          <Radio value="small" className="text-[#D3D3D3]">Small Tower</Radio>
          <Radio value="mid" className="text-[#D3D3D3]">Mid Tower</Radio>
          <Radio value="full" className="text-[#D3D3D3]">Full Tower</Radio>
        </RadioGroup>
      </Card>

      {/* Card for CPU Preference Filter */}
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#DBAE58] text-center">CPU Preference</h2>
        <CheckboxGroup label={<span className="text-[#D3D3D3]">Select preferred CPU(s)</span>} defaultValue={[]}>
          <Checkbox value="intel" className="text-[#D3D3D3]">Intel</Checkbox>
          <Checkbox value="amd" className="text-[#D3D3D3]">AMD</Checkbox>
          <Checkbox value="no-preference" className="text-[#D3D3D3]">No Preference</Checkbox>
        </CheckboxGroup>
      </Card>

      {/* Card for GPU Preference Filter */}
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#DBAE58] text-center">GPU Preference</h2>
        <CheckboxGroup label={<span className="text-[#D3D3D3]">Select preferred GPU(s)</span>} defaultValue={[]}>
          <Checkbox value="nvidia-3060" className="text-[#D3D3D3]">NVIDIA 3060</Checkbox>
          <Checkbox value="nvidia-3070" className="text-[#D3D3D3]">NVIDIA 3070</Checkbox>
          <Checkbox value="nvidia-3080" className="text-[#D3D3D3]">NVIDIA 3080</Checkbox>
          <Checkbox value="nvidia-3090" className="text-[#D3D3D3]">NVIDIA 3090</Checkbox>
          <Checkbox value="amd-rx6700" className="text-[#D3D3D3]">AMD RX 6700</Checkbox>
          <Checkbox value="amd-rx6800" className="text-[#D3D3D3]">AMD RX 6800</Checkbox>
          <Checkbox value="amd-rx6900" className="text-[#D3D3D3]">AMD RX 6900</Checkbox>
          <Checkbox value="no-preference" className="text-[#D3D3D3]">No Preference</Checkbox>
        </CheckboxGroup>
      </Card>

      {/* Card for RAM Filter */}
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#DBAE58] text-center">RAM Preference</h2>
        <CheckboxGroup label={<span className="text-[#D3D3D3]">Select preferred RAM Size(s)</span>} defaultValue={[]}>
          <Checkbox value="4gb" className="text-[#D3D3D3]">4GB</Checkbox>
          <Checkbox value="8gb" className="text-[#D3D3D3]">8GB</Checkbox>
          <Checkbox value="16gb" className="text-[#D3D3D3]">16GB</Checkbox>
          <Checkbox value="32gb" className="text-[#D3D3D3]">32GB</Checkbox>
          <Checkbox value="64gb" className="text-[#D3D3D3]">64GB</Checkbox>
          <Checkbox value="no-preference" className="text-[#D3D3D3]">No Preference</Checkbox>
        </CheckboxGroup>
      </Card>

      {/* Card for Storage Type Filter */}
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#DBAE58] text-center">Storage Type</h2>
        <CheckboxGroup label={<span className="text-[#D3D3D3]">Select preferred Storage Type(s)</span>} defaultValue={[]}>
          <Checkbox value="ssd" className="text-[#D3D3D3]">SSD</Checkbox>
          <Checkbox value="hdd" className="text-[#D3D3D3]">HDD</Checkbox>
          <Checkbox value="nvme" className="text-[#D3D3D3]">NVMe</Checkbox>
          <Checkbox value="no-preference" className="text-[#D3D3D3]">No Preference</Checkbox>
        </CheckboxGroup>
      </Card>

      {/* Card for Operating System Preference Filter */}
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#DBAE58] text-center">Operating System Preference</h2>
        <CheckboxGroup label={<span className="text-[#D3D3D3]">Select preferred OS</span>} defaultValue={[]}>
          <Checkbox value="windows" className="text-[#D3D3D3]">Windows</Checkbox>
          <Checkbox value="linux" className="text-[#D3D3D3]">Linux</Checkbox>
          <Checkbox value="macos" className="text-[#D3D3D3]">macOS</Checkbox>
          <Checkbox value="no-preference" className="text-[#D3D3D3]">No Preference</Checkbox>
        </CheckboxGroup>
      </Card>

      {/* Card for Upgradability Filter */}
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#DBAE58] text-center">Upgradability</h2>
        <CheckboxGroup label={<span className="text-[#D3D3D3]">Is upgradability important?</span>} defaultValue={[]}>
          <Checkbox value="easy-upgrade" className="text-[#D3D3D3]">Easily Upgradable</Checkbox>
          <Checkbox value="no-upgrade" className="text-[#D3D3D3]">No upgrade maintenance</Checkbox>
          <Checkbox value="no-preference" className="text-[#D3D3D3]">No Preference</Checkbox>
        </CheckboxGroup>
      </Card>

      {/* Card for Cooling Preference Filter */}
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#DBAE58] text-center">Cooling Preference</h2>
        <CheckboxGroup label={<span className="text-[#D3D3D3]">Select preferred cooling type</span>} defaultValue={[]}>
          <Checkbox value="air-cooling" className="text-[#D3D3D3]">Air Cooling</Checkbox>
          <Checkbox value="liquid-cooling" className="text-[#D3D3D3]">Liquid Cooling</Checkbox>
          <Checkbox value="no-preference" className="text-[#D3D3D3]">No Preference</Checkbox>
        </CheckboxGroup>
      </Card>

      {/* Card for Overclocking Filter */}
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#DBAE58] text-center">Overclocking</h2>
        <CheckboxGroup label={<span className="text-[#D3D3D3]">Do you need overclocking support?</span>} defaultValue={[]}>
          <Checkbox value="yes-overclocking" className="text-[#D3D3D3]">Yes</Checkbox>
          <Checkbox value="no-overclocking" className="text-[#D3D3D3]">No</Checkbox>
          <Checkbox value="no-preference" className="text-[#D3D3D3]">No Preference</Checkbox>
        </CheckboxGroup>
      </Card>

      {/* Card for Power Supply Filter */}
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#DBAE58] text-center">Power Supply</h2>
        <CheckboxGroup label={<span className="text-[#D3D3D3]">Select preferred power supply capacity</span>} defaultValue={[]}>
          <Checkbox value="450w" className="text-[#D3D3D3]">450W</Checkbox>
          <Checkbox value="550w" className="text-[#D3D3D3]">550W</Checkbox>
          <Checkbox value="650w" className="text-[#D3D3D3]">650W</Checkbox>
          <Checkbox value="750w" className="text-[#D3D3D3]">750W</Checkbox>
          <Checkbox value="850w" className="text-[#D3D3D3]">850W</Checkbox>
          <Checkbox value="no-preference" className="text-[#D3D3D3]">No Preference</Checkbox>
        </CheckboxGroup>
      </Card>

      {/* Card for BIOS Version Filter */}
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#DBAE58] text-center">BIOS Version</h2>
        <CheckboxGroup label={<span className="text-[#D3D3D3]">Select preferred BIOS version</span>} defaultValue={[]}>
          <Checkbox value="latest" className="text-[#D3D3D3]">Latest Version</Checkbox>
          <Checkbox value="stable" className="text-[#D3D3D3]">Stable Version</Checkbox>
          <Checkbox value="legacy" className="text-[#D3D3D3]">Legacy Version</Checkbox>
          <Checkbox value="no-preference" className="text-[#D3D3D3]">No Preference</Checkbox>
        </CheckboxGroup>
      </Card>

      {/* Card for Preferred Retailers Filter */}
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#DBAE58] text-center">Preferred Retailers</h2>
        <CheckboxGroup label={<span className="text-[#D3D3D3]">Select preferred retailers</span>} defaultValue={[]}>
          <Checkbox value="amazon" className="text-[#D3D3D3]">Amazon</Checkbox>
          <Checkbox value="newegg" className="text-[#D3D3D3]">Newegg</Checkbox>
          <Checkbox value="microcenter" className="text-[#D3D3D3]">Micro Center</Checkbox>
          <Checkbox value="bestbuy" className="text-[#D3D3D3]">Best Buy</Checkbox>
          <Checkbox value="no-preference" className="text-[#D3D3D3]">No Preference</Checkbox>
        </CheckboxGroup>
      </Card>

      {/* Card for Aesthetic Preference Filter */}
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#DBAE58] text-center">Aesthetic Preference</h2>
        <CheckboxGroup label={<span className="text-[#D3D3D3]">Select preferred aesthetic(s)</span>} defaultValue={[]}>
          <Checkbox value="rgb" className="text-[#D3D3D3]">RGB Lighting</Checkbox>
          <Checkbox value="minimalist" className="text-[#D3D3D3]">Minimalist</Checkbox>
          <Checkbox value="gamer" className="text-[#D3D3D3]">Gamer Look</Checkbox>
          <Checkbox value="professional" className="text-[#D3D3D3]">Professional</Checkbox>
          <Checkbox value="no-preference" className="text-[#D3D3D3]">No Preference</Checkbox>
        </CheckboxGroup>
      </Card>

      {/* Card for Noise Level Filter */}
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#DBAE58] text-center">Noise Level</h2>
        <CheckboxGroup label={<span className="text-[#D3D3D3]">Select preferred noise level</span>} defaultValue={[]}>
          <Checkbox value="silent" className="text-[#D3D3D3]">Silent</Checkbox>
          <Checkbox value="quiet" className="text-[#D3D3D3]">Quiet</Checkbox>
          <Checkbox value="standard" className="text-[#D3D3D3]">Standard</Checkbox>
          <Checkbox value="no-preference" className="text-[#D3D3D3]">No Preference</Checkbox>
        </CheckboxGroup>
      </Card>

      {/* Card for PC Building Experience Filter */}
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#DBAE58] text-center">PC Building Experience</h2>
        <CheckboxGroup label={<span className="text-[#D3D3D3]">Select your experience level</span>} defaultValue={[]}>
          <Checkbox value="beginner" className="text-[#D3D3D3]">Beginner</Checkbox>
          <Checkbox value="intermediate" className="text-[#D3D3D3]">Intermediate</Checkbox>
          <Checkbox value="advanced" className="text-[#D3D3D3]">Advanced</Checkbox>
        </CheckboxGroup>
      </Card>

      {/* Card for Primary Use Case Filter */}
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#DBAE58] text-center">Primary Use Case</h2>
        <CheckboxGroup label={<span className="text-[#D3D3D3]">Select the primary use case(s)</span>} defaultValue={[]}>
          <Checkbox value="gaming" className="text-[#D3D3D3]">Gaming</Checkbox>
          <Checkbox value="workstation" className="text-[#D3D3D3]">Workstation (Video Editing, CAD)</Checkbox>
          <Checkbox value="general-use" className="text-[#D3D3D3]">General Use (Browsing, Office Work)</Checkbox>
          <Checkbox value="media-center" className="text-[#D3D3D3]">Media Center</Checkbox>
          <Checkbox value="server" className="text-[#D3D3D3]">Home Server</Checkbox>
          <Checkbox value="no-preference" className="text-[#D3D3D3]">No Preference</Checkbox>
        </CheckboxGroup>
      </Card>

      {/* Generate Button */}
      <Button
        className="mt-8 bg-[#DBAE58] text-[#4D585B] font-semibold w-[350px] py-3"
        auto
        bordered
        shadow
      >
        Generate
      </Button>

    </div>
  );
}
