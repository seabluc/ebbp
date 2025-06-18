'use client'

import useBuildStore from "@/lib/useBuildStore"
import { COMPATIBILITY_STATUS as STATUS } from ".";

export const useSocketTest = () => {
  const { cpu, motherboard, cpuCooler } = useBuildStore.getState();

  // Helper for socket compatibility w/ CPU Cooler
  function isCompatible(cooler, socket) {
    return cooler?.CpuCoolerSockets.some(({ socket: s }) => s === socket);
  }

  // Check if build has a Motherboard, CPU, and CPU Cooler
  if (motherboard.Part && cpu.Part && cpuCooler.Part) {
    // Check socket compatibility between Motherboard, CPU, and CPU Cooler 
    return (motherboard.socket !== cpu.socket ||
      !isCompatible(cpuCooler, cpu.socket) ||
      !isCompatible(cpuCooler, motherboard.socket)
    ) ? STATUS.INCOMPATIBLE : STATUS.COMPATIBLE;
  }

  // Check if build has a Motherboard and CPU (and no CPU Cooler)
  if (motherboard.Part && cpu.Part) {
    // Check socket compatibility between Motherboard and CPU
    return (motherboard.socket !== cpu.socket) ?
      STATUS.INCOMPATIBLE : STATUS.COMPATIBLE
  }

  // Check if build has a Motherboard and CPU Cooler (and no CPU)
  if (motherboard.Part && cpuCooler.Part) {
    // Check socket compatibility between Motherboard and CPU Cooler
    return (!isCompatible(cpuCooler, motherboard.socket)) ?
      STATUS.INCOMPATIBLE : STATUS.COMPATIBLE
  }

  // Check if build has a CPU and CPU Cooler (and no Motherboard)
  if (cpu.Part && cpuCooler.Part) {
    return (!isCompatible(cpuCooler, cpu.socket)) ?
      STATUS.INCOMPATIBLE : STATUS.COMPATIBLE
  }

  // No PC parts to check for socket compatibility
  return STATUS.DEFAULT;
};