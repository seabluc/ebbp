"use client";

import {
  Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Card,
  CheckboxGroup, Checkbox, Slider, Spinner
} from "@nextui-org/react";
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { fetchComponents } from '@/utils/fetchUtils';
import { useSharedData } from "@/context/SharedDataContext";

export default function App() {
  // Scroll to the top when the page is first loaded or refreshed
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle query params for Load More button 
  const router = useRouter();

  // CPU States
  const [components, setComponents] = useState([]);
  const [error, setError] = useState(null);
  const { updateSelectedCPU } = useSharedData();

  // Pagination state
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Filter states
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [selectedSockets, setSelectedSockets] = useState([]);
  const [coreCountRange, setCoreCountRange] = useState([0, 24]);
  {/*const [threadCountRange, setThreadCountRange] = useState([0, 48]);*/ }
  const [clockSpeedRange, setClockSpeedRange] = useState([0.0, 5.0]);
  const [boostClockSpeedRange, setBoostClockSpeedRange] = useState([0.0, 6.0]);
  const [selectedMicroarchitectures, setSelectedMicroarchitectures] = useState([]);
  const [tdpRange, setTdpRange] = useState([0, 200]);
  const [selectedGraphics, setSelectedGraphics] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 700]);

  // Ref to track the initial fetch
  const isInitialFetch = useRef(true);

  // Fetch components function
  const fetchCPUs = async (newOffset = 0) => {
    setIsLoadingMore(true);
    try {
      const url = `/api/cpus?limit=${limit}&offset=${newOffset}`;
      await fetchComponents(url, (newComponents) => {
        if (newComponents.length < limit) setHasMore(false);
        setComponents((prev) => (newOffset === 0 ? newComponents : [...prev, ...newComponents]));
      }, setError);
    } catch (err) {
      console.error("Error fetching CPUs:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchCPUs(0);
    isInitialFetch.current = false;
  }, []);

  // Function to apply filters
  const applyFilters = () => {
    const filtered = components.filter((cpu) => {
      return (
        (selectedManufacturers.length === 0 || selectedManufacturers.includes(cpu.manufacturer.toLowerCase())) &&
        (selectedSockets.length === 0 || selectedSockets.includes(cpu.socket.toLowerCase())) &&
        cpu.coreCount >= coreCountRange[0] && cpu.coreCount <= coreCountRange[1] &&
        /*cpu.threadCount >= threadCountRange[0] && cpu.threadCount <= threadCountRange[1] && */
        cpu.performanceCoreClock >= clockSpeedRange[0] && cpu.performanceCoreClock <= clockSpeedRange[1] &&
        cpu.performanceCoreBoostClock >= boostClockSpeedRange[0] && cpu.performanceCoreBoostClock <= boostClockSpeedRange[1] &&
        (selectedMicroarchitectures.length === 0 || selectedMicroarchitectures.includes(cpu.microarchitecture.toLowerCase())) &&
        cpu.tdp >= tdpRange[0] && cpu.tdp <= tdpRange[1] &&
        (selectedGraphics.length === 0 || selectedGraphics.includes(cpu.integrated.toLowerCase())) &&
        cpu.price >= priceRange[0] && cpu.price <= priceRange[1]
      );
    });
    setFilteredComponents(filtered);
  };

  // Apply filters whenever filter states change
  useEffect(() => {
    if (!isInitialFetch.current) applyFilters();
  }, [selectedManufacturers, selectedSockets, coreCountRange, clockSpeedRange,
    boostClockSpeedRange, selectedMicroarchitectures, tdpRange, selectedGraphics, priceRange]);

  // Update offset state to fetch more data when "Load More" button is clicked
  const handleLoadMore = async () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    await fetchCPUs(newOffset);
  };

  // Apply filters whenever the filter values change
  useEffect(() => {
    const filterComponents = () => {
      const filtered = components.filter((cpu) => {
        // Apply all filters based on selected criteria
        return (
          (selectedManufacturers.length === 0 || selectedManufacturers.includes(cpu.manufacturer.toLowerCase())) &&
          (selectedSockets.length === 0 || selectedSockets.includes(cpu.socket.toLowerCase())) &&
          cpu.coreCount >= coreCountRange[0] && cpu.coreCount <= coreCountRange[1] &&
          /*cpu.threadCount >= threadCountRange[0] && cpu.threadCount <= threadCountRange[1] && */
          cpu.performanceCoreClock >= clockSpeedRange[0] && cpu.performanceCoreClock <= clockSpeedRange[1] &&
          cpu.performanceCoreBoostClock >= boostClockSpeedRange[0] && cpu.performanceCoreBoostClock <= boostClockSpeedRange[1] &&
          (selectedMicroarchitectures.length === 0 || selectedMicroarchitectures.includes(cpu.microarchitecture.toLowerCase())) &&
          cpu.tdp >= tdpRange[0] && cpu.tdp <= tdpRange[1] &&
          (selectedGraphics.length === 0 || selectedGraphics.includes(cpu.integrated.toLowerCase())) &&
          cpu.price >= priceRange[0] && cpu.price <= priceRange[1]
        );
      });
      setFilteredComponents(filtered);
    };

    filterComponents();
  }, [components, selectedManufacturers, selectedSockets, coreCountRange, /*threadCountRange*/,
    clockSpeedRange, boostClockSpeedRange, selectedMicroarchitectures, tdpRange, selectedGraphics, priceRange]);

  return (
    <div className="min-h-screen bg-[#4D585B] flex gap-4 p-4"> {/* Main background color */}
      <div className="flex flex-col gap-3 w-1/5 mt-4"> {/* Container for filter cards */}

        {/* Filter card for brands (moved to the first position) */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Manufacturer</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedManufacturers}>
            <Checkbox value="amd">AMD</Checkbox>
            <Checkbox value="intel">Intel</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Filter card for sockets */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Socket</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedSockets}> {/* label="Select processors" defaultValue={[]}*/}
            <Checkbox value="lga1851">LGA1851</Checkbox>
            <Checkbox value="lga1700">LGA1700</Checkbox>
            <Checkbox value="am5">AM5</Checkbox>
            <Checkbox value="am4">AM4</Checkbox>
          </CheckboxGroup>
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
            onChange={setTdpRange}
          />
        </Card>

        {/* Filter card for microarchitecture */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Microarchitecture</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedMicroarchitectures}>
            <Checkbox value="arrow lake">Arrow Lake</Checkbox>
            <Checkbox value="raptor lake refresh">Raptor Lake Refresh</Checkbox>
            <Checkbox value="raptor lake">Raptor Lake</Checkbox>
            <Checkbox value="alder lake">Alder Lake</Checkbox>
            <Checkbox value="zen 5">Zen 5</Checkbox>
            <Checkbox value="zen 4">Zen 4</Checkbox>
            <Checkbox value="zen 3">Zen 3</Checkbox>
            <Checkbox value="zen 2">Zen 2</Checkbox>
            <Checkbox value="zen+">Zen+</Checkbox>
            <Checkbox value="zen">Zen</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for performance */}
        {/*
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Performance</h2>
          <CheckboxGroup className="my-2">
            <Checkbox value="high-end">High-end</Checkbox>
            <Checkbox value="mid-range">Mid-range</Checkbox>
            <Checkbox value="low-end">Low-end</Checkbox>
          </CheckboxGroup>
        </Card>
        */}

        {/* Filter card for integrated graphics */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Integrated Graphics</h2>
          <CheckboxGroup className="my-2" onChange={setSelectedGraphics}> {/*label="Select integrated graphics" defaultValue={[]}*/}
            <Checkbox value="intel xe">Intel Xe</Checkbox>
            <Checkbox value="intel uhd graphics 770">Intel UHD 770</Checkbox>
            <Checkbox value="intel uhd graphics 730">Intel UHD 730</Checkbox>
            <Checkbox value="radeon">Radeon</Checkbox>
            <Checkbox value="radeon 780m">Radeon 780M</Checkbox>
            <Checkbox value="radeon 760m">Radeon 760M</Checkbox>
            <Checkbox value="radeon 740m">Radeon 764M</Checkbox>
            <Checkbox value="radeon vega 11">Radeon Vega 11</Checkbox>
            <Checkbox value="radeon vega 8">Radeon Vega 8</Checkbox>
            <Checkbox value="radeon vega 7">Radeon Vega 7</Checkbox>
            <Checkbox value="none">None</Checkbox>
          </CheckboxGroup>
        </Card>

        {/* Slider card for core count range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Core Count</h2>
          <Slider
            step={2}
            minValue={0}
            maxValue={24}
            defaultValue={[0, 24]}
            className="max-w-md"
            label=" "
            onChange={setCoreCountRange}
          />
        </Card>

        {/* Slider card for thread count range */}
        {/*
        <Card className="bg-gray-500 p-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Thread Count</h2>
          <Slider
            step={2}
            minValue={0}
            maxValue={48}
            defaultValue={[0, 48]}
            className="max-w-md"
            label=" "
            onChange={setThreadCountRange}
          />
        </Card>
        */}

        {/* Slider card for core clock range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Performance Core Clock (GHz)</h2>
          <Slider
            step={0.1}
            minValue={0}
            maxValue={5.0}
            defaultValue={[0.0, 5.0]}
            className="max-w-md"
            label=" "
            onChange={setClockSpeedRange}
          />
        </Card>

        {/* Slider card for performance core boost clock range */}
        <Card className="bg-gray-500 py-2 px-4 rounded border-2 border-[#DBAE58]">
          <h2 className="text-[#DBAE58]">Performance Core Boost Clock (GHz)</h2>
          <Slider
            step={0.1}
            minValue={0}
            maxValue={6.0}
            defaultValue={[0.0, 6.0]}
            className="max-w-md"
            label=" "
            onChange={setBoostClockSpeedRange}
          />
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
          aria-label="CPU Information Table"
          className="border-collapse w-full text-[#4D585B] rounded pr-4" // Full width for the table with right padding
          isStriped
          bottomContent={
            hasMore && (
              <button
                className="bg-[#DBAE58] text-black self-center mt-1 px-6 py-2 rounded transition-transform transform active:scale-95 max-h-screen"
                onClick={handleLoadMore}
                disabled={isLoadingMore}>
                {isLoadingMore ? (<Spinner color="default" size="sm" />) : ("Load More")}
              </button>
            )}
          classNames={{
            base: "max-h-screen",
            // table: "min-h-screen",
          }}>
          <TableHeader className="bg-[#488A99] text-[#DBAE58] rounded">
            <TableColumn>Name</TableColumn>
            <TableColumn>Socket</TableColumn>
            <TableColumn>TDP</TableColumn>
            <TableColumn>Microarchitecture</TableColumn>
            <TableColumn>Integrated Graphics</TableColumn>
            <TableColumn>Core Count</TableColumn>
            {/*<TableColumn>Thread Count</TableColumn>*/}
            <TableColumn>P-Core Clock</TableColumn>
            <TableColumn>P-Core Boost Clock</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody className="flex-none">
            {filteredComponents.map((cpu) => (
              <TableRow key={cpu.cpuId} className="h-[80px]">
                <TableCell className="align-top">
                  {cpu.name}
                  <Image src={cpu.image}
                    width="70"
                    height="70"
                    alt="cpu" />
                </TableCell>
                <TableCell className="align-top">{cpu.socket}</TableCell>
                <TableCell className="align-top" >{cpu.tdp + `W`}</TableCell>
                <TableCell className="align-top">{cpu.microarchitecture}</TableCell>
                <TableCell className="align-top">{cpu.integrated}</TableCell>
                <TableCell className="align-top">{cpu.coreCount}</TableCell>
                {/*<TableCell className="align-top">{cpu.threadCount}</TableCell>*/}
                <TableCell className="align-top">{cpu.performanceCoreClock + ` GHz`}</TableCell>
                <TableCell className="align-top">{cpu.performanceCoreBoostClock + ` GHz`}</TableCell>
                <TableCell className="align-top">{`$` + cpu.price}</TableCell>
                <TableCell className="align-top">
                  <Link href="/workshop">
                    <button
                      className="bg-[#DBAE58] text-black px-4 py-2 rounded transition-transform transform active:scale-95"
                      onClick={() => { updateSelectedCPU(cpu); }}>Add to Build
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