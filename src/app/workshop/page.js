'use client';
import { useState, useReducer, useEffect } from "react";
import { Tabs, Tab, Card, CardBody, /*Image*/ } from "@nextui-org/react";
import MoboDiagram from "../../../public/mobo-diagram-2-mem-slots.png";
import Image from 'next/image';
import Link from 'next/link';
import { useSharedData } from '../../context/SharedDataContext';
import Compatibility from '@/components/Compatibility';
import Wattage from '@/components/Wattage';

export default function Home() {
  const [selectedBuild, setSelectedBuild] = useState("build1"); // For Tab Builds #1-10
  const { selectedCPU, clearSelectedCPU, selectedMotherboard, moboSATASlots, moboMTwoSlots, clearSelectedMotherboard,
    selectedMemory, clearSelectedMemory, selectedStorage, clearSelectedStorage, storageCount,
    selectedVideoCard, clearSelectedVideoCard, selectedCPUCooler, clearSelectedCPUCooler,
    selectedPowerSupply, clearSelectedPowerSupply, compatibilityStatus } = useSharedData();

  let backgroundColor;
  if (compatibilityStatus === 'Bad') {
    backgroundColor = 'bg-red-600';
  } else if (compatibilityStatus === 'Good' || compatibilityStatus === 'Issue') {
    backgroundColor = 'bg-green-500';
  } else if (compatibilityStatus === 'None') {
    backgroundColor = 'bg-default-400';
  }

  const cpuCard = () => {
    return selectedCPU ? (
      <CardBody className="text-base">
        <div className="flex flex-col items-center gap-1">
          <span><b><u>CPU:</u></b> <button className="text-red-600" onClick={clearSelectedCPU}>[X]</button></span>
          <Image
            width={60}
            height={60}
            src={selectedCPU.image}
            alt="CPU">
          </Image>
          <span>{selectedCPU.name} {selectedCPU.socket} {selectedCPU.cpuMemoryMax + ' GB'}
          </span>
        </div>
      </CardBody>
    ) : (
      <CardBody className="text-base">
        <Link href="products/cpu">
          Choose a CPU
        </Link>
      </CardBody>
    );
  };

  const moboCard = () => {
    return selectedMotherboard ? (
      <CardBody className="text-base">
        <div className="flex flex-col items-center gap-1">
          <span><b><u>Mobo:</u></b> <button className="text-red-600" onClick={clearSelectedMotherboard}>[X]</button></span>
          <Image
            width={75}
            height={75}
            src={selectedMotherboard.image}
            alt="Motherboard">
          </Image>
          <span>{selectedMotherboard.name} {selectedMotherboard.socket} {selectedMotherboard.motherboardMemoryType} {selectedMotherboard.motherboardMemoryMax + ' GB'}
          </span>
        </div>
      </CardBody>
    ) : (
      <CardBody className="text-base">
        <Link href="products/motherboard">
          Choose a Motherboard
        </Link>
      </CardBody>
    );
  };

  const memoryCard = () => {
    return selectedMemory ? (
      <CardBody className="text-base">
        <div className="flex flex-col items-center gap-1">
          <span><b><u>Memory:</u></b> <button className="text-red-600" onClick={clearSelectedMemory}>[X]</button></span>
          <Image
            width={60}
            height={60}
            src={selectedMemory.image}
            alt="Memory">
          </Image>
          <span>{selectedMemory.name} {selectedMemory.memoryType}-{selectedMemory.speed + ' MHz '}
            {selectedMemory.capacity + ' GB'} ({selectedMemory.modules})</span>
        </div>
      </CardBody>
    ) : (
      <CardBody className="text-base">
        <Link href="products/memory">
          Choose Memory
        </Link>
      </CardBody>
    );
  };

  const storageCard = () => {
    // Display selected storage and option to add another if slots are available
    return selectedStorage ? (
      <CardBody className="text-base">
        <div className="flex flex-col items-center gap-1">
          <span>
            <b><u>Storage:</u></b>
            <button className="text-red-600" onClick={clearSelectedStorage}>[X]</button>
          </span>
          <Image
            width={70}
            height={70}
            src={selectedStorage.image}
            alt="Storage"
          />
          <span>
            {selectedStorage.name} {selectedStorage.capacity + ' TB'} {selectedStorage.interface}
          </span>

          {/* Prompt to add more storage if SATA or M.2 slots are available */}
          {(moboSATASlots > 0 || moboMTwoSlots > 0) ? (
            <Link href="products/storage" className="text-blue-500">
              Choose Another Storage
            </Link>
          ) : (
            <p className="text-red-600">No more available slots</p>
          )}
        </div>
      </CardBody>
    ) : (
      <CardBody className="text-base">
        <Link href="products/storage">
          Choose Storage
        </Link>
      </CardBody>
    );
  };

  const gpuCard = () => {
    return selectedVideoCard ? (
      <CardBody className="text-base">
        <div className="flex flex-col items-center gap-1">
          <span><b><u>GPU:</u></b> <button className="text-red-600" onClick={clearSelectedVideoCard}>[X]</button></span>
          <Image
            width={80}
            height={80}
            src={selectedVideoCard.image}
            alt="Video Card">
          </Image>
          <span>{selectedVideoCard.name} {selectedVideoCard.videoCardMemoryType} {selectedVideoCard.memory + ' GB '}
            {selectedVideoCard.coreClock + ' MHz '}{/*selectedVideoCard.tdp + ' W'*/}{/*selectedVideoCard.length + ' mm'*/}
          </span>
        </div>
      </CardBody>
    ) : (
      <CardBody className="text-base">
        <Link href="products/video-card">
          Choose a Video Card
        </Link>
      </CardBody>
    );
  };

  const coolerCard = () => {
    return selectedCPUCooler ? (
      <CardBody className="text-base">
        <div className="flex flex-col items-center gap-1">
          <span><b><u>CPU Cooler:</u></b> <button className="text-red-600" onClick={clearSelectedCPUCooler}>[X]</button></span>
          <Image
            width={70}
            height={70}
            src={selectedCPUCooler.image}
            alt="CPU Cooler">
          </Image>
          <span>{selectedCPUCooler.name} {selectedCPUCooler.fanRPM + ' RPM'} {selectedCPUCooler.noiseLevel + ' dB'} {selectedCPUCooler.height || selectedCPUCooler.radiatorSize + " mm"}
          </span>
        </div>
      </CardBody>
    ) : (
      <CardBody className="text-base">
        <Link href="products/cpu-cooler">
          Choose a CPU Cooler
        </Link>
      </CardBody>
    );
  };

  const psuCard = () => {
    return selectedPowerSupply ? (
      <CardBody className="text-base">
        <div className="flex flex-col items-center gap-1">
          <span><b><u>PSU:</u></b> <button className="text-red-600" onClick={clearSelectedPowerSupply}>[X]</button></span>
          <Image
            width={70}
            height={70}
            src={selectedPowerSupply.image}
            alt="Power Supply">
          </Image>
          <span>{selectedPowerSupply.name} {selectedPowerSupply.formFactor} {selectedPowerSupply.efficiency} {selectedPowerSupply.wattage + " W"} {selectedPowerSupply.modularity}
            {/*selectedPowerSupply.length + " mm"*/}
          </span>
        </div>
      </CardBody>
    ) : (
      <CardBody className="text-base">
        <Link href="products/power-supply">
          Choose a Power Supply
        </Link>
      </CardBody>
    )
  }
  return (
    <div className="flex flex-col min-h-screen bg-[#4D585B] py-4 px-8 items-center text-workshopTextColor"> {/* Background: Charcoal */}
      <div className="flex flex-col">
        {/* Flex-col for Title/header & Build Tabs */}
        <h1 className="flex justify-center text-4xl font-bold my-8 mb-4 text-[#DBAE58]">
          PC Workshop
        </h1>
        <h2 className="">{selectedMotherboard?.mTwoSlot || 'n/a'} {moboMTwoSlots} {selectedMotherboard?.sataSlot || 'n/a'} {moboSATASlots}</h2>
        <div className="flex-col bg-slate-100 rounded-lg">
          {/* Horizontal Tabs for Builds, Centered without Gold Borders */}
          <Tabs
            aria-label="Build Options"
            selectedKey={selectedBuild}
            onSelectionChange={setSelectedBuild}
            isVertical={false} // Ensures the tabs remain horizontal
            className="rounded-lg bg-rgb(229, 231, 235)">
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
          {<div className={`flex rounded-b-lg ${backgroundColor}`}>
            <Compatibility /><Wattage />
          </div>}
        </div>
      </div>
      {/* Flex-row for Compatibility bar, component Tabs and Mobo diagram */}
      <div className="flex flex-col justify-center">

        <div className="flex flex-row items-stretch justify-center py-4 gap-4">

          {/* Vertical Tabs for Components */}
          <div className="flex flex-col p-4">
            <Tabs aria-label="PC Components" isVertical>
              <Tab className="text-xl my-2" key="cpu" title="CPU">
                <Card className="bg-[#DBAE58] hover:bg-opacity-hover">
                  {cpuCard()}
                </Card>
              </Tab>
              <Tab className="text-xl my-2" key="motherboard" title="Motherboard">
                <Card className="bg-[#DBAE58] hover:bg-opacity-hover">
                  {moboCard()}
                </Card>
              </Tab>
              <Tab className="text-xl my-2" key="memory" title="Memory">
                <Card className="bg-[#DBAE58] hover:bg-opacity-hover">
                  {memoryCard()}
                </Card>
              </Tab>
              <Tab className="text-xl my-2" key="storage" title="Storage">
                <Card className="bg-[#DBAE58] hover:bg-opacity-hover">
                  {storageCard()}
                </Card>
              </Tab>
              <Tab className="text-xl my-2" key="videoCard" title="Video Card">
                <Card className="bg-[#DBAE58] hover:bg-opacity-hover">
                  {gpuCard()}
                </Card>
              </Tab>
              <Tab className="text-xl my-2" key="cpuCooler" title="CPU Cooler">
                <Card className="bg-[#DBAE58] hover:bg-opacity-hover">
                  {coolerCard()}
                </Card>
              </Tab>
              <Tab className="text-xl my-2" key="powerSupply" title="Power Supply">
                <Card className="bg-[#DBAE58] hover:bg-opacity-hover">
                  {psuCard()}
                </Card>
              </Tab>
            </Tabs>
          </div>

          {/* Selected Components */}
          <div className="flex flex-col items-center p-4 mr-24 gap-4 bg-white">
            {/* Selected CPU */}
            <div className="">
              {selectedCPU ? (
                <div className="flex flex-col items-center">
                  <span><b><u>CPU:</u></b> <button className="text-red-600" onClick={clearSelectedCPU}>[X]</button></span>
                  <Image
                    width={60}
                    height={60}
                    src={selectedCPU.image}
                    alt="CPU">
                  </Image>
                  <span>{selectedCPU.name} {selectedCPU.socket} {selectedCPU.cpuMemoryMax + ' GB'}
                  </span>
                </div>
              ) : (
                <p>no CPU selected</p>
              )}
              <hr className=" flex bg-black h-0.5" />
            </div>
            {/* Selected Motherboard */}
            <div className="">
              {selectedMotherboard ? (
                <div className="flex flex-col items-center">
                  <span><b><u>Mobo:</u></b> <button className="text-red-600" onClick={clearSelectedMotherboard}>[X]</button></span>
                  <Image
                    width={75}
                    height={75}
                    src={selectedMotherboard.image}
                    alt="Motherboard">
                  </Image>
                  <span>{selectedMotherboard.name} {selectedMotherboard.socket} {selectedMotherboard.motherboardMemoryType} {selectedMotherboard.motherboardMemoryMax + ' GB'}
                  </span>
                </div>
              ) : (
                <p>no Motherboard selected</p>
              )}
              <hr className=" flex bg-black h-0.5" />
            </div>
            {/* Selected Memory */}
            <div className="">
              {selectedMemory ? (
                <div className="flex flex-col items-center">
                  <span><b><u>Memory:</u></b> <button className="text-red-600" onClick={clearSelectedMemory}>[X]</button></span>
                  <Image
                    width={60}
                    height={60}
                    src={selectedMemory.image}
                    alt="Memory">
                  </Image>
                  <span>{selectedMemory.name} {selectedMemory.memoryType}-{selectedMemory.speed + ' MHz '}
                    {selectedMemory.capacity + ' GB'} ({selectedMemory.modules})</span>
                </div>
              ) : (
                <p>no Memory selected</p>
              )}
              <hr className=" flex bg-black h-0.5" />
            </div>
            {/* Selected Storage */}
            <div className="">
              {selectedStorage ? (
                <div className="flex flex-col items-center">
                  <span><b><u>Storage:</u></b> <button className="text-red-600" onClick={clearSelectedStorage}>[X]</button></span>
                  <Image
                    width={70}
                    height={70}
                    src={selectedStorage.image}
                    alt="Storage">
                  </Image>
                  <span>{selectedStorage.name} {selectedStorage.capacity + ' TB'} {selectedStorage.interface}</span>
                </div>
              ) : (
                <p>no Storage selected</p>
              )}
              <hr className=" flex bg-black h-0.5" />
            </div>
            {/* Selected Video Card */}
            <div className="">
              {selectedVideoCard ? (
                <div className="flex flex-col items-center">
                  <span><b><u>GPU:</u></b> <button className="text-red-600" onClick={clearSelectedVideoCard}>[X]</button></span>
                  <Image
                    width={80}
                    height={80}
                    src={selectedVideoCard.image}
                    alt="Video Card">
                  </Image>
                  <span>{selectedVideoCard.name} {selectedVideoCard.videoCardMemoryType} {selectedVideoCard.memory + ' GB '}
                    {selectedVideoCard.coreClock + ' MHz '}{/*selectedVideoCard.tdp + ' W'*/}{/*selectedVideoCard.length + ' mm'*/}
                  </span>
                </div>
              ) : (
                <p>no Video Card selected</p>
              )}
              <hr className=" flex bg-black h-0.5" />
            </div>
            {/* Selected CPU Cooler */}
            <div className="">
              {selectedCPUCooler ? (
                <div className="flex flex-col items-center">
                  <span><b><u>CPU Cooler:</u></b> <button className="text-red-600" onClick={clearSelectedCPUCooler}>[X]</button></span>
                  <Image
                    width={70}
                    height={70}
                    src={selectedCPUCooler.image}
                    alt="CPU Cooler">
                  </Image>
                  <span>{selectedCPUCooler.name} {selectedCPUCooler.fanRPM + ' RPM'} {selectedCPUCooler.noiseLevel + ' dB'} {selectedCPUCooler.height || selectedCPUCooler.radiatorSize + " mm"}
                  </span>
                </div>
              ) : (
                <p>no CPU Cooler selected</p>
              )}
              <hr className=" flex bg-black h-0.5" />
            </div>
            {/* Selected Power Supply */}
            <div className="">
              {selectedPowerSupply ? (
                <div className="flex flex-col items-center">
                  <span><b><u>PSU:</u></b> <button className="text-red-600" onClick={clearSelectedPowerSupply}>[X]</button></span>
                  <Image
                    width={70}
                    height={70}
                    src={selectedPowerSupply.image}
                    alt="Power Supply">
                  </Image>
                  <span>{selectedPowerSupply.name} {selectedPowerSupply.formFactor} {selectedPowerSupply.efficiency} {selectedPowerSupply.wattage + " W"} {selectedPowerSupply.modularity}
                    {/*selectedPowerSupply.length + " mm"*/}
                  </span>
                </div>
              ) : (
                <p>no Power Supply selected</p>
              )}
            </div>

          </div>
          {/* Mobo diagram */}
          <div className="flex flex-col items-center">
            <Image
              width={400}
              height={500}
              src={MoboDiagram}
              alt="mobo goes here" />
          </div>
        </div>
      </div>
    </div>
  );
}