'use client';
import { useState, useReducer, useEffect } from "react";
import {
  Tabs, Tab, Card, CardBody, Table, TableHeader, TableColumn, TableBody,
  TableRow, TableCell, Button, RadioGroup, Radio, Tooltip /*Image*/
} from "@nextui-org/react";
import MoboDiagram from "../../../public/mobo-diagram-2-mem-slots.png";
import RedX from "../../../public/x.svg";
import Image from 'next/image';
import Link from 'next/link';
import { useSharedData } from '../../context/SharedDataContext';
import Compatibility from '@/components/Compatibility';
import Wattage from '@/components/Wattage';
import Price from '@/components/Price';
import { useAuth } from '@/lib/firebase/authContext';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { fbdb } from '@/lib/firebase/config';

const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

export default function Home() {
  const [selectedBuild, setSelectedBuild] = useState("build1"); // For Tab Builds #1-10
  const { selectedCPU, clearSelectedCPU, selectedMotherboard, clearSelectedMotherboard,
    selectedMemory, clearSelectedMemory, selectedStorage, clearSelectedStorage,
    selectedVideoCard, clearSelectedVideoCard, selectedCPUCooler,
    clearSelectedCPUCooler, selectedPowerSupply, clearSelectedPowerSupply,
    compatibilityStatus, buildName, setBuildName /*savedBuild, setSavedBuild,*/ } = useSharedData();

  const [selectedColor, setSelectedColor] = useState("default"); // Table
  // Firebase
  const { user } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleBuildNameChange = (e) => {
    setBuildName(e.target.value);
  };

  let backgroundColor;
  if (compatibilityStatus === 'Bad') {
    backgroundColor = 'bg-red-600';
  } else if (compatibilityStatus === 'Good' || compatibilityStatus === 'Issue') {
    backgroundColor = 'bg-green-500';
  } else if (compatibilityStatus === 'None') {
    backgroundColor = 'bg-default-400';
  }
  // Function to handle saving the build
  const handleSaveBuild = async () => {
    if (!user) {
      router.push('/account/login'); // Redirect to login page if user is not logged in
      return;
    }

    if (!buildName) {
      setMessage({ text: 'Please enter a name for your build before saving.', type: 'error' });
      return;
    }

    try {
      const buildData = {
        name: buildName,
        cpu: selectedCPU,
        motherboard: selectedMotherboard,
        memory: selectedMemory,
        storage: selectedStorage,
        videoCard: selectedVideoCard,
        cpuCooler: selectedCPUCooler,
        powerSupply: selectedPowerSupply,
        timestamp: new Date().toISOString()
      };
      await setDoc(doc(fbdb, 'users', user.uid, 'builds', buildName), buildData);
      setMessage({ text: 'Build saved successfully!', type: 'success' });
      // Clear the message after a few seconds
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    } catch (error) {
      console.error('Error saving build:', error);
      setMessage({ text: 'Failed to save the build. Please try again.', type: 'error' });
    }
  };

  const cpuRows = () => {
    return selectedCPU ? (
      <TableRow key="1" /*className="border-2"*/ >
        <TableCell>
          <span className="flex flex-row">
            <Link href="products/cpu">
              <u className="text-blue-600">CPU</u>
            </Link>
          </span>
        </TableCell>
        <TableCell className="flex flex-row items-center">
          <Tooltip className="whitespace-pre bg-opacity-90"
            content={`Socket: ${selectedCPU.socket}\nMax Memory Capacity: ${selectedCPU.memoryMax} GB`}>
            <Image
              width={60}
              height={60}
              src={selectedCPU.image}
              alt="CPU">
            </Image>
          </Tooltip>
          <span className="flex items-center ml-2">
            {selectedCPU.name}
            <button onClick={clearSelectedCPU}
              className="items-end hover:opacity-50 ml-1">
              <Image width={24} height={24} src={RedX} alt='❌' />
            </button>
          </span>

        </TableCell>
        <TableCell className="px-12">{`$${selectedCPU?.price}`}</TableCell>
      </TableRow>
    ) : (
      <TableRow key="1">
        <TableCell>
          <Link href="products/cpu">
            <u className="text-blue-600">CPU</u>
          </Link>
        </TableCell>
        <TableCell>
          <Link href="products/cpu">
            <Button className="bg-[#DBAE58] hover:bg-opacity-hover">
              Choose A CPU
            </Button>
          </Link>
        </TableCell>
        <TableCell className="px-12">{selectedCPU?.price || '--'}</TableCell>
      </TableRow>
    );
  };

  const moboRows = () => {
    return selectedMotherboard ? (
      <TableRow key="2">
        <TableCell className="">
          <span className="flex flex-row">
            <Link href="products/motherboard">
              <u className="text-blue-600">Motherboard</u>
            </Link>
          </span>
        </TableCell>
        <TableCell className="flex flex-row items-center">
          <Tooltip className="whitespace-pre bg-opacity-90" offset={0}
            content={`Socket: ${selectedMotherboard.socket}\nMemory Type: ${selectedMotherboard.memoryType}\nMax Memory Capacity: ${selectedMotherboard.memoryMax} GB\nMemory Slots: ${selectedMotherboard.memorySlot}\nSupported Memory Speeds: ${selectedMotherboard.supportedSpeeds.join(', ')}\nM.2 Slots: ${selectedMotherboard.mTwoSlot}\nSATA Slots: ${selectedMotherboard.sataSlot}`}>
            <Image
              width={70}
              height={70}
              src={selectedMotherboard.image}
              alt="Motherboard">
            </Image>
          </Tooltip>
          <span className="flex items-center ml-0">
            {selectedMotherboard.name}
            <button onClick={clearSelectedMotherboard}
              className="items-end hover:opacity-50 ml-1">
              <Image width={24} height={24} src={RedX} alt='❌' />
            </button>
          </span>
        </TableCell>
        <TableCell className="px-12">{`$${selectedMotherboard.price}`}</TableCell>
      </TableRow>
    ) : (
      <TableRow key="2">
        <TableCell>
          <Link href="products/motherboard">
            <u className="text-blue-600">Motherboard</u>
          </Link>
        </TableCell>
        <TableCell>
          <Link href="products/motherboard">
            <Button className="bg-[#DBAE58] hover:bg-opacity-hover">
              Choose A Motherboard
            </Button>
          </Link>
        </TableCell>
        <TableCell className="px-12">{selectedMotherboard?.price || '--'}</TableCell>
      </TableRow>
    );
  };

  const memoryRows = () => {
    // When no memory component is selected
    if (!selectedMemory || selectedMemory.length === 0) {
      return (
        <TableRow key="no-memory">
          <TableCell>
            <Link href="products/memory">
              <u className="text-blue-600">Memory</u>
            </Link>
          </TableCell>
          <TableCell>
            <Link href="products/memory">
              <Button className="bg-[#DBAE58] hover:bg-opacity-hover">
                Choose Memory
              </Button>
            </Link>
          </TableCell>
          <TableCell className="px-12">--</TableCell>
        </TableRow>
      );
    }

    return selectedMemory.map((memoryItem, index) => (
      <TableRow key={memoryItem.instanceId}>
        <TableCell>
          <Link href="products/memory">
            <u className="text-blue-600">Memory</u>
          </Link>
        </TableCell>
        <TableCell className="flex flex-col">
          <div className="flex flex-row items-center">
            <Tooltip className="whitespace-pre bg-opacity-90"
              content={`Memory Type: ${memoryItem.memoryType}\nCapacity: ${memoryItem.capacity} GB\nModule Count: ${memoryItem.modules}`}>
              <Image width={60} height={60} src={memoryItem.image} alt="Memory" />
            </Tooltip>
            <span className="flex items-center ml-2">
              {memoryItem.name}
              <button
                onClick={() => clearSelectedMemory(memoryItem)}
                className="items-end hover:opacity-50 ml-1">
                <Image width={24} height={24} src={RedX} alt="❌" />
              </button>
            </span>
          </div>
          {/* Conditionally render "Add Additional Memory" button only once at the end */}
          {index === selectedMemory.length - 1 && (
            <div className="mt-2">
              <Link href="products/memory">
                <Button className="bg-[#DBAE58] hover:bg-opacity-hover">
                  Add Additional Memory
                </Button>
              </Link>
            </div>
          )}
        </TableCell>
        <TableCell className="px-12">{`$${memoryItem.price}`}</TableCell>
      </TableRow>
    ));
  };

  const storageRows = () => {
    // When no memory component is selected
    if (!selectedStorage || selectedStorage.length === 0) {
      return (
        <TableRow key="no-storage">
          <TableCell>
            <Link href="products/storage">
              <u className="text-blue-600">Storage</u>
            </Link>
          </TableCell>
          <TableCell>
            <Link href="products/storage">
              <Button className="bg-[#DBAE58] hover:bg-opacity-hover">
                Choose Storage
              </Button>
            </Link>
          </TableCell>
          <TableCell className="px-12">--</TableCell>
        </TableRow>
      );
    }

    return selectedStorage.map((storageItem, index) => (
      <TableRow key={storageItem.instanceId}>
        <TableCell>
          <Link href="products/storage">
            <u className="text-blue-600">Storage</u>
          </Link>
        </TableCell>
        <TableCell className="flex flex-col">
          <div className="flex flex-row items-center">
            <Tooltip className="whitespace-pre bg-opacity-90"
              content={`Storage Type: ${storageItem.storageType}\nInterface: ${storageItem.interface}\nCapacity: ${storageItem.capacity} TB`}>
              <Image width={60} height={60} src={storageItem.image} alt="Storage" />
            </Tooltip>
            <span className="flex items-center ml-2">
              {storageItem.name}
              <button
                onClick={() => clearSelectedStorage(storageItem)}
                className="items-end hover:opacity-50 ml-1">
                <Image width={24} height={24} src={RedX} alt="❌" />
              </button>
            </span>
          </div>
          {/* Conditionally render "Add Additional Memory" button only once at the end */}
          {index === selectedStorage.length - 1 && (
            <div className="mt-2">
              <Link href="products/storage">
                <Button className="bg-[#DBAE58] hover:bg-opacity-hover">
                  Add Additional Storage
                </Button>
              </Link>
            </div>
          )}
        </TableCell>
        <TableCell className=" px-12">{`$${storageItem.price}`}</TableCell>
      </TableRow>
    ));
  };

  const gpuRows = () => {
    return selectedVideoCard ? (
      <TableRow key="5">
        <TableCell className="">
          <span className="flex flex-row">
            <Link href="products/video-card">
              <u className="text-blue-600">Video Card</u>
            </Link>
          </span>
        </TableCell>
        <TableCell className="flex flex-row items-center">
          <Tooltip className="whitespace-pre bg-opacity-90"
            content={`Graphics Memory Type: ${selectedVideoCard.memoryType}\nVideo Memory: ${selectedVideoCard.memory} GB`}>
            <Image
              width={80}
              height={80}
              src={selectedVideoCard.image}
              alt="VideoCard">
            </Image>
          </Tooltip>
          <span className="flex items-center ml-2">
            {selectedVideoCard.name}
            <button onClick={clearSelectedVideoCard}
              className="items-end hover:opacity-50 ml-1">
              <Image width={24} height={24} src={RedX} alt='❌' />
            </button>
          </span>
        </TableCell>
        <TableCell className="px-12">{`$${selectedVideoCard.price}`}</TableCell>
      </TableRow>
    ) : (
      <TableRow key="5">
        <TableCell>
          <Link href="products/video-card">
            <u className="text-blue-600">Video Card</u>
          </Link>
        </TableCell>
        <TableCell>
          <Link href="products/video-card">
            <Button className="bg-[#DBAE58] hover:bg-opacity-hover">
              Choose A Video Card
            </Button>
          </Link>
        </TableCell>
        <TableCell className="px-12">{selectedVideoCard?.price || '--'}</TableCell>
      </TableRow>
    );
  };

  const cpuCoolerRows = () => {
    return selectedCPUCooler ? (
      <TableRow key="6">
        <TableCell className="">
          <span className="flex flex-row">
            <Link href="products/cpu-cooler">
              <u className="text-blue-600">CPU Cooler</u>
            </Link>
          </span>
        </TableCell>
        <TableCell className="flex flex-row items-center">
          <Tooltip className="whitespace-pre bg-opacity-90"
            content={`Compatible Sockets: ${selectedCPUCooler.supportedSockets.join(', ')}\nFan Speed: ${selectedCPUCooler.fanRPM}\nNoise Level: ${selectedCPUCooler.noiseLevel} dB`}>
            <Image
              width={70}
              height={70}
              src={selectedCPUCooler.image}
              alt="CPUCooler">
            </Image>
          </Tooltip>
          <span className="flex items-center ml-2">
            {selectedCPUCooler.name}
            <button onClick={clearSelectedCPUCooler}
              className="items-end hover:opacity-50 ml-1">
              <Image width={24} height={24} src={RedX} alt='❌' />
            </button>
          </span>
        </TableCell>
        <TableCell className="px-12">{`$${selectedCPUCooler?.price}`}</TableCell>
      </TableRow>
    ) : (
      <TableRow key="6">
        <TableCell>
          <Link href="products/cpu-cooler">
            <u className="text-blue-600">CPU Cooler</u>
          </Link>
        </TableCell>
        <TableCell>
          <Link href="products/cpu-cooler">
            <Button className="bg-[#DBAE58] hover:bg-opacity-hover">
              Choose A CPU Cooler
            </Button>
          </Link>
        </TableCell>
        <TableCell className="px-12">--</TableCell>
      </TableRow>
    );
  };

  const psuRows = () => {
    return selectedPowerSupply ? (
      <TableRow key="7">
        <TableCell className="">
          <span className="flex flex-row">
            <Link href="products/power-supply">
              <u className="text-blue-600">Power Supply</u>
            </Link>
          </span>
        </TableCell>
        <TableCell className="flex flex-row items-center">
          <Tooltip className="whitespace-pre bg-opacity-90"
            content={`Wattage: ${selectedPowerSupply.wattage} W\nEfficiency: ${selectedPowerSupply.efficiency}\nModularity: ${selectedPowerSupply.modularity}`}>
            <Image
              width={70}
              height={70}
              src={selectedPowerSupply.image}
              alt="PowerSupply">
            </Image>
          </Tooltip>
          <span className="flex items-center ml-2">
            {selectedPowerSupply.name}
            <button onClick={clearSelectedPowerSupply}
              className="items-end hover:opacity-50 ml-1">
              <Image width={24} height={24} src={RedX} alt='❌' />
            </button>
          </span>
        </TableCell>
        <TableCell className="px-12">{`$${selectedPowerSupply.price}`}</TableCell>
      </TableRow>
    ) : (
      <TableRow key="7">
        <TableCell>
          <Link href="products/power-supply">
            <u className="text-blue-600">Power Supply</u>
          </Link>
        </TableCell>
        <TableCell>
          <Link href="products/power-supply">
            <Button className="bg-[#DBAE58] hover:bg-opacity-hover">
              Choose A Power Supply
            </Button>
          </Link>
        </TableCell>
        <TableCell className="px-12">--</TableCell>
      </TableRow>
    );
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#4D585B] py-4 px-8 items-center text-workshopTextColor"> {/* Background: Charcoal */}
      <div className="w-full">
        <div className="flex flex-col w-auto justify-center items-center">
          {/* Flex-col for Title/header, Build Tabs & Compatibility Checker */}
          <h1 className="flex justify-center text-4xl font-bold my-8 mb-4 text-[#DBAE58]">
            PC Workshop
          </h1>
          <div className="flex flex-col items-center mb-4">
            <input
              type="text"
              value={buildName}
              onChange={handleBuildNameChange}
              placeholder="Enter Build Name"
              className="p-2 border rounded-lg mb-2 w-64 text-center" />
            <button
              onClick={handleSaveBuild}
              className="bg-green-500 text-white px-4 py-2 rounded-lg w-48 transition-all duration-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
              Save Build
            </button>
          </div>
          {message.text && (
            <div className={`text-center mb-4 ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
              {message.text}
            </div>
          )}
          <div className="flex-col bg-slate-100 rounded-lg">
            {/* Horizontal Tabs for Builds, Centered without Gold Borders */}
            <Tabs
              aria-label="Build Options"
              selectedKey={selectedBuild}
              onSelectionChange={setSelectedBuild}
              isVertical={false} // Ensures the tabs remain horizontal
              className="flex justify-evenly rounded-lg bg-rgb(229, 231, 235)">
              <Tab key="build1" title="Build 1" />
              <Tab key="build2" title="Build 2" />
              <Tab key="build3" title="Build 3" />
              <Tab key="build4" title="Build 4" />
              <Tab key="build5" title="Build 5" />
              <Tab key="build6" title="Build 6" />
              <Tab key="build7" title="Build 7" />
              <Tab key="build8" title="Build 8" />
              <Tab key="build9" title="Build 9" />
              <Tab key="build10" title="Build 10" />
            </Tabs>
            {<div className={`flex w-auto rounded-b-lg ${backgroundColor}`}>
              <Compatibility /><Wattage />
            </div>}
          </div>
        </div>

        {/* Flex-row for PC Part Table & Compatibility Audit */}
        <div className="flex flex-row items-stretch justify-center py-4 gap-4">
          {/* Table for Selected Components */}
          <div className="flex w-2/5 flex-col gap-3 ml-4 mt-8">
            <Table color={selectedColor} aria-label="Selected PC Part Table"
              className="">
              <TableHeader>
                <TableColumn>Component</TableColumn>
                <TableColumn>Name</TableColumn>
                <TableColumn className="px-12">Price</TableColumn>
              </TableHeader>
              <TableBody>
                {cpuRows()}
                {moboRows()}
                {memoryRows()}
                {storageRows()}
                {gpuRows()}
                {cpuCoolerRows()}
                {psuRows()}
              </TableBody>
            </Table>
          </div>
          {/* Mobo diagram */}
          {/*<div className="flex flex-col items-center">
              <Image width={400} height={500} src={MoboDiagram} alt="mobo" />
          </div> */}
          {/*}
          <div className="flex w-1/5 flex-col bg-white rounded-xl mr-4 mt-8">
            <Table aria-label="PC Build Audit">
              <TableHeader>
                <TableColumn className="text-center">PC Build Audit</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Socket:</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Memory:</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>CPU Cooling:</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Slots:</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Video:</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Power Supply:</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          */}
        </div>
      </div>
      <div className="">
            <Price />
          </div>
    </div >
  );
}