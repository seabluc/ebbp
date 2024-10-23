'use client'
import { useEffect, useState } from "react";

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

  return (
    <div className="min-h-screen bg-[#4D585B] p-8"> {/* Background: Charcoal */}
      <h1 className="text-center text-5xl font-bold text-[#DBAE58] mb-6"> {/* Title: Gold */}
        PC Workshop (add tabs for builds)
      </h1>

      <div className="flex flex-col items-start space-y-6"> {/* Align items to start, with spacing */}
        {/* Component Cards */}
        {[ 
          { name: "Motherboard", data: moboData, api: "/api/motherboards" },
          { name: "CPU", data: cpuData, api: "/api/cpus" },
          { name: "CPU Cooler", data: cpuCoolerData, api: "/api/cpuCoolers" },
          { name: "Memory", data: memoryData, api: "/api/memorys" },
          { name: "Storage", data: storageData, api: "/api/storages" },
          { name: "Video Card", data: videoCardData, api: "/api/videoCards" },
          { name: "Power Supply", data: powerSupplyData, api: "/api/powerSupplys" },
        ].map(({ name, data, api }, index) => (
          <div
            key={index}
            className="w-[300px] bg-[#488A99] rounded-lg border-2 border-[#DBAE58] p-4 shadow-md"
          >
            <span className="block text-center text-[#DBAE58] font-semibold text-xl mb-2">
              {name}
            </span>
            <a
              href={api}
              target="_blank"
              rel="noreferrer"
              className="text-[#E0E0E0] hover:text-white hover:underline p-1 block text-center"
            >
              View {name} API Data
            </a>
            <select className="w-full mt-2 p-2 rounded bg-[#4D585B] text-white">
              <option selected>-</option>
              {error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : (
                data.map((item) => (
                  <option key={item.id}>
                    Product code: {item.formFactor}
                  </option>
                ))
              )}
            </select>
          </div>
        ))}

        {/* Placeholder for Cases */}
        <div className="w-[300px] bg-[#488A99] rounded-lg border-2 border-[#DBAE58] p-4 shadow-md">
          <span className="block text-center text-[#DBAE58] font-semibold text-xl mb-2">
            Cases
          </span>
          <a
            href="/api"
            target="_blank"
            rel="noreferrer"
            className="text-[#E0E0E0] hover:text-white hover:underline p-1 block text-center"
          >
            <s>Cases API</s> (coming soon)
          </a>
          <select className="w-full mt-2 p-2 rounded bg-[#4D585B] text-white">
            <option selected>-</option>
            <option>Peripherals like Monitors coming soon</option>
          </select>
        </div>
      </div>
    </div>
  );
}