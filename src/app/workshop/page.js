'use client'
import { useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export default function Home() {
  const [cpuData, setCpuData] = useState([]);
  const [moboData, setMoboData] = useState([]);
  const [cpuCoolerData, setCoolerData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);
  const [storageData, setStorageData] = useState([]);
  const [videoCardData, setVideoCardData] = useState([]);
  const [powerSupplyData, setPowerSupplyData] = useState([]);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchData("/api/cpus", setCpuData);
    fetchData("/api/motherboards", setMoboData);
    fetchData("/api/cpuCoolers", setCoolerData);
    fetchData("/api/memorys", setMemoryData);
    fetchData("/api/storages", setStorageData);
    fetchData("/api/videoCards", setVideoCardData);
    fetchData("/api/powerSupplys", setPowerSupplyData);
  }, []);

  const [selectedBuild, setSelectedBuild] = useState("build1");

  return (
    <div className="min-h-screen bg-[#4D585B] p-8"> {/* Background: Charcoal */}
      <h1 className="text-4xl font-bold mt-8 mb-4 text-[#DBAE58] text-center"> {/* Title: Gold */}
        PC Workshop
      </h1>

      {/* Horizontal Tabs for Builds, Centered without Gold Borders */}
      <div className="flex justify-center mb-6">
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

      {/* Vertical Tabs for Components */}
      <div className="flex w-full flex-col">
        <Tabs aria-label="PC Components" isVertical>
          <Tab key="motherboard" title="Motherboard">
            <Card>
              <CardBody>
                {error ? (
                  <p className="text-red-500">Error: {error}</p>
                ) : (
                  moboData.map((item) => (
                    <div key={item.id} className="p-2 border-b border-[#DBAE58]">
                      Product code: {item.formFactor}
                    </div>
                  ))
                )}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="cpu" title="CPU">
            <Card>
              <CardBody>
                {error ? (
                  <p className="text-red-500">Error: {error}</p>
                ) : (
                  cpuData.map((item) => (
                    <div key={item.id} className="p-2 border-b border-[#DBAE58]">
                      Product code: {item.formFactor}
                    </div>
                  ))
                )}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="cpuCooler" title="CPU Cooler">
            <Card>
              <CardBody>
                {error ? (
                  <p className="text-red-500">Error: {error}</p>
                ) : (
                  cpuCoolerData.map((item) => (
                    <div key={item.id} className="p-2 border-b border-[#DBAE58]">
                      Product code: {item.formFactor}
                    </div>
                  ))
                )}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="memory" title="Memory">
            <Card>
              <CardBody>
                {error ? (
                  <p className="text-red-500">Error: {error}</p>
                ) : (
                  memoryData.map((item) => (
                    <div key={item.id} className="p-2 border-b border-[#DBAE58]">
                      Product code: {item.formFactor}
                    </div>
                  ))
                )}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="storage" title="Storage">
            <Card>
              <CardBody>
                {error ? (
                  <p className="text-red-500">Error: {error}</p>
                ) : (
                  storageData.map((item) => (
                    <div key={item.id} className="p-2 border-b border-[#DBAE58]">
                      Product code: {item.formFactor}
                    </div>
                  ))
                )}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="videoCard" title="Video Card">
            <Card>
              <CardBody>
                {error ? (
                  <p className="text-red-500">Error: {error}</p>
                ) : (
                  videoCardData.map((item) => (
                    <div key={item.id} className="p-2 border-b border-[#DBAE58]">
                      Product code: {item.formFactor}
                    </div>
                  ))
                )}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="powerSupply" title="Power Supply">
            <Card>
              <CardBody>
                {error ? (
                  <p className="text-red-500">Error: {error}</p>
                ) : (
                  powerSupplyData.map((item) => (
                    <div key={item.id} className="p-2 border-b border-[#DBAE58]">
                      Product code: {item.formFactor}
                    </div>
                  ))
                )}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
