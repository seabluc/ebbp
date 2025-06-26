'use client'

import useBuildStore from "@/lib/useBuildStore"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, Zap, ZapOff } from "lucide-react";

export function calculateTotalWattage({ cpu, motherboard, memory, storage, videoCard, cpuCooler }) {
  let totalWattage = 0;
  if (cpu?.part) {
    if (cpu.maxTurboPower) totalWattage += cpu.maxTurboPower;
    else if (cpu.integrated === 'None') totalWattage += cpu.tdp;
    else totalWattage += Math.ceil(cpu.tdp + (cpu.tdp * 0.35));
  }
  if (motherboard?.part) {
    switch (motherboard.formFactor) {
      case 'EATX': totalWattage += 100; break;
      case 'ATX': totalWattage += 70; break;
      case 'MATX': totalWattage += 60; break;
      case 'ITX': totalWattage += 30; break;
    }
  }
  if (memory?.length > 0) {
    let memoryCount = 0;
    memory.forEach((module) => memoryCount += module.capacity);
    totalWattage += Math.ceil((memoryCount / 8) * 7.75);
  }
  if (storage?.length > 0) {
    totalWattage += storage.length * 15;
  }
  if (videoCard?.part) {
    totalWattage += videoCard.tdp;
  }
  if (cpuCooler?.part) {
    totalWattage += cpuCooler.radiatorSize ? 15 : 10;
  }
  return totalWattage;
}

export const Wattage = () => {
  const { cpu, motherboard, memory, storage, videoCard, cpuCooler } = useBuildStore();
  const totalWattage = calculateTotalWattage({ cpu, motherboard, memory, storage, videoCard, cpuCooler });
  const wattageIcon = totalWattage > 0;

  return (
    <div className="px-4 py-2 md:py-3 flex items-center justify-start md:justify-center whitespace-nowrap">
      <div className="flex items-center gap-2 text-base text-black">
        {wattageIcon ? <Zap size={19} className="min-w-[19px] min-h-[19px]" /> : <ZapOff size={19} className="min-w-[19px] min-h-[19px]" />}
        Total Wattage: {totalWattage} W
      </div>
    </div>
  );
};

export const CompatibilityAudit = () => {
  const { cpu, motherboard, memory, storage,
    videoCard, cpuCooler, powerSupply } = useBuildStore();

  const totalWattage = calculateTotalWattage({
    cpu, motherboard, memory,
    storage, videoCard, cpuCooler
  });

  let cpuGraphics = 'Graphics: Select either a video card or a CPU with integrated graphics to enable display output.'
  let cpuSockets = 'Socket: Select a CPU, motherboard, and CPU cooler that all share the same socket type for compatibility.'
  let cpuCooling = 'Cooling: Select a CPU Cooler that has the same socket type as the CPU and motherboard.'
  let memoryType = "Memory (DDR type): Select a motherboard and memory with the same memory type (DDR4 or DDR5). Ensure the CPU's maximum supported memory capacity matches the motherboard's limit, and never exceed this total with the installed memory."
  let memorySpeed = "Memory (RAM speed support): When selecting your memory, make sure your motherboard supports its speed."
  let memorySlots = 'Memory (DIMM slots): When selecting memory modules and storage devices, make sure they fit within the available slots on your chosen motherboard.'
  let storageM2Slots = 'Storage (M.2 M-Key slots): When selecting memory modules and storage devices, make sure they fit within the available slots on your chosen motherboard.'
  let storageSATASlots = 'Storage (SATA slots): When selecting memory modules and storage devices, make sure they fit within the available slots on your chosen motherboard.'
  let psuStatus = 'Power (Watts): Select a Power Supply Unit (PSU) with at least 25% more wattage than your Total Wattage to ensure sufficient headroom.'

  // ================================== CPU ==================================
  if (cpu.part) {
    // check cpu graphics and video card
    // check if cpu is dedicated
    if (cpu.integrated === 'None') {
      if (videoCard.part) {
        cpuGraphics = 'Graphics: COMPATIBLE - dedicated CPU and video card are selected'; // CONSIDER creating a status object to audit all possibilities. like what happens if theres a dedicated cpu paired with an incompatible mobo socket AND no gpu selected. what would status be? See what i mean?
      } else {
        cpuGraphics = 'Graphics: INCOMPATIBLE - no integrated graphics or video card selected'
      }
    }
    // check if cpu is integrated
    if (cpu.integrated !== 'None') {
      if (videoCard.part) {
        cpuGraphics = 'Graphics: COMPATIBLE - integrated CPU and Video Card selected'
      } else {
        cpuGraphics = "Graphics: COMPATIBLE - integrated CPU but no Video Card selected. Consider using a Video Card to enhance your build's graphical/visual performance"
      }
    }

    // check mobo and cpu sockets
    if (motherboard.part) {
      if (motherboard.socket === cpu.socket) {
        cpuSockets = 'Socket: COMPATIBLE - CPU & Motherboard have identical sockets';
      } else {
        cpuSockets = 'Socket: INCOMPATIBLE - CPU & Motherboard have incompatible sockets';
      }
    } else {
      cpuSockets = 'Socket: INCOMPATIBLE - no Motherboard selected for CPU';
    }
    // check cpu and cpu cooler
    // check if build has a cpuCooler
    if (!cpuCooler.part) {
      // check if cpu comes with a stock cooler
      cpuCooling = (cpu.includedCooler) ?
        'Cooling: COMPATIBLE - CPU comes with stock cooler, ideal for low-end builds. Consider adding a CPU Cooler for more demanding builds'
        : 'Cooling: ISSUE (COMPATIBLE) - CPU does not have stock cooler and no CPU Cooler has been selected in your build. CPU will run, but dont boot your PC without any cooling unless you want to fry your CPU lol'
    }

    // check cpu and cooler sockets
    if (cpuCooler.part) {
      cpuCooling = (cpuCooler.CpuCoolerSockets.some(socket => socket.socket === cpu.socket)) ?
        'Cooling: COMPATIBLE - CPU Cooler and CPU use the same socket' :
        'Cooling: INCOMPATIBLE - CPU Cooler does not support your CPU socket'

      // check if cpu, motherboard, and cpu cooler have compatible sockets
      /*
      if (motherboard.part && cpu.part && cpuCooler.part) {
        cpuSockets = (cpu.socket === motherboard.socket &&
          (cpuCooler.CpuCoolerSockets.some(socket => socket.socket === motherboard.socket))) ?
          'Socket: COMPATIBLE - cpu, cpu cooler, and motherboard all support the same socket' :
          'Socket: INCOMPATIBLE - incompatible sockets'
      }
      */
    }
  }

  // ============================== Motherboard ===============================
  // FIX MotherboardMemorySpeed and Memory/Storage states (can't add Memory/Storage PC parts to build)
  if (motherboard.part) {
    // check Motherboard and CPU Cooler compatibility
    if (cpuCooler.part) {
      cpuSockets = (cpuCooler.CpuCoolerSockets.some(socket => socket.socket === motherboard.socket)) ?
        'Socket: COMPATIBLE - Motherboard supports CPU cooler' :
        "Socket: INCOMPATIBLE - Motherboard does not support the CPU Cooler's sockets"
    }
    // Motherboard and Memory compatibility tests
    if (memory.length > 0) {
      // check for Motherboard and Memory type 
      memoryType = (memory.some(mem => mem.memoryType !== motherboard.memoryType)) ?
        'Memory (DDR type): INCOMPATIBLE - Motherboard & Memory support different DDR types/generations' :
        'Memory (DDR type): COMPATIBLE - Motherboard & Memory have compatible memory types (same DDR type/generation)'

      // check Motherboard and Memory speed compatibility 
      memorySpeed = (memory.every(mem => motherboard.MotherboardMemorySpeeds.some(mms => mms.memorySpeed === `${mem.memoryType}-${mem.speed}`))) ?
        'Memory (RAM speed support): COMPATIBLE - Motherboard supports selected RAM speed(s)' :
        'Memory (RAM speed support): ISSUE (COMPATIBLE) - Motherboard does not support selected RAM speed(s). Build still compatible, but may be suboptimal.'

      // check for available Memory slots
      const memoryModulesCount = memory.reduce((total, mem) => total + mem.modules, 0);
      memorySlots = (memoryModulesCount > motherboard.memorySlot) ?
        "Memory (DIMM slots): INCOMPATIBLE - Memory modules count exceeds Motherboard's DIMM slots. Either choose a Motherboard with more slots or decrease memory module count" :
        'Memory (DIMM slots): COMPATIBLE - Motherboard provides enough DIMM slots for your build'
    }

    // Motherboard and Storage compatibility tests
    if (storage.length > 0) {
      // check for available M.2 storage slots
      const storageM2Count = storage.reduce((total, devices) => total + (devices.nvme === 1 ? 1 : 0), 0);
      storageM2Slots = (storageM2Count > motherboard.mTwoSlot) ?
        "Storage (M.2 M-Key slots): INCOMPATIBLE - # of M.2 Storage devices (SSDs) exceeds Motherboard's available M.2 M-Key slots" :
        'Storage (M.2 M-Key slots): COMPATIBLE - Motherboard provides enough M2 key slots for build'

      // check for SATA storage slots
      const storageSATACount = storage.reduce((total, devices) => total + (devices.interface === 'SATA 6.0 Gb/s' ? 1 : 0), 0);
      storageSATASlots = (storageSATACount > motherboard.sataSlot) ?
        "Storage (SATA slots): INCOMPATIBLE - # of SATA Storage devices exceeds Motherboard's SATA slots" :
        'Storage (SATA slots): COMPATIBLE - Motherboard provides enough SATA slots for build'
    }
  }

  // =========================== Power Supply Unit ============================
  if (powerSupply.part) {
    const requiredHeadroom = totalWattage * 1.25;
    if (totalWattage > powerSupply.wattage) {
      psuStatus = 'Power (Watts): INCOMPATIBLE - PSU does not provide enough wattage for your current build';
    } else if (requiredHeadroom <= powerSupply.wattage) {
      psuStatus = 'Power (Watts): COMPATIBLE - PSU provides sufficient wattage for your current build';
    } else {
      psuStatus = 'Power (Watts): ISSUE (COMPATIBLE) - PSU exceeds total wattage, but does not meet 25% extra headroom';
    }
  }

  return (
    <Collapsible className="w-full md:max-w-7xl px-4 md:px-0 flex flex-col gap-2" defaultOpen>
      <div className="flex items-center justify-start gap-4">
        <h2 className="text-lg font-medium">
          Build Audit
        </h2>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
            <span className="sr-only">Toggle Build Audit</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mb-4 md:mb-12 flex flex-col gap-2 text-base">
        <div className="border md:border-gray-200 dark:border-gray-200/50 p-1.5 md:px-2 md:py-2">
          {cpuGraphics}
        </div>
        <div className="border md:border-gray-200 md:dark:border-gray-200/50 p-1.5 md:px-2 md:py-2">
          {cpuSockets}
        </div>
        <div className="border md:border-gray-200 md:dark:border-gray-200/50 p-1.5 md:px-2 md:py-2">
          {cpuCooling}
        </div>
        <div className="border md:border-gray-200 md:dark:border-gray-200/50 p-1.5 md:px-2 md:py-2">
          {memoryType}
        </div>
        <div className="border md:border-gray-200 md:dark:border-gray-200/50 p-1.5 md:px-2 md:py-2">
          {memorySpeed}
        </div>
        <div className="border md:border-gray-200 md:dark:border-gray-200/50 p-1.5 md:px-2 md:py-2">
          {memorySlots}
        </div>
        <div className="border md:border-gray-200 md:dark:border-gray-200/50 p-1.5 md:px-2 md:py-2">
          {storageM2Slots}
        </div>
        <div className="border md:border-gray-200 md:dark:border-gray-200/50 p-1.5 md:px-2 md:py-2">
          {storageSATASlots}
        </div>
        <div className="border md:border-gray-200 md:dark:border-gray-200/50 p-1.5 md:px-2 md:py-2">
          {psuStatus}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
