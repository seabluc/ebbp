'use client'
import { useSharedData } from '@/context/SharedDataContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export const Price = () => {
  const { selectedCPU, selectedMotherboard, selectedMemory,
    selectedStorage, selectedVideoCard, selectedCPUCooler,
    selectedPowerSupply } = useSharedData();

  const [totalPrice, setTotalPrice] = useState(null);

  const totalStoragePrice = () => {
    if (!selectedStorage || selectedStorage.length === 0) {
      return 0;
    }
    let storagePrices = 0;
    selectedStorage.forEach(storageItem => {
      storagePrices += parseFloat(storageItem.price);
    });
    return storagePrices;
  };

  const totalMemoryPrice = () => {
    if (!selectedMemory || selectedMemory.length === 0) {
      return 0;
    }
    let memoryPrices = 0;
    selectedMemory.forEach((memoryItem) => {
      memoryPrices += parseFloat(memoryItem.price);
    });
    return memoryPrices;
  };

  // Handle Total Price
  useEffect(() => {
    // Calculate total price
    const cost =
      (parseFloat(selectedCPU?.price || 0) +
        (parseFloat(selectedMotherboard?.price || 0)) +
        totalMemoryPrice() +
        totalStoragePrice() +
        (parseFloat(selectedVideoCard?.price || 0)) +
        (parseFloat(selectedCPUCooler?.price || 0)) +
        (parseFloat(selectedPowerSupply?.price || 0)))
    setTotalPrice(cost);
  }, [selectedCPU, selectedMotherboard, selectedMemory, selectedStorage,
    selectedVideoCard, selectedCPUCooler, selectedPowerSupply]);

  return (
    <div className="flex rounded-lg bg-default-400 h-10 px-6 pr-7">
      <p className="flex items-center justify-center font-semibold text-xs">
        Total Price: ${totalPrice}
      </p>
    </div>
  );
}

export default Price;