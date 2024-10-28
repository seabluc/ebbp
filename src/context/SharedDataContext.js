'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const SharedDataContext = createContext();

export function SharedDataProvider({ children }) {
  const [selectedCPU, setSelectedCPU] = useState(null);
  const [selectedMotherboard, setSelectedMotherboard] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedVideoCard, setSelectedVideoCard] = useState(null);
  const [selectedCPUCooler, setSelectedCPUCooler] = useState(null);
  const [selectedPowerSupply, setSelectedPowerSupply] = useState(null);

  useEffect(() => {
    const savedCPU = localStorage.getItem('selectedCPU');
    const savedMobo = localStorage.getItem('selectedMotherboard');
    const savedMemory = localStorage.getItem('selectedMemory');
    const savedStorage = localStorage.getItem('selectedStorage');
    const savedVideoCard = localStorage.getItem('selectedVideoCard');
    const savedCooler = localStorage.getItem('selectedCPUCooler');
    const savedPowerSupply = localStorage.getItem('selectedPowerSupply');
    if (savedCPU) {
      setSelectedCPU(JSON.parse(savedCPU));
    }
    if (savedMobo) {
      setSelectedMotherboard(JSON.parse(savedMobo));
    }
    if (savedMemory) {
      setSelectedMemory(JSON.parse(savedMemory));
    }
    if (savedStorage) {
      setSelectedStorage(JSON.parse(savedStorage));
    }
    if (savedVideoCard) {
      setSelectedVideoCard(JSON.parse(savedVideoCard));
    }
    if (savedCooler) {
      setSelectedCPUCooler(JSON.parse(savedCooler));
    }
    if (savedPowerSupply) {
      setSelectedPowerSupply(JSON.parse(savedPowerSupply));
    }
  }, []);

  const updateSelectedCPU = (cpu) => {
    setSelectedCPU(cpu);
    localStorage.setItem('selectedCPU', JSON.stringify(cpu));
  };

  const clearSelectedCPU = () => {
    setSelectedCPU(null);
    localStorage.removeItem('selectedCPU');
  };

  const updateSelectedMotherboard = (mobo) => {
    setSelectedMotherboard(mobo);
    localStorage.setItem('selectedMotherboard', JSON.stringify(mobo));
  };

  const clearSelectedMotherboard = () => {
    setSelectedMotherboard(null);
    localStorage.removeItem('selectedMotherboard');
  }

  const updateSelectedMemory = (memory) => {
    setSelectedMemory(memory);
    localStorage.setItem('selectedMemory', JSON.stringify(memory));
  }

  const clearSelectedMemory = () => {
    setSelectedMemory(null);
    localStorage.removeItem('selectedMemory');
  }

  const updateSelectedStorage = (storage) => {
    setSelectedStorage(storage);
    localStorage.setItem('selectedStorage', JSON.stringify(storage));
  }

  const clearSelectedStorage = () => {
    setSelectedStorage(null);
    localStorage.removeItem('selectedStorage');
  }

  const updateSelectedVideoCard = (gpu) => {
    setSelectedVideoCard(gpu);
    localStorage.setItem('selectedVideoCard', JSON.stringify(gpu));
  }

  const clearSelectedVideoCard = () => {
    setSelectedVideoCard(null);
    localStorage.removeItem('selectedVideoCard');
  }

  const updateSelectedCPUCooler = (cooler) => {
    setSelectedCPUCooler(cooler);
    localStorage.setItem('selectedCPUCooler', JSON.stringify(cooler));
  }

  const clearSelectedCPUCooler = () => {
    setSelectedCPUCooler(null);
    localStorage.removeItem('selectedCPUCooler');
  }

  const updateSelectedPowerSupply = (psu) => {
    setSelectedPowerSupply(psu);
    localStorage.setItem('selectedPowerSupply', JSON.stringify(psu));
  }

  const clearSelectedPowerSupply = () => {
    setSelectedPowerSupply(null);
    localStorage.removeItem('selectedPowerSupply');
  }

  return (
    <SharedDataContext.Provider
      value={{
        selectedCPU, updateSelectedCPU, clearSelectedCPU,
        selectedMotherboard, updateSelectedMotherboard, clearSelectedMotherboard,
        selectedMemory, updateSelectedMemory, clearSelectedMemory,
        selectedStorage, updateSelectedStorage, clearSelectedStorage,
        selectedVideoCard, updateSelectedVideoCard, clearSelectedVideoCard,
        selectedCPUCooler, updateSelectedCPUCooler, clearSelectedCPUCooler,
        selectedPowerSupply, updateSelectedPowerSupply, clearSelectedPowerSupply,
      }}>
      {children}
    </SharedDataContext.Provider>
  );
}

export function useSharedData() {
  return useContext(SharedDataContext);
}
