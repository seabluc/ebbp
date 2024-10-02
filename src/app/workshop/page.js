'use client'
//import { useEffect, useState, useRef } from "react";
import { useEffect, useState } from "react";

export default function Home() {
  const [cpuData, setCpuData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCpuData = async () => { 
      try {
        const response = await fetch('/api/cpu');
        if (!response.ok) {
          throw new Error('HTTP error! status: ${response.status}');
        }
        const data = await response.json(); // parse JSON data
        setCpuData(data); // store data in cpuData state
      } catch (error) {
        setError(error.message); // handle any errors
      }
    };
    fetchCpuData(); // call the function on component mount
  }, []);

  return (
    <>
      <h1 className="text-center text-lg pt-4">PC workshop page</h1>
      <div className="mt-4 flex flex-wrap justify-evenly">
        <span className="border-2 p-2 m-4 hover:bg-slate-200">
          <a href="/api/motherboard" target="_blank" rel="noreferrer">
            Database API data &#40;Motherboards&#41;
          </a>
        </span>
        <span className="border-2 p-2 m-4 hover:bg-slate-200">
          <a href="/api/cpu" target="_blank" rel="noreferrer">
            Database API data &#40;CPUs&#41;
          </a>
          {error ? (
            <p className="text-red-500"> Error: {error}</p>)
            : (
              cpuData.map((cpu) => (
                <div key={cpu.id} className="border-2">
                  <p>CPU product code: {cpu.part_number}</p>
                </div>
              ))
            )}   
        </span>
        <span className="border-2 p-2 m-4 hover:bg-slate-200">
          <a href="/api/cpu_cooler" target="_blank" rel="noreferrer">
            Database API data &#40;CPU Coolers&#41;
          </a>
        </span>
        <span className="border-2 p-2 m-4 hover:bg-slate-200">
          <a href="/api/memory" target="_blank" rel="noreferrer">
            Database API data &#40;RAM&#41;
          </a>
        </span>
        <span className="border-2 p-2 m-4 hover:bg-slate-200">
          <a href="/api/storage" target="_blank" rel="noreferrer">
            Database API data &#40;Storages&#41;
          </a>
        </span>
        <span className="border-2 p-2 m-4 hover:bg-slate-200">
          <a href="/api/video_card" target="_blank" rel="noreferrer">
            Database API data &#40;Graphics Cards&#41;
          </a>
        </span>
        <span className="border-2 p-2 m-4 hover:bg-slate-200">
          <a href="/api/power_supply" target="_blank" rel="noreferrer">
            Database API data &#40;PSUs&#41;
          </a>
        </span>
        <span className="border-2 p-2 m-4 hover:bg-slate-200">
          <a href="/api" target="_blank" rel="noreferrer">
            <s>Database API data &#40;cases&#41;</s> coming soon
          </a>
        </span>
      </div>
    </>
  );
}
