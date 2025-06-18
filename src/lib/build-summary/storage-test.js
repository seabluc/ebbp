'use client'

import useBuildStore from "@/lib/useBuildStore"
import { COMPATIBILITY_STATUS as STATUS } from ".";

export const useStorageTest = () => {
  const { motherboard, storage } = useBuildStore.getState();

  // Tests unavailable if Storage/Motherboard DNE in build
  if (storage.length <= 0 || !motherboard.part) return STATUS.DEFAULT;

  // Check for available M.2 storage slots
  const storageM2Count = storage.reduce(
    (total, s) => total + (s.nvme === 1 ? 1 : 0), 0
  );
  if (storageM2Count > motherboard.mTwoSlot) return STATUS.INCOMPATIBLE;

  // Check for SATA storage slots
  const storageSATACount = storage.reduce(
    (total, s) => total + (s.interface === 'SATA 6.0 Gb/s' ? 1 : 0), 0
    //(total, s) => total + (s.interface.toLowerCasse().includes('sata') ? 1 : 0), 0
  );
  if (storageSATACount > motherboard.sataSlot) return STATUS.INCOMPATIBLE;

  return STATUS.COMPATIBLE; // All storage tests passed
};