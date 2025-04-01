import { getAllParts } from "./partController";
import { getAllCpus, getCpu } from "./cpuController";
import { getAllMotherboards, getMotherboard } from "./motherboardController";
import { getAllMemory, getMemory } from "./memoryController";
import { getAllStorage, getStorage } from "./storageController";
import { getAllVideoCards, getVideoCard } from "./videoCardController";
import { getAllCpuCoolers, getCpuCooler } from "./cpuCoolerController";
import { getAllPowerSupplies, getPowerSupply } from "./powerSupplyController";

export const productControllers = {
  part: { getAll: getAllParts },
  cpu: { getAll: getAllCpus, getOne: getCpu },
  motherboard: { getAll: getAllMotherboards, getOne: getMotherboard },
  memory: { getAll: getAllMemory, getOne: getMemory },
  storage: { getAll: getAllStorage, getOne: getStorage },
  "video-card": { getAll: getAllVideoCards, getOne: getVideoCard },
  "cpu-cooler": { getAll: getAllCpuCoolers, getOne: getCpuCooler },
  "power-supply": { getAll: getAllPowerSupplies, getOne: getPowerSupply },
};