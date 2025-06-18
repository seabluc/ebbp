import { useGraphicsTest } from "./graphics-test";
import { useSocketTest } from "./socket-test";
import { useCoolingTest } from "./cooling-test";
import { useMemoryTest } from "./memory-test";
import { useStorageTest } from "./storage-test";
import { usePowerTest } from "./power-test";

export const COMPATIBILITY_STATUS = {
  DEFAULT: 'DEFAULT',
  COMPATIBLE: 'COMPATIBLE',
  ISSUE: 'ISSUE',
  INCOMPATIBLE: 'INCOMPATIBLE',
};

export const BuildTests = {
  graphics: useGraphicsTest,
  socket: useSocketTest,
  cooling: useCoolingTest,
  memory: useMemoryTest,
  storage: useStorageTest,
  power: usePowerTest,
};

export const BuildStatus = {
  graphics: BuildTests.graphics(),
  socket: BuildTests.socket(),
  cooling: BuildTests.cooling(),
  memory: BuildTests.memory(),
  storage: BuildTests.storage(),
  power: BuildTests.power()
};