'use client'

import useBuildStore from "@/lib/useBuildStore"
import { COMPATIBILITY_STATUS as STATUS } from ".";

export const useGraphicsTest = () => {
  const { cpu, videoCard } = useBuildStore.getState();

  // If a Video Card exists, then the build has graphics enabled
  if (videoCard.part) return STATUS.COMPATIBLE;

  // If the build lacks a Video Card, check if CPU is dedicated or integrated
  else if (cpu.part) {
    return (cpu.integrated === 'None') ? STATUS.INCOMPATIBLE : STATUS.COMPATIBLE;
  }
  else return STATUS.DEFAULT;
};