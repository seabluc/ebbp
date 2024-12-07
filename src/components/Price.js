'use client'
import { useSharedData } from '@/context/SharedDataContext';
import { useEffect } from 'react';

export const Price = () => {
  const { selectedCPU, selectedMotherboard, selectedMemory,
    selectedStorage, selectedVideoCard, selectedCPUCooler,
    selectedPowerSupply, totalPrice, setTotalPrice } = useSharedData();
  // Handle Total Price
  useEffect(() => {
    // Calculate total price of all selected memory parts
    const totalMemoryPrice = () => {
      // Check if user has selected any RAM modules
      if (!selectedMemory || selectedMemory.length === 0) {
        return 0;
      }
      let memoryPrices = 0;
      selectedMemory.forEach((memoryItem) => {
        memoryPrices += parseFloat(memoryItem.price);
      });
      return memoryPrices;
    };

    // Calculate total price of all selected storage parts
    const totalStoragePrice = () => {
      // Check if user has selected a storage device
      if (!selectedStorage || selectedStorage.length === 0) {
        return 0;
      }
      let storagePrices = 0;
      selectedStorage.forEach(storageItem => {
        storagePrices += parseFloat(storageItem.price);
      });
      return storagePrices;
    };

    // Calculate total cost of selected PC parts
    const cost =
      parseFloat(selectedCPU?.price || 0) +
      parseFloat(selectedMotherboard?.price || 0) +
      totalMemoryPrice() +
      totalStoragePrice() +
      parseFloat(selectedVideoCard?.price || 0) +
      parseFloat(selectedCPUCooler?.price || 0) +
      parseFloat(selectedPowerSupply?.price || 0);
    setTotalPrice(cost);
  }, [selectedCPU, selectedMotherboard, selectedMemory, selectedStorage,
    selectedVideoCard, selectedCPUCooler, selectedPowerSupply]);

  return <div className="flex justify-center items-center h-6 overflow-hidden">
    Total Price: ${totalPrice.toFixed(2)}
  </div>
}

export default Price;