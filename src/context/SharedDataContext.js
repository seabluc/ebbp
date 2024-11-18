'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SharedDataContext = createContext();

export function SharedDataProvider({ children }) {
  const [selectedCPU, setSelectedCPU] = useState(null);
  const [selectedMotherboard, setSelectedMotherboard] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [selectedVideoCard, setSelectedVideoCard] = useState(null);
  const [selectedCPUCooler, setSelectedCPUCooler] = useState(null);
  const [selectedPowerSupply, setSelectedPowerSupply] = useState(null);
  const [totalWattage, setTotalWattage] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [compatibilityStatus, setCompatibilityStatus] = useState('None');
  const [socketStatus, setSocketStatus] = useState(null);
  const [coolerStatus, setCoolerStatus] = useState(null);
  const [memoryStatus, setMemoryStatus] = useState(null);
  const [videoStatus, setVideoStatus] = useState(null);
  const [powerStatus, setPowerStatus] = useState(null);
  const [slotStatus, setSlotStatus] = useState(null);
  //const [savedBuild, setSavedBuild] = useState([]);
  const [buildName, setBuildName] = useState('');

  /* localStorage handling */
  useEffect(() => {
    const savedCPU = localStorage.getItem('selectedCPU');
    const savedMobo = localStorage.getItem('selectedMotherboard');
    const savedMemory = localStorage.getItem('selectedMemory');
    const savedStorage = localStorage.getItem('selectedStorage');
    const savedVideoCard = localStorage.getItem('selectedVideoCard');
    const savedCooler = localStorage.getItem('selectedCPUCooler');
    const savedPowerSupply = localStorage.getItem('selectedPowerSupply');
    //const savedBuild = localStorage.getItem('savedBuild');
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
    /*
    if (savedBuild) {
      setSavedBuild(JSON.parse(savedBuild));
    }
    */
  }, []);

  const showSavedBuild = (cpu, mobo, mem, storage, gpu, psu, cooler) => {
    clearSelectedCPU();
    clearSelectedMotherboard();
    clearSelectedMemory(mem);
    clearSelectedStorage(storage);
    clearSelectedCPUCooler();
    clearSelectedPowerSupply();
    clearSelectedVideoCard();
    updateSelectedCPU(cpu);
    updateSelectedMotherboard(mobo);
    loadedBuildMemory(mem);
    loadedBuildStorage(storage);
    updateSelectedVideoCard(gpu);
    updateSelectedPowerSupply(psu);
    updateSelectedCPUCooler(cooler);
  };

  {/* Selecting components (/products) and removing components (/workshop) */ }
  const updateSelectedCPU = (cpu) => {
    setSelectedCPU(cpu);
    localStorage.setItem('selectedCPU', JSON.stringify(cpu));
  };
  // when user deselects a CPU in /workshop
  const clearSelectedCPU = () => {
    setSelectedCPU(null);
    setVideoStatus(null);
    setSocketStatus(null);
    if (memoryStatus === 'Incompatible3') {
      setMemoryStatus('None');
    }
    localStorage.removeItem('selectedCPU');
  };

  // when user selects a motherboard in /products/motherboard
  const updateSelectedMotherboard = (mobo) => {
    setSelectedMotherboard(mobo);
    localStorage.setItem('selectedMotherboard', JSON.stringify(mobo));
  };

  // when user deselects a motherboard in /workshop
  const clearSelectedMotherboard = () => {
    setSelectedMotherboard(null);
    setSocketStatus(null);
    setMemoryStatus(null);
    setSlotStatus(null);
    localStorage.removeItem('selectedMotherboard');
  }

  // when user selects a RAM module kit in /products/memory
  const updateSelectedMemory = (memory) => {
    const instanceId = uuidv4();
    const newMemoryItem = { ...memory, instanceId };
    setSelectedMemory((prevMemory) => [...prevMemory, newMemoryItem]);
    localStorage.setItem('selectedMemory', JSON.stringify([...selectedMemory, newMemoryItem]));
  };

  const loadedBuildMemory = (memory) => {
    if (memory.length >= 1) {
      setSelectedMemory(memory);
      localStorage.setItem('selectedMemory', JSON.stringify(memory));
    }
  };

  // when user deselects a RAM module kit in /workshop
  const clearSelectedMemory = (memory) => {
    setSelectedMemory((prevMemory) =>
      prevMemory.filter(memoryToDelete => memoryToDelete.instanceId !== memory.instanceId)
    );
    setMemoryStatus(null);
    setSlotStatus(null);
    localStorage.setItem('selectedMemory', JSON.stringify(selectedMemory.filter(
      memoryToDelete => memoryToDelete.instanceId !== memory.instanceId
    )));
  };

  // when user selects a storage device in /products/storage
  const updateSelectedStorage = (storage) => {
    const instanceId = uuidv4();
    const newStorageItem = { ...storage, instanceId };
    setSelectedStorage((prevStorage) => [...prevStorage, newStorageItem]);
    localStorage.setItem('selectedStorage', JSON.stringify([...selectedStorage, newStorageItem]));
  };

  const loadedBuildStorage = (storage) => {
    if (storage.length >= 1) {
      setSelectedStorage(storage);
      localStorage.setItem('selectedStorage', JSON.stringify(storage));
    }
  };

  // when user deselects a storage device in /workshop
  const clearSelectedStorage = (storage) => {
    setSelectedStorage((prevStorage) =>
      prevStorage.filter(storageToDelete => storageToDelete.instanceId !== storage.instanceId)
    );
    setSlotStatus(null);
    localStorage.setItem('selectedStorage', JSON.stringify(selectedStorage.filter(
      storageToDelete => storageToDelete.instanceId !== storage.instanceId
    )));
  };

  // when user selects a video card in /products/video-card
  const updateSelectedVideoCard = (gpu) => {
    setSelectedVideoCard(gpu);
    localStorage.setItem('selectedVideoCard', JSON.stringify(gpu));
  }

  // when user deselects a video card in /workshop
  const clearSelectedVideoCard = () => {
    setSelectedVideoCard(null);
    setVideoStatus(null);
    localStorage.removeItem('selectedVideoCard');
  }

  // when user selects a CPU cooler in /products/cpu-cooler
  const updateSelectedCPUCooler = (cooler) => {
    setSelectedCPUCooler(cooler);
    localStorage.setItem('selectedCPUCooler', JSON.stringify(cooler));
  }

  // when user deselects a CPU cooler in /workshop
  const clearSelectedCPUCooler = () => {
    setSelectedCPUCooler(null);
    setCoolerStatus(null);
    localStorage.removeItem('selectedCPUCooler');
  }

  // when user selects a storage device in /products/power-supply
  const updateSelectedPowerSupply = (psu) => {
    setSelectedPowerSupply(psu);
    localStorage.setItem('selectedPowerSupply', JSON.stringify(psu));
  }

  // when user deselects a power supply unit in /workshop
  const clearSelectedPowerSupply = () => {
    setSelectedPowerSupply(null);
    setPowerStatus(null);
    localStorage.removeItem('selectedPowerSupply');
  }

  /*
  const clearSavedBuild = () => {
  };
  */
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
        totalWattage, setTotalWattage, totalPrice, setTotalPrice,
        compatibilityStatus, setCompatibilityStatus, socketStatus, setSocketStatus,
        coolerStatus, setCoolerStatus, memoryStatus, setMemoryStatus,
        videoStatus, setVideoStatus, powerStatus, setPowerStatus, slotStatus, setSlotStatus,
        showSavedBuild, loadedBuildMemory, loadedBuildStorage, buildName, setBuildName
      }}>
      {children}
    </SharedDataContext.Provider>
  );
}

export function useSharedData() {
  return useContext(SharedDataContext);
}
