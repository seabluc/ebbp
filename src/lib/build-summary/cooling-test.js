'use client'

import useBuildStore from "@/lib/useBuildStore"
import { COMPATIBILITY_STATUS as STATUS } from ".";

export const useCoolingTest = () => {
  const { cpu, motherboard, cpuCooler } = useBuildStore.getState();

  // Tests unavailable if build lacks CPU
  if (!cpu.Part) return STATUS.DEFAULT;

  // CPU exists, check if build has compatible CPU cooler
  if (cpuCooler.Part) {
    if (!cpuCooler.CpuCoolerSockets.some(val => val.socket === cpu.socket)) {
      return STATUS.INCOMPATIBLE;
    }
    // If build has Motherboard, check socket compatibility w/ CPU Cooler
    if (motherboard.Part) {
      if (!cpuCooler.CpuCoolerSockets.some(val => val.socket === motherboard.socket)) {
        return STATUS.INCOMPATIBLE;
      }
    }
    // Build has compatible CPU, CPU Cooler, and Motherboard (if selected)
    return STATUS.COMPATIBLE;
  }
  // Build lacks CPU Cooler, check if CPU has stock cooler
  if (cpu.includedCooler !== 0) {
    return STATUS.COMPATIBLE;
  }

  // Build has a CPU with no CPU Cooler nor stock cooler
  return STATUS.ISSUE; // The build POSTs, but never run a PC w/o any cooling
};