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
        throw new Error("HTTP error! status: ${response.status}");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData("/api/processor", setCpuData);
    //fetchData("/api/cpu", setCpuData);
    fetchData("/api/motherboard", setMoboData);
    fetchData("/api/cpu_cooler", setCoolerData);
    fetchData("/api/memory", setMemoryData);
    fetchData("/api/storage", setStorageData);
    fetchData("/api/video_card", setVideoCardData);
    fetchData("/api/power_supply", setPowerSupplyData);
  }, []);

  return (
    <>
      <h1 className="text-center text-lg pt-4">PC workshop page</h1>
      <div className="mt-4 flex flex-wrap justify-evenly">
        {/* Motherboard */}
        <div className="flex-col border-2 p-3 m-4">
          <span className="p-8 m-4">
            <a href="/api/motherboard" target="_blank"
              rel="noreferrer" className="hover:bg-slate-200 p-1">
              Database API data &#40;Motherboards&#41;
            </a>
            <select className="flex mt-2">
              <option selected>-</option>
              {error ? (
                <p className="text-red-500"> Error: {error}</p>)
                : (
                  moboData.map((mobo) => (
                    <option key={mobo.id} className="">
                      <p>Mobo product code: {mobo.part_number}</p>
                    </option>
                  ))
                )}
            </select>
          </span>
        </div>
        {/* CPU */}
        <div className="flex-col border-2 p-3 m-4">
          <span className="p-8 m-4">
            <a href="/api/cpu" target="_blank"
              rel="noreferrer" className="hover:bg-slate-200 p-1">
              Database API data &#40;CPUs&#41;
            </a>
            <select className="flex mt-2">
              <option selected>-</option>
              {error ? (
                <p className="text-red-500"> Error: {error}</p>)
                : (
                  cpuData.map((cpu) => (
                    <option key={cpu.id} className="">
                      <p>CPU product code: {cpu.part_number}</p>
                    </option>
                  ))
                )}
            </select>
          </span>
        </div>
        {/* CPU Cooler */}
        <div className="flex-col border-2 p-3 m-4">
          <span className="p-8 m-4">
            <a href="/api/cpu" target="_blank"
              rel="noreferrer" className="hover:bg-slate-200 p-1">
              Database API data &#40;CPU Coolers&#41;
            </a>
            <select className="flex mt-2">
              <option selected>-</option>
              {error ? (
                <p className="text-red-500"> Error: {error}</p>)
                : (
                  cpuCoolerData.map((cpuCooler) => (
                    <option key={cpuCooler.id} className="">
                      <p>CPU Cooler product code: {cpuCooler.part_number}</p>
                    </option>
                  ))
                )}
            </select>
          </span>
        </div>
        {/* RAM */}
        <div className="flex-col border-2 p-3 m-4">
          <span className="p-8 m-4">
            <a href="/api/memory" target="_blank"
              rel="noreferrer" className="hover:bg-slate-200 p-1">
              Database API data &#40;RAM&#41;
            </a>
            <select className="flex mt-2">
              <option selected>-</option>
              {error ? (
                <p className="text-red-500"> Error: {error}</p>)
                : (
                  memoryData.map((memory) => (
                    <option key={memory.id} className="">
                      <p>RAM product code: {memory.part_number}</p>
                    </option>
                  ))
                )}
            </select>
          </span>
        </div>
        {/* Storage Drives */}
        <div className="flex-col border-2 p-3 m-4">
          <span className="p-8 m-4">
            <a href="/api/storage" target="_blank"
              rel="noreferrer" className="hover:bg-slate-200 p-1">
              Database API data &#40;Storages&#41;
            </a>
            <select className="flex mt-2">
              <option selected>-</option>
              {error ? (
                <p className="text-red-500"> Error: {error}</p>)
                : (
                  storageData.map((storage) => (
                    <option key={storage.id} className="">
                      <p>Storage product code: {storage.part_number}</p>
                    </option>
                  ))
                )}
            </select>
          </span>
        </div>
        {/* Video Cards */}
        <div className="flex-col border-2 p-3 m-4">
          <span className="p-8 m-4">
            <a href="/api/video_card" target="_blank"
              rel="noreferrer" className="hover:bg-slate-200 p-1">
              Database API data &#40;Video Card&#41;
            </a>
            <select className="flex mt-2">
              <option selected>-</option>
              {error ? (
                <p className="text-red-500"> Error: {error}</p>)
                : (
                  videoCardData.map((videoCard) => (
                    <option key={videoCard.id} className="">
                      <p>Video card product code: {videoCard.part_number}</p>
                    </option>
                  ))
                )}
            </select>
          </span>
        </div>
        {/* PSU */}
        <div className="flex-col border-2 p-3 m-4">
          <span className="p-8 m-4">
            <a href="/api/power_supply" target="_blank"
              rel="noreferrer" className="hover:bg-slate-200 p-1">
              Database API data &#40;PSUs&#41;
            </a>
            <select className="flex mt-2">
              <option selected>-</option>
              {error ? (
                <p className="text-red-500"> Error: {error}</p>)
                : (
                  powerSupplyData.map((powerSupply) => (
                    <option key={powerSupply.id} className="">
                      <p>Power Supply product code: {powerSupply.part_number}</p>
                    </option>
                  ))
                )}
            </select>
          </span>
        </div>
        {/* Cases */}
        <div className="flex-col border-2 p-3 m-4">
          <span className="p-8 m-4">
            <a href="/api" target="_blank"
              rel="noreferrer" className="hover:bg-slate-200 p-1">
              <s>Database API data &#40;cases&#41;</s> coming soon
            </a>
            <select className="flex mt-2">
              <option selected>-</option>
              <option>peripherals like Monitors will soon be included too</option>
            </select>
          </span>
        </div>
      </div>
    </>
  );
}
