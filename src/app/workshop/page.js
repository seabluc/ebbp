'use client';
import { useState } from "react";
import {
  Button, Table, TableHeader, TableColumn, TableBody,
  TableRow, TableCell, Tooltip
} from "@nextui-org/react";
import SaveIcon from '../../../public/save.svg';
import TrashIcon from '../../../public/trash.svg';
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

// cannot export generateMetadata in client component
// export function generateMetadata() {
//   return {
//     title: 'Workshop - Build your PC',
//   };
// }

export default function Workshop() {
  const { selectedCPU, clearSelectedCPU, selectedMotherboard, clearSelectedMotherboard,
    selectedMemory, clearSelectedMemory, selectedStorage, clearSelectedStorage,
    selectedVideoCard, clearSelectedVideoCard, selectedCPUCooler,
    clearSelectedCPUCooler, selectedPowerSupply, clearSelectedPowerSupply,
    compatibilityStatus, buildName, setBuildName, clearBuild } = useSharedData();

  // Clear Icon handler
  const handleClearBuild = () => {
    clearBuild();
  }

  // Compatibility Status background color
  let backgroundColor;
  if (compatibilityStatus === 'Bad') {
    backgroundColor = 'bg-red-600';
  } else if (compatibilityStatus === 'Good' || compatibilityStatus === 'Issue') {
    backgroundColor = 'bg-green-500';
  } else if (compatibilityStatus === 'None') {
    backgroundColor = 'bg-default-400';
  }

  // Firebase
  const { user } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleBuildNameChange = (e) => {
    setBuildName(e.target.value);
  };

  // Function to handle saving the build
  const handleSaveBuild = async () => {
    // Redirect to login page if user is not logged in
    if (!user) {
      const userConfirmed = confirm("Please log in to save current PC build");
      if (userConfirmed) {
        router.push('/account/login')
      }
    }
    if (user && !buildName) {
      setMessage({ text: 'Please enter a name for your build before saving.', type: 'error' });
      // Clear the message after a few seconds
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
      return;
    }
    if (user && (!selectedCPU && !selectedMotherboard && !selectedVideoCard && !selectedCPUCooler
      && !selectedPowerSupply && selectedMemory.length === 0 && selectedStorage.length === 0)) {
      setMessage({ text: 'Please choose a PC part for your build before saving.', type: 'error' });
      // Clear the message after a few seconds
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
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

  // Table row for CPU
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

  // Table row for Motherboard
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
            content={`Socket: ${selectedMotherboard.socket}\nMemory Type: ${selectedMotherboard.memoryType}\nMax Memory Capacity: ${selectedMotherboard.memoryMax} GB\nMemory Slots: ${selectedMotherboard.memorySlot}\nM.2 Slots: ${selectedMotherboard.mTwoSlot}\nSATA Slots: ${selectedMotherboard.sataSlot}`}>
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

  // Table row for Memory modules (RAM)
  const memoryRows = () => {
    // When no memory component is selected
    if (selectedMemory.length === 0) {
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

  // Table row for Storage devices (HDD, SSD, M.2 SSD NVMe)
  const storageRows = () => {
    // When no storage component is selected
    if (selectedStorage.length === 0) {
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
              content={`Storage Type: ${storageItem.storageType}\nInterface: ${storageItem.interface}\nCapacity: ${storageItem.capacity} GB`}>
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
          {/* Conditionally render "Add Additional Storage" button only once at the end */}
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

  // Table row for Video Card
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

  // Table row for CPU Cooler (Air & AIO)
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
            content={`Fan Speed: ${selectedCPUCooler.fanRPM}\nNoise Level: ${selectedCPUCooler.noiseLevel} dB`}>
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

  // Table row for Power Supply Unit
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
          {/* Flex-col for Title/header & Compatibility Checker */}
          <h1 className="flex justify-center text-4xl font-bold my-4 text-[#DBAE58]">
            PC Workshop
          </h1>
          <div className="flex-col overflow-hidden w-2/5 bg-slate-100 rounded-lg">
            {/* Save builds & Compatibility checker */}
            <div className="flex rounded-t-lg items-center">
              <div className="flex flex-grow items-center">
                <input
                  type="text"
                  value={buildName}
                  onChange={handleBuildNameChange}
                  placeholder="Enter Build Name"
                  className="ml-4 pr-4 m-2 p-2 border rounded-lg w-full text-center bg-default-300" />
              </div>
              <div className="flex justify-evenly w-auto">
                <Tooltip content={"Save all PC parts into your named build"} offset={3} className="bg-opacity-85">
                  <button
                    onClick={handleSaveBuild}
                    className="bg-default-300 font-semibold text-sm pl-3 p-2 m-2 rounded-lg transition-all duration-200 hover:outline-2 hover:bg-green-500 focus:ring-2">
                    <div className="flex justify-center items-center gap-x-1">Save
                      <Image src={SaveIcon} alt="save" /></div>
                  </button>
                </Tooltip>
                <Tooltip content={"Deselect all PC parts in current build"} offset={3} className="bg-opacity-85">
                  <button
                    onClick={handleClearBuild}
                    className="bg-default-300 font-semibold text-sm pl-3 p-2 m-2 rounded-lg transition-all duration-200 hover:outline-2 hover:bg-red-600 focus:ring-2">
                    <div className="flex justify-center items-center gap-x-0.5">Clear
                      <Image src={TrashIcon} alt="trash" /></div>
                  </button>
                </Tooltip>
                <Tooltip content={"Total price of current build"} offset={3} className="bg-opacity-85">
                  <button disabled className="bg-default-300 font-semibold text-sm p-2 m-2 mr-4 rounded-lg transition-all duration-200 hover:outline-2">
                    <div className="flex justify-center items-center"><Price /></div>
                  </button>
                </Tooltip>
              </div>
            </div>
            {message.text && (
              <div className={`text-center mb-4 ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                {message.text}
              </div>
            )}
            {<div className={`flex w-auto rounded-b-lg ${backgroundColor}`}>
              <Compatibility /><Wattage />
            </div>}
          </div>
        </div>

        {/* Flex-row for PC Part Table */}
        <div className="flex flex-row items-stretch justify-center py-4 gap-4">
          {/* Table for Selected Components */}
          <div className="flex w-1/2 flex-col gap-3 ml-4 mt-8">
            <Table aria-label="Selected PC Part Table" isStriped
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
        </div>
      </div>
    </div >
  );
}