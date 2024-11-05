'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const SharedDataContext = createContext();

export function SharedDataProvider({ children }) {
  const [selectedCPU, setSelectedCPU] = useState(null);
  const [selectedMotherboard, setSelectedMotherboard] = useState(null);
  //const [selectedMemory, setSelectedMemory] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState([]);
  //const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [selectedVideoCard, setSelectedVideoCard] = useState(null);
  const [selectedCPUCooler, setSelectedCPUCooler] = useState(null);
  const [selectedPowerSupply, setSelectedPowerSupply] = useState(null);
  const [totalWattage, setTotalWattage] = useState(0);
  const [compatibilityStatus, setCompatibilityStatus] = useState("None");
  const [socketStatus, setSocketStatus] = useState(null);
  const [coolerStatus, setCoolerStatus] = useState(null);
  const [memoryStatus, setMemoryStatus] = useState(null);
  const [videoStatus, setVideoStatus] = useState(null);
  const [powerStatus, setPowerStatus] = useState(null);
  const [slotStatus, setSlotStatus] = useState(null);
  //  const [moboSATASlots, setMoboSATASlots] = useState(0);
  //  const [moboMTwoSlots, setMoboMTwoSlots] = useState(0);
  //  const [storageCount, setStorageCount] = useState(0);
  //  const [memoryCount, setMemoryCount] = useState(0);
  // const [totalMemory, setTotalMemory] = useState(0);

  // localStorage handling
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

  /*
  // handling for multiple Memory & Storage 
  useEffect(() => {
  }, [selectedMotherboard])
  */

  {/* Selecting components (/products) and removing components (/workshop) */ }
  const updateSelectedCPU = (cpu) => {
    setSelectedCPU(cpu);
    localStorage.setItem('selectedCPU', JSON.stringify(cpu));
  };

  const clearSelectedCPU = () => {
    setSelectedCPU(null);
    setVideoStatus(null);
    setSocketStatus(null);
    localStorage.removeItem('selectedCPU');
  };

  // when user selects a motherboard on /products/motherboard
  const updateSelectedMotherboard = (mobo) => {
    setSelectedMotherboard(mobo);
    localStorage.setItem('selectedMotherboard', JSON.stringify(mobo));
  };

  const clearSelectedMotherboard = () => {
    setSelectedMotherboard(null);
    setSocketStatus(null);
    setMemoryStatus(null);
    setSlotStatus(null);
    localStorage.removeItem('selectedMotherboard');
  }

  /* old memory state 
  const updateSelectedMemory = (memory) => {
    setSelectedMemory(memory);
    localStorage.setItem('selectedMemory', JSON.stringify(memory));
  }
  */

  /* old memory state
  const clearSelectedMemory = () => {
    setSelectedMemory(null);
    setMemoryStatus(null);
    localStorage.removeItem('selectedMemory');
  }
  */

  /* old storage state
  // when user selects a storage on /products/storage
  const updateSelectedStorage = (storage) => {
    setSelectedStorage(storage);
    if (selectedStorage?.nvme || 0) {
      setMoboMTwoSlots((prevSlots) => Math.max(prevSlots - 1, 0)); // No negative slots
    } else {
      setMoboSATASlots((prevSlots) => Math.max(prevSlots - 1, 0)); // No negative slots
    }
    setStorageCount((prevStorage) => prevStorage + 1);
    localStorage.setItem('selectedStorage', JSON.stringify(storage));
  }
  */

  /* old storage state
  // when user deselects their build's storage on /workshop
  const clearSelectedStorage = () => {
    setSelectedStorage(null);
    if (selectedStorage.nvme) {
      setMoboMTwoSlots((prevSlots) => prevSlots + 1);
    } else {
      setMoboSATASlots((prevSlots) => prevSlots + 1);
    }
    setStorageCount((prevStorage) => Math.max(prevStorage - 1, 0)); // No negative storages
    localStorage.removeItem('selectedStorage');
  }
  */

  // New memory[] state for adding specific RAM component
  const updateSelectedMemory = (memory) => {
    const instanceId = selectedMemory.length + 1;
    const newMemoryItem = { ...memory, instanceId };
    setSelectedMemory((prevMemory) => [...prevMemory, newMemoryItem]);
    localStorage.setItem('selectedMemory', JSON.stringify([...selectedMemory, memory]));
  };

  // New memory[] state for clearing specific RAM component
  const clearSelectedMemory = (memory) => {
    setSelectedMemory((prevMemory) =>
      prevMemory.filter(memoryToDelete => memoryToDelete.instanceId !== memory.instanceId)
    );
    localStorage.setItem('selectedMemory', JSON.stringify(selectedMemory.filter(memoryToDelete => memoryToDelete.instanceId !== memory.instanceId)));
  };

  // New storage[] state for adding specific storage components
  const updateSelectedStorage = (storage) => {
    const instanceId = selectedStorage.length + 1;
    const newStorageItem = { ...storage, instanceId };
    setSelectedStorage((prevStorage) => [...prevStorage, newStorageItem]);
    localStorage.setItem('selectedStorage', JSON.stringify([...selectedStorage, storage]));
  };

  // New storage[] state for clearing specific storage components
  const clearSelectedStorage = (storage) => {
    setSelectedStorage((prevStorage) =>
      prevStorage.filter(storageToDelete => storageToDelete.instanceId !== storage.instanceId)
    );
    localStorage.setItem('selectedStorage', JSON.stringify(selectedStorage.filter(storageToDelete => storageToDelete.instanceId !== storage.instanceId)));
  };

  const updateSelectedVideoCard = (gpu) => {
    setSelectedVideoCard(gpu);
    localStorage.setItem('selectedVideoCard', JSON.stringify(gpu));
  }

  const clearSelectedVideoCard = () => {
    setSelectedVideoCard(null);
    setVideoStatus(null);
    localStorage.removeItem('selectedVideoCard');
  }

  const updateSelectedCPUCooler = (cooler) => {
    setSelectedCPUCooler(cooler);
    localStorage.setItem('selectedCPUCooler', JSON.stringify(cooler));
  }

  const clearSelectedCPUCooler = () => {
    setSelectedCPUCooler(null);
    setCoolerStatus(null);
    localStorage.removeItem('selectedCPUCooler');
  }

  const updateSelectedPowerSupply = (psu) => {
    setSelectedPowerSupply(psu);
    localStorage.setItem('selectedPowerSupply', JSON.stringify(psu));
  }

  const clearSelectedPowerSupply = () => {
    setSelectedPowerSupply(null);
    setPowerStatus(null);
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
        totalWattage, setTotalWattage, compatibilityStatus, setCompatibilityStatus,
        socketStatus, setSocketStatus, coolerStatus, setCoolerStatus, memoryStatus,
        setMemoryStatus, videoStatus, setVideoStatus, powerStatus, setPowerStatus,
        slotStatus, setSlotStatus,
      }}>
      {children}
    </SharedDataContext.Provider>
  );
}

export function useSharedData() {
  return useContext(SharedDataContext);
}
