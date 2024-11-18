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
  const { updateSelectedStorage } = useSharedData();

  // Filter states
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [capacityRange, setCapacityRange] = useState([0, 4]);
  const [selectedStorageTypes, setSelectedStorageTypes] = useState([]);
  const [selectedFormFactors, setSelectedFormFactors] = useState([]);
  const [selectedInterfaces, setSelectedInterfaces] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300]);

  useEffect(() => {
    fetchComponents("../api/storages", setComponents, setError);
  }, []);

  // Apply filters whenever the filter values change
  useEffect(() => {
    const filterComponents = () => {
      const filtered = components.filter((storage) => {
        // Apply all filters based on selected criteria
        return (
          (selectedManufacturers.length === 0 || selectedManufacturers.includes(storage.manufacturer.toLowerCase())) &&
          storage.capacity >= capacityRange[0] && storage.capacity <= capacityRange[1] &&
          (selectedStorageTypes.length === 0 || selectedStorageTypes.includes(storage.storageType.toLowerCase())) &&
          (selectedFormFactors.length === 0 || selectedFormFactors.includes(storage.formFactor.toLowerCase())) &&
          (selectedInterfaces.length === 0 || selectedInterfaces.includes(storage.interface)) &&
          storage.price >= priceRange[0] && storage.price <= priceRange[1]
        );
      });
      setFilteredComponents(filtered);
    };

    filterComponents();
  }, [components, selectedManufacturers, capacityRange, selectedStorageTypes,
    selectedFormFactors, selectedInterfaces, priceRange]);

  return (
    <div className="min-h-screen bg-[#4D585B] flex gap-4 p-4"> {/* Main background color */}
      <div className="flex flex-col gap-3 w-1/5 mt-4"> {/* Container for filter cards */}

        {/* Filter card for Manufacturers */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Manufacturer</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedManufacturers}>
            <Checkbox value="adata">ADATA</Checkbox>
            <Checkbox value="crucial">Crucial</Checkbox>
            <Checkbox value="kingston">Kingston</Checkbox>
            <Checkbox value="msi">MSI</Checkbox>
            <Checkbox value="patriot">Patriot</Checkbox>
            <Checkbox value="sk hynix">SK Hynix</Checkbox>
            <Checkbox value="samsung">Samsung</Checkbox>
            <Checkbox value="seagate">Seagate</Checkbox>
            <Checkbox value="teamgroup">TEAMGROUP</Checkbox>
            <Checkbox value="toshiba">Toshiba</Checkbox>
            <Checkbox value="western digital">Western Digital</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for storage capacity */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Storage Capacity (TB)</h2>
          <Slider
            step={0.250}
            minValue={0}
            maxValue={4}
            defaultValue={[0.0, 4.0]}
            className="max-w-md"
            label=" " // Keep the label for the slider
            onChange={setCapacityRange}
          />
        </Card>

        {/* Filter card for storage type */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Storage Type</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedStorageTypes}>
            <Checkbox value="ssd">SSD</Checkbox>
            <Checkbox value="hdd">HDD</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for storage form factors */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Form Factor</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedFormFactors}>
            <Checkbox value='2.5"'>2.5"</Checkbox>
            <Checkbox value='3.5"'>3.5"</Checkbox>
            <Checkbox value='m.2-2280'>M.2-2280</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for storage interface */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Interface</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedInterfaces}>
            <Checkbox value='PCIe 5.0 X4'>PCIe 5.0 X4"</Checkbox>
            {/*<Checkbox value='PCIe5x2'>PCIe 5.0 X2"</Checkbox>*/}
            <Checkbox value='PCIe 4.0 X4'>PCIe 4.0 X4"</Checkbox>
            {/*<Checkbox value='PCIe4x2'>PCIe 4.0 X2"</Checkbox>*/}
            <Checkbox value='SATA 6.0 GB/s'>SATA 6.0 GB/s</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for price range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Price ($)</h2>
          <Slider
            step={10}
            minValue={0}
            maxValue={300}
            defaultValue={[0, 300]}
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
        >
          <TableHeader className="bg-[#488A99] text-[#DBAE58] rounded">
            <TableColumn>Name</TableColumn>
            <TableColumn>Capacity</TableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Form Factor</TableColumn>
            <TableColumn>Interface</TableColumn>
            {/*<TableColumn>Price per GB</TableColumn>*/}
            <TableColumn>Price</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody>
            {filteredComponents.map((storage) => (
              <TableRow key={storage.storageId}>
                <TableCell>
                  {storage.name}
                  <Image src={storage.image}
                    width="70"
                    height="70"
                    alt="storage" />
                </TableCell>
                <TableCell>{storage.capacity + ` TB`}</TableCell>
                <TableCell>{storage.storageType}</TableCell>
                <TableCell>{storage.formFactor}</TableCell>
                <TableCell>{storage.interface}</TableCell>
                {/*<TableCell>{`$` + storage.pricePerGig}</TableCell>*/}
                <TableCell>{`$` + storage.price}</TableCell>
                <TableCell>
                  <Link href="/workshop">
                    <button
                      className="bg-[#DBAE58] text-black px-4 py-2 rounded transition-transform transform active:scale-95"
                      onClick={() => { updateSelectedStorage(storage); }}>Add to Build
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