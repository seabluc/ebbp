'use client';
import { createContext, useContext, useState } from "react";
import { Tabs, Tab, Card, CardBody, /*Image*/ } from "@nextui-org/react";
import MoboDiagram from "../../../public/mobo-diagram-2-mem-slots.png";
import Image from 'next/image';
import Link from 'next/link';
import { useSharedData } from '../../context/SharedDataContext';

export default function Home() {
  const [selectedBuild, setSelectedBuild] = useState("build1"); // For Tab Builds #1-10
  const { selectedCPU, clearSelectedCPU } = useSharedData();
  const { selectedMotherboard, clearSelectedMotherboard } = useSharedData();
  const { selectedMemory, clearSelectedMemory } = useSharedData();
  const { selectedStorage, clearSelectedStorage } = useSharedData();
  const { selectedVideoCard, clearSelectedVideoCard } = useSharedData();
  const { selectedPowerSupply, clearSelectedPowerSupply } = useSharedData();
  const { selectedCPUCooler, clearSelectedCPUCooler } = useSharedData();

  return (
    <div className="flex flex-col min-h-screen bg-[#4D585B] py-4 px-8"> {/* Background: Charcoal */}

      {/* Flex-col for Title/header & Build Tabs */}
      <div className="flex flex-col items-center">
        {/* Title: Gold */}
        <div className="flex">
          <h1 className="flex text-4xl font-bold my-8 mb-4 text-[#DBAE58]">
            PC Workshop
          </h1>
        </div>
        {/* Horizontal Tabs for Builds, Centered without Gold Borders */}
        <div className="flex mb-8">
          <Tabs
            aria-label="Build Options"
            selectedKey={selectedBuild}
            onSelectionChange={setSelectedBuild}
            isVertical={false} // Ensures the tabs remain horizontal
            css={{ borderRadius: "8px" }} // Ensures the tabs have rounded corners
          >
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
        </div>
      </div>

      <div className="flex justify-center border-2 border-dashed">
        {/* Flex-row for component Tabs and Mobo diagram */}
        <div className="flex flex-row items-stretch justify-center py-4 gap-4">
          {/* Vertical Tabs for Components */}
          <div className="flex flex-col p-4">
            <Tabs aria-label="PC Components" isVertical>
              <Tab className="text-xl my-2" key="cpu" title="CPU">
                <Card className="bg-[#DBAE58] hover:bg-opacity-hover">
                  <CardBody className="text-base">
                    <Link href="products/cpu">
                      add CPU
                    </Link>
                  </CardBody>
                </Card>
              </Tab>
              <Tab className="text-xl my-2" key="motherboard" title="Motherboard">
                <Card className="bg-[#DBAE58] hover:bg-opacity-hover">
                  <CardBody className="text-base">
                    <Link href="products/motherboard">
                      add Motherboard
                    </Link>
                  </CardBody>
                </Card>
              </Tab>
              <Tab className="text-xl my-2" key="memory" title="Memory">
                <Card className="bg-[#DBAE58] hover:bg-opacity-hover">
                  <CardBody className="text-base">
                    <Link href="products/memory">
                      add Memory
                    </Link>
                  </CardBody>
                </Card>
              </Tab>
              <Tab className="text-xl my-2" key="storage" title="Storage">
                <Card className="bg-[#DBAE58] hover:bg-opacity-hover">
                  <CardBody className="text-base">
                    <Link href="products/storage">
                      add Storage
                    </Link>
                  </CardBody>
                </Card>
              </Tab>
              <Tab className="text-xl my-2" key="videoCard" title="Video Card">
                <Card className="bg-[#DBAE58] hover:bg-opacity-hover">
                  <CardBody className="text-base">
                    <Link href="products/video-card">
                      add Video Card
                    </Link>
                  </CardBody>
                </Card>
              </Tab>
              <Tab className="text-xl my-2" key="cpuCooler" title="CPU Cooler">
                <Card className="bg-[#DBAE58] hover:bg-opacity-hover">
                  <CardBody className="text-base">
                    <Link href="products/cpu-cooler">
                      add CPU Cooler
                    </Link>
                  </CardBody>
                </Card>
              </Tab>
              <Tab className="text-xl my-2" key="powerSupply" title="Power Supply">
                <Card className="bg-[#DBAE58] hover:bg-opacity-hover">
                  <CardBody className="text-base">
                    <Link href="products/power-supply">
                      add Power Supply
                    </Link>
                  </CardBody>
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
                  <span>{selectedCPU.name} {selectedCPU.socket} {selectedCPU.maxTurboPower + ' W' ||
                    selectedCPU.tdp + ` `}
                  </span>
                </div>
              ) : (
                <p>no CPU selected</p>
              )}
            </div>
            {/* Selected Motherboard */}
            <div className="">
              {selectedMotherboard ? (
                <div className="flex flex-col items-center">
                  <span><b><u>Mobo:</u></b> <button className="text-red-600" onClick={clearSelectedMotherboard}>[X]</button></span>
                  <span>{selectedMotherboard.name} {selectedMotherboard.socket} {selectedMotherboard.memoryType} {selectedMotherboard.memoryMax + ' GB'}
                  </span>
                </div>
              ) : (
                <p>no Motherboard selected</p>
              )}
            </div>

            {/* Selected Memory */}
            <div className="">
              {selectedMemory ? (
                <div className="flex flex-col items-center">
                  <span><b><u>Memory:</u></b> <button className="text-red-600" onClick={clearSelectedMemory}>[X]</button></span>
                  <span>{selectedMemory.name} {selectedMemory.memoryType}-{selectedMemory.speed + ' GHz'}{selectedMemory.modules}</span>
                </div>
              ) : (
                <p>no Memory selected</p>
              )}
            </div>

            {/* Selected Storage */}
            <div className="">
              {selectedStorage ? (
                <div className="flex flex-col items-center">
                  <span><b><u>Storage:</u></b> <button className="text-red-600" onClick={clearSelectedStorage}>[X]</button></span>
                  <span>{selectedStorage.name} {selectedStorage.capacity + ' TB'} {selectedStorage.interface}</span>
                </div>
              ) : (
                <p>no Storage selected</p>
              )}
            </div>

            {/* Selected Video Card */}
            <div className="">
              {selectedVideoCard ? (
                <div className="flex flex-col items-center">
                  <span><b><u>GPU:</u></b> <button className="text-red-600" onClick={clearSelectedVideoCard}>[X]</button></span>
                  <span>{selectedVideoCard.name} {selectedVideoCard.memoryType} {selectedVideoCard.memory + ' GB'}
                    {selectedVideoCard.coreClock + ' MHz'} {/*selectedVideoCard.tdp + ' W'*/} {/*selectedVideoCard.length + ' mm'*/}
                  </span>
                </div>
              ) : (
                <p>no Video Card selected</p>
              )}
            </div>

            {/* Selected CPU Cooler */}
            <div className="">
              {selectedCPUCooler ? (
                <div className="flex flex-col items-center">
                  <span><b><u>CPU Cooler:</u></b> <button className="text-red-600" onClick={clearSelectedCPUCooler}>[X]</button></span>
                  <span>{selectedCPUCooler.name} {selectedCPUCooler.fanRPM + ' RPM'} {selectedCPUCooler.noiseLevel + ' dB'} {selectedCPUCooler.height || selectedCPUCooler.radiatorSize + " mm"}
                  </span>
                </div>
              ) : (
                <p>no CPU Cooler selected</p>
              )}
            </div>

            {/* Selected Power Supply */}
            <div className="">
              {selectedPowerSupply ? (
                <div className="flex flex-col items-center">
                  <span><b><u>PSU:</u></b> <button className="text-red-600" onClick={clearSelectedPowerSupply}>[X]</button></span>
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
          <div className="flex">
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