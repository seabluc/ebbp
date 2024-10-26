'use client'
import { /*useEffect,*/ useState, useReducer } from "react";
import { Tabs, Tab, Card, CardBody, /*Image*/ } from "@nextui-org/react";
import MoboDiagram from "../../../public/mobo-diagram-2-mem-slots.png";
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [selectedBuild, setSelectedBuild] = useState("build1");
  
  function checkComponents(state, action) {
    // check all components
  }

  function ComputerBuild() {
    const [component, dispatch] = useReducer(checkComponents, { part: null });
  }

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


      {/* Flex-row for component Tabs and Mobo diagram */}
      <div className="flex flex-row items-stretch justify-center p-4 gap-4">
        {/* Vertical Tabs for Components */}
        <div className="flex flex-col p-4">
          <Tabs aria-label="PC Components" isVertical>
            <Tab className="text-xl my-2" key="motherboard" title="Motherboard">
              <Card className="bg-[#DBAE58] hover:bg-opacity-hover">
                <CardBody className="text-base">
                  <Link href="products/motherboard">
                    add Motherboard
                  </Link>
                </CardBody>
              </Card>
            </Tab>
            <Tab className="text-xl my-2" key="cpu" title="CPU">
              <Card className="bg-[#DBAE58] hover:bg-opacity-hover">
                <CardBody className="text-base">
                  <Link href="products/cpu">
                    add CPU
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
  );
}

/* Code for old hooks
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
*/

/* Code for old Tabs
          <Tabs aria-label="PC Components" isVertical>
            <Tab key="motherboard" title="Motherboard">
              <Card>
                <CardBody>
                  {error ? (
                    <p className="text-red-500">Error: {error}</p>
                  ) : (
                    moboData.map((item) => (
                      <div key={item.id} className="p-2 border-b border-[#DBAE58]">
                        Model name: {item.name} <br />
                        Product code: {item.partNum}
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
                        Model name: {item.name} <br />
                        Product code: {item.partNum}
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
                        Model name: {item.name} <br />
                        Product code: {item.partNum}
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
                        Model name: {item.name} <br />
                        Product code: {item.partNum}
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
                        Model name: {item.name} <br />
                        Product code: {item.partNum}
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
                        Model name: {item.name} <br />
                        Product code: {item.partNum}
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
                        Model name: {item.name} <br />
                        Product code: {item.partNum}
                      </div>
                    ))
                  )}
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
*/