'use client'

import useBuildStore from "@/lib/useBuildStore"
import { COMPATIBILITY_STATUS as STATUS } from ".";
import { calculateTotalWattage } from "./build-summary";

export const usePowerTest = () => {
  const { cpu, motherboard, memory, storage,
    videoCard, cpuCooler, powerSupply } = useBuildStore.getState();

  if (!powerSupply.Part) return STATUS.DEFAULT; // Tests unavailable if PSU DNE in build

  const totalWattage = calculateTotalWattage(
    { cpu, motherboard, memory, storage, videoCard, cpuCooler }
  );
  // Ideal for PSU to provide surplus wattage to the build (~25%)
  const requiredHeadroom = totalWattage * 1.25

  if (totalWattage > powerSupply.wattage) {
    return STATUS.INCOMPATIBLE; // PSU wattage below build's total wattage
  } else if (requiredHeadroom <= powerSupply.wattage) {
    return STATUS.COMPATIBLE;
  } else {
    return STATUS.ISSUE; // PSU exceeds total wattage but lacks headroom
  }
};