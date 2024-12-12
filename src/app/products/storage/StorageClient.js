"use client";

import {
  Card, CheckboxGroup, Checkbox, Slider, Image, Table, TableHeader, TableBody,
  TableColumn, TableRow, TableCell, Pagination
} from "@nextui-org/react";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSharedData } from "@/context/SharedDataContext";

export default function StorageClient({ initialData }) {
  // Contains all PC parts from sibling serverAction.js file
  const components = initialData;
  // Adds PC part to current PC Workshop build
  const { updateSelectedStorage } = useSharedData();

  // Filter states
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [capacityRange, setCapacityRange] = useState([0, 8000]);
  const [selectedStorageTypes, setSelectedStorageTypes] = useState([]);
  const [selectedFormFactors, setSelectedFormFactors] = useState([]);
  const [selectedInterfaces, setSelectedInterfaces] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 628.17]);

  // Filtered components
  const filteredComponents = useMemo(() => {
    return components.filter((storage) => {
      return (
        (selectedManufacturers.length === 0 || selectedManufacturers.includes(storage.manufacturer.toLowerCase())) &&
        storage.capacity >= capacityRange[0] &&
        storage.capacity <= capacityRange[1] &&

        (selectedStorageTypes.length === 0 ||
          (selectedStorageTypes.includes(storage.storageType.toLowerCase())) ||
          (selectedStorageTypes.includes('hdd') && storage.storageType.toLowerCase().includes('rpm')) ||
          (selectedStorageTypes.includes('nvme') && storage.nvme === 1)) &&

        (selectedFormFactors.length === 0 || selectedFormFactors.includes(storage.formFactor.toLowerCase())) &&
        (selectedInterfaces.length === 0 || selectedInterfaces.includes(storage.interface)) &&

        storage.price >= priceRange[0] &&
        storage.price <= priceRange[1]
      );
    });
  }, [components, selectedManufacturers, capacityRange, selectedStorageTypes,
    selectedFormFactors, selectedInterfaces, priceRange,]);

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

        {/* Filter card for Manufacturers */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Manufacturer</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedManufacturers}>
            <Checkbox value="crucial">Crucial</Checkbox>
            <Checkbox value="samsung">Samsung</Checkbox>
            <Checkbox value="seagate">Seagate</Checkbox>
            <Checkbox value="western digital">Western Digital</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for storage capacity */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Storage Capacity (GB)</h2>
          <Slider
            step={100}
            minValue={0}
            maxValue={8000}
            defaultValue={[0, 8000]}
            className="max-w-md"
            label=" " // Keep the label for the slider
            onChange={setCapacityRange}
          />
        </Card>

        {/* Filter card for storage type */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Storage Type</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedStorageTypes}>
            <Checkbox value="nvme">NVME</Checkbox>
            <Checkbox value="ssd">SSD</Checkbox>
            <Checkbox value="hdd">HDD</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for storage form factors */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Form Factor</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedFormFactors}>
            <Checkbox value='2.5'>2.5"</Checkbox>
            <Checkbox value='3.5'>3.5"</Checkbox>
            <Checkbox value='m.2-2280'>M.2-2280</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for storage interface */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Interface</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedInterfaces}>
            <Checkbox value='M.2 PCIe 5.0 X4'>PCIe 5.0 X4"</Checkbox>
            {/*<Checkbox value='PCIe5x2'>PCIe 5.0 X2"</Checkbox>*/}
            <Checkbox value='M.2 PCIe 4.0 X4'>PCIe 4.0 X4"</Checkbox>
            {/*<Checkbox value='PCIe4x2'>PCIe 4.0 X2"</Checkbox>*/}
            <Checkbox value='SATA 6.0 Gb/s'>SATA 6.0 GB/s</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for price range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Price ($)</h2>
          <Slider
            step={10}
            minValue={0}
            maxValue={700}
            defaultValue={[0, 700]}
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
            <TableColumn key="name">Name</TableColumn>
            <TableColumn key="capacity">Capacity</TableColumn>
            <TableColumn key="type">Type</TableColumn>
            <TableColumn key="formFactor">Form Factor</TableColumn>
            <TableColumn key="interface">Interface</TableColumn>
            {/*<TableColumn>Price per GB</TableColumn>*/}
            <TableColumn key="price">Price</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody items={products}>
            {(storage) => (
              <TableRow key={storage.storageId}>
                <TableCell>{storage.name
                  //.replace(`(${storage.partNum})`, "")
                  .replace("Solid State Drive", "")
                  .replace("PCIe 5.0 X4 NVME", "")
                  .replace("PCIe 4.0 X4 NVME", "")
                  .replace("Internal Hard Drive", "")
                  .replace("M.2-2280", "")
                  .replace('2.5"', "")
                  .replace('3.5"', "")
                  .replace("1 TB", "")
                  .replace("2 TB", "")
                  .replace("4 TB", "")
                  .replace("6 TB", "")
                  .replace("8 TB", "")}
                  <Image src={storage.image}
                    width={70}
                    height={70}
                    alt="storage" />
                </TableCell>
                <TableCell>{storage.capacity < 1000 ? storage.capacity + ' GB'
                  : (storage.capacity / 1000) + ' TB'}
                </TableCell>
                <TableCell>{storage.storageType.toLowerCase().includes('rpm') ?
                  'HDD' : storage.storageType}
                </TableCell>
                <TableCell>{storage.nvme === 1 ? storage.formFactor : `${storage.formFactor}"`}</TableCell>
                <TableCell>{storage.nvme === 1 ? 'NVME' : storage.interface}</TableCell>
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
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
