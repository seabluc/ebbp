'use client'

import useBuildStore from "@/lib/useBuildStore"
import { COMPATIBILITY_STATUS as STATUS } from ".";

export const useMemoryTest = () => {
  const { /*cpu,*/ motherboard, memory } = useBuildStore.getState();

  // Tests unavailable if Memory/Motherboard DNE in build
  if (memory.length <= 0 || !motherboard.Part) return STATUS.DEFAULT;

  // Check for memory type compatibility
  const mismatchedMemType = memory.some(mem => mem.memoryType !== motherboard.memoryType);
  if (mismatchedMemType) return STATUS.INCOMPATIBLE;

  // Check for Motherboard Memory Speed compatibility
  if (!memory.every(mem => motherboard.MotherboardMemorySpeeds.some(
    mms => mms.memorySpeed === `${mem.memoryType}-${mem.speed}`
  )
  )) {
    return STATUS.ISSUE; // DDR#-#### on all Memory modules do not match Motherboard's supported memory speeds
  }

  // probably create another ISSUE case where if the user has multiple Memory they should be the same speed
  // as having different RAM can cause issues..?

  // Check for Memory slot availability
  const memoryModulesCount = memory.reduce((total, m) => total + m.modules, 0);
  if (memoryModulesCount > motherboard.memorySlot) {
    return STATUS.INCOMPATIBLE;
  }

  return STATUS.COMPATIBLE; // All memory tests passed
};