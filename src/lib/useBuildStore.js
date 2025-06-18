import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useBuildStore = create(
  persist(
    (set) => ({
      cpu: {},
      motherboard: {},
      memory: [],
      storage: [],
      videoCard: {},
      cpuCooler: {},
      powerSupply: {},

      // Setters for individual PC parts
      addCpu: (cpu) => set({ cpu }),
      addMotherboard: (motherboard) => set({ motherboard }),
      addMemory: (module) => set((state) => ({
        memory: [...state.memory, module]
      })),
      addStorage: (drive) => set((state) => ({
        storage: [...state.storage, drive]
      })),
      addVideoCard: (videoCard) => set({ videoCard }),
      addCpuCooler: (cpuCooler) => set({ cpuCooler }),
      addPowerSupply: (powerSupply) => set({ powerSupply }),

      // Delete individual PC parts from build
      removeCpu: () => set({ cpu: {} }),
      removeMotherboard: () => set({ motherboard: {} }),
      removeMemory: (index) => set((state) => ({
        memory: state.memory.filter((_, i) => i !== index),
      })),
      removeStorage: (index) => set((state) => ({
        storage: state.storage.filter((_, i) => i !== index),
      })),
      removeVideoCard: () => set({ videoCard: {} }),
      removeCpuCooler: () => set({ cpuCooler: {} }),
      removePowerSupply: () => set({ powerSupply: {} }),

      // Clear/reset function
      clearBuild: () => set({
        cpu: {},
        motherboard: {},
        memory: [],
        storage: [],
        videoCard: {},
        cpuCooler: {},
        powerSupply: {},
      }),
    }),
    { name: 'build-storage', skipHydration: true }
  )
);

export default useBuildStore;


/* Notes
The term 'store' is commonly used in Zustand and other state management libraries (like Redux)
which refers to the centralized object that holds your applications state.

useBuild is the store for the PC build, which is also a hook
that can be exported and used by other components.

create function contains callback function that returns our state
set function to return all selected PC parts

somewhere in here we handle removeing, remove, and updating a particular PC part
and lastly the logic behind determining compatibility status will likely be here too...

persist the Store using zustand/middle ware like 'perist' to let build survive page reload
zustand works in both Client and Server components, but stores are typicall used in client components
*/