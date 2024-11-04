"use client"
import { useSharedData } from '@/context/SharedDataContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import WattageOn from '../../public/zap.svg';
import WattageOff from "../../public/zap-off.svg";

export const Wattage = () => {
  const { selectedCPU, selectedMotherboard, selectedMemory,
    selectedStorage, selectedVideoCard, selectedCPUCooler,
  totalWattage, setTotalWattage, storageCount, memoryCount, } = useSharedData();
  const [wattageIcon, setWattageIcon] = useState(WattageOff);

  const handleWattageIcon = () => {
    if (totalWattage <= 0) {
      setWattageIcon(WattageOff);
    } else if (totalWattage > 0) {
      setWattageIcon(WattageOn);
    }
  };

  // Handle Total Wattage
  useEffect(() => {
    // If Intel, use maxTurboPower attribute. If AMD and dedicated, use tdp.
    const calculateCPUWattage = () => {
      if (!selectedCPU) return 0;
      if (selectedCPU.maxTurboPower) return selectedCPU.maxTurboPower;
      if (selectedCPU.integrated === 'None') return selectedCPU.tdp;
      return Math.ceil(selectedCPU.tdp + (selectedCPU.tdp * 0.35)); // integrated AMD (APU)
    };

    // Determine wattage based on validated Motherboard form factors
    const calculateMotherboardWattage = () => {
      if (!selectedMotherboard) return 0;
      switch (selectedMotherboard.formFactor) {
        case 'EATX':
          return 100;
        case 'ATX':
          return 70;
        case 'MATX': // Micro ATX
          return 60;
        case 'ITX': // Mini ITX
          return 30;
      }
    };

    // 7.75 W per 8 GBs of Memory, regardless of DDR type
    const calculateMemoryWattage = () => {
      if (!selectedMemory) return 0;
      return Math.ceil((selectedMemory.capacity / 8) * 7.75)
    }

    // 15 W, regardless of Storage type and capacity
    const calculateStorageWattage = () => {
      // return selectedStorage ? 15 : 0;
      return selectedStorage ? storageCount * 15 : 0;
      // For adding more than 1 storage, check the amount of storageID's in 
      // selectedStorage, then return that amount * 15.
    }

    // If AIO Cooler (radiatorSize attribute exists), set to 15 W & 10 W for air
    const calculateCPUCoolerWattage = () => {
      if (!selectedCPUCooler) return 0;
      return (selectedCPUCooler.radiatorSize) ? 15 : 10;
    }

    // Calculate total wattage
    const wattage =
      calculateCPUWattage() +
      calculateMotherboardWattage() +
      calculateMemoryWattage() +
      calculateStorageWattage() +
      (selectedVideoCard?.tdp || 0) +
      calculateCPUCoolerWattage();

    // Update totalWattage state
    setTotalWattage(wattage);
  }, [selectedCPU, selectedMotherboard, selectedMemory, selectedStorage,
    selectedVideoCard, selectedCPUCooler]);

  // Update/handle wattageIcon
  useEffect(() => {
    handleWattageIcon();
  }, [totalWattage]);

  return (
    <div className="flex rounded-br-lg bg-[#DBAE58] items-center h-10 px-6 pr-7">
      <p className="flex items-center justify-center whitespace-nowrap font-semibold text-xs">
        <Image className="mr-1" src={wattageIcon} alt="⚡" />{`Total Wattage: ${totalWattage} W`}
      </p>
    </div>
  );
}

export default Wattage;