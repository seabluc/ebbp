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
    fetchData("/api/cpu", setCpuData);
    fetchData("/api/motherboard", setMoboData);
    fetchData("/api/cpu_cooler", setCoolerData);
    fetchData("/api/memory", setMemoryData);
    fetchData("/api/storage", setStorageData);
    fetchData("/api/video_card", setVideoCardData);
    fetchData("/api/power_supply", setPowerSupplyData);
  }, []);

  return (
    <div className="min-h-screen bg-[#4D585B] p-8"> {/* Background: Charcoal */}
      <h1 className="text-center text-5xl font-bold text-[#DBAE58] mb-6"> {/* Title: Gold */}
        PC Workshop (add tabs for builds)
      </h1>

      <div className="flex flex-col items-start space-y-6"> {/* Align items to start, with spacing */}
        {/* Component Cards */}
        {[ 
          { name: "Motherboards", data: moboData, api: "/api/motherboard" },
          { name: "CPUs", data: cpuData, api: "/api/cpu" },
          { name: "CPU Coolers", data: cpuCoolerData, api: "/api/cpu_cooler" },
          { name: "RAM", data: memoryData, api: "/api/memory" },
          { name: "Storage", data: storageData, api: "/api/storage" },
          { name: "Video Cards", data: videoCardData, api: "/api/video_card" },
          { name: "PSUs", data: powerSupplyData, api: "/api/power_supply" },
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
                    Product code: {item.part_number}
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