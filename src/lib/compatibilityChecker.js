/*
export const checkSocket = (cpu, mobo) => {
  if (cpu.cpuSocket === mobo.motherboardSocket) {
    if (cooler.supportedSockets.includes(cpu.cpuSocket)) {
      return 'Good'; // COMPATIBLE
    } else {
      return 'Bad' // INCOMPATIBLE (compatible mobo & cpu but incompatible cooler)
    }
  } else {
    return 'Bad' // INCOMPATIBLE mobo and cpu socket
  }
};

export const checkCoolerSocket = (cpu, cooler) => {
  if (cooler.supportedSocket.includes(cpu.cpuSocket)) {
    return 'Good';
  } else {
    return 'Bad';
  }
};

export const checkMemory = (cpu, mobo, ram) => {
  // Check if CPU's maximum supported memory exceeds motherboard's memory limit
  if (cpu.cpuMemoryMax > mobo.motherboardMemoryMax) {
    return 'Bad'; // ISSUE
  }
  // Check if current RAM capacity exceeds cpu's and/or motherboard's limit
  if (ram.capacity > cpu.cpuMemoryMax || ram.capacity > mobo.motherboardMemoryMax) {
    return 'Bad'; // INCOMPATIBLE
  }
  // Check if memory type (DDR4, DDR5) is compatible with motherboard's
  if (ram.memoryType !== mobo.motherboardMemoryType) {
    return 'Bad'; // INCOMPATIBLE
  }
  /*
  // Check if motherboard supports selected ram's speed (DDR#-####)
  if (mobo.supportedSpeeds.includes(`${memory.memoryType}-${memory.speed}`)) {
    return 'Good'; // COMPATIBLE
  } else {
    return 'Bad'; // ISSUE
  }
 
};

export const checkIntegrated = (cpu) => {
  if (cpu.integrated !== 'None') {
    return 'Good' // COMPATIBLE, technically no GPU required for POST
  } else {
    return 'Bad'; // INCOMPATIBLE, user must select a Video Card
  }
}

export const checkWattage = (totalWatts, psu) => {
  if (totalWatts < psu.wattage) {
    return 'Bad'; // INCOMPATIBLE ... technically an issue tho
  }
  // recommended 25% extra headroom over total wattage
  const requiredHeadroom = totalWatts * 1.25;

  if (psu.wattage < requiredHeadroom) {
    return 'Bad'; // ISSUE - PSU wattage sufficient, but lacks 25% headroom
  }
  return 'Good'; // COMPATIBLE
};

export const checkCompatibility = ({ cpu, mobo, ram, storage, gpu, cooler, totalWatts}) => {
   
};
*/