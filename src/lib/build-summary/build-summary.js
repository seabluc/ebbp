'use client'

import { useState } from "react"
import useBuildStore from "@/lib/useBuildStore"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, ChevronsDownUp, Zap, ZapOff, ChevronDown, ChevronUp } from "lucide-react";


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

  return (
    <div className="px-4 py-2 md:py-3 flex items-center justify-start md:justify-center whitespace-nowrap">
      <div className="flex items-center gap-2 text-base text-black">
        {totalWattage > 0 ? <Zap size={19} className="min-w-[19px] min-h-[19px]" /> :
          <ZapOff size={19} className="min-w-[19px] min-h-[19px]" />}Total Wattage: {totalWattage} W
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

  // let cpuGraphics = 'Graphics: Select either a video card or a CPU with integrated graphics to enable display output.'
  // let cpuSockets = 'Socket: Select a CPU, motherboard, and CPU cooler that all share the same socket type for compatibility.'
  // let cpuCooling = 'Cooling: Select a CPU Cooler that has the same socket type as the CPU and motherboard.'
  // let memoryType = "Memory (DDR type): Select a motherboard and memory with the same memory type (DDR4 or DDR5). Ensure the CPU's maximum supported memory capacity matches the motherboard's limit, and never exceed this total with the installed memory."
  // let memorySpeed = "Memory (RAM speed support): When selecting your memory, make sure your motherboard supports its speed."
  // let memorySlots = 'Memory (DIMM slots): When selecting memory modules and storage devices, make sure they fit within the available slots on your chosen motherboard.'
  // let storageM2Slots = 'Storage (M.2 M-Key slots): When selecting memory modules and storage devices, make sure they fit within the available slots on your chosen motherboard.'
  // let storageSATASlots = 'Storage (SATA slots): When selecting memory modules and storage devices, make sure they fit within the available slots on your chosen motherboard.'
  // let psuStatus = 'Power (Watts): Select a Power Supply Unit (PSU) with at least 25% more wattage than your Total Wattage to ensure sufficient headroom.'
  let cpuGraphics = 'Select either a video card or a CPU with integrated graphics to enable display output.'
  let cpuSockets = 'Select a CPU, motherboard, and CPU cooler that all share the same socket type for compatibility.'
  let cpuCooling = 'Select a CPU Cooler that has the same socket type as the CPU and motherboard.'
  let memoryType = "Select a motherboard and memory with the same memory type (DDR4 or DDR5). Ensure the CPU's maximum supported memory capacity matches the motherboard's limit, and never exceed this total with the installed memory."
  let memorySpeed = "When selecting your memory, make sure your motherboard supports its speed."
  let memorySlots = 'When selecting memory modules and storage devices, make sure they fit within the available slots on your chosen motherboard.'
  let storageM2Slots = 'When selecting memory modules and storage devices, make sure they fit within the available slots on your chosen motherboard.'
  let storageSATASlots = 'When selecting memory modules and storage devices, make sure they fit within the available slots on your chosen motherboard.'
  let psuStatus = 'Select a Power Supply Unit (PSU) with at least 25% more wattage than your Total Wattage to ensure sufficient headroom.'

  // ================================== CPU ==================================
  if (cpu.part) {
    // check cpu graphics and video card
    // check if cpu is dedicated
    if (cpu.integrated === 'None') {
      if (videoCard.part) {
        cpuGraphics = 'COMPATIBLE - dedicated CPU and video card are selected'; // CONSIDER creating a status object to audit all possibilities. like what happens if theres a dedicated cpu paired with an incompatible mobo socket AND no gpu selected. what would status be? See what i mean?
      } else {
        cpuGraphics = 'INCOMPATIBLE - no integrated graphics or video card selected'
      }
    }
    // check if cpu is integrated
    if (cpu.integrated !== 'None') {
      if (videoCard.part) {
        cpuGraphics = 'COMPATIBLE - integrated CPU and Video Card selected'
      } else {
        cpuGraphics = "COMPATIBLE - integrated CPU but no Video Card selected. Consider using a Video Card to enhance your build's graphical/visual performance"
      }
    }

    // check mobo and cpu sockets
    if (motherboard.part) {
      if (motherboard.socket === cpu.socket) {
        cpuSockets = 'COMPATIBLE - CPU & Motherboard have identical sockets';
      } else {
        cpuSockets = 'INCOMPATIBLE - CPU & Motherboard have incompatible sockets';
      }
    } else {
      cpuSockets = 'INCOMPATIBLE - no Motherboard selected for CPU';
    }
    // check cpu and cpu cooler
    // check if build has a cpuCooler
    if (!cpuCooler.part) {
      // check if cpu comes with a stock cooler
      cpuCooling = (cpu.includedCooler) ?
        'COMPATIBLE - CPU comes with stock cooler, ideal for low-end builds. Consider adding a CPU Cooler for more demanding builds'
        : 'ISSUE (COMPATIBLE) - CPU does not have stock cooler and no CPU Cooler has been selected in your build. CPU will run, but dont boot your PC without any cooling unless you want to fry your CPU lol'
    }

    // check cpu and cooler sockets
    if (cpuCooler.part) {
      cpuCooling = (cpuCooler.CpuCoolerSockets.some(socket => socket.socket === cpu.socket)) ?
        'COMPATIBLE - CPU Cooler and CPU use the same socket' :
        'INCOMPATIBLE - CPU Cooler does not support your CPU socket'

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
        'COMPATIBLE - Motherboard supports CPU cooler' :
        "INCOMPATIBLE - Motherboard does not support the CPU Cooler's sockets"
    }
    // Motherboard and Memory compatibility tests
    if (memory.length > 0) {
      // check for Motherboard and Memory type 
      memoryType = (memory.some(mem => mem.memoryType !== motherboard.memoryType)) ?
        'INCOMPATIBLE - Motherboard & Memory support different DDR types/generations' :
        'COMPATIBLE - Motherboard & Memory have compatible memory types (same DDR type/generation)'

      // check Motherboard and Memory speed compatibility 
      memorySpeed = (memory.every(mem => motherboard.MotherboardMemorySpeeds.some(mms => mms.memorySpeed === `${mem.memoryType}-${mem.speed}`))) ?
        'COMPATIBLE - Motherboard supports selected RAM speed(s)' :
        'ISSUE (COMPATIBLE) - Motherboard does not support selected RAM speed(s). Build still compatible, but may be suboptimal.'

      // check for available Memory slots
      const memoryModulesCount = memory.reduce((total, mem) => total + mem.modules, 0);
      memorySlots = (memoryModulesCount > motherboard.memorySlot) ?
        "INCOMPATIBLE - Memory modules count exceeds Motherboard's DIMM slots. Either choose a Motherboard with more slots or decrease memory module count" :
        'COMPATIBLE - Motherboard provides enough DIMM slots for your build'
    }

    // Motherboard and Storage compatibility tests
    if (storage.length > 0) {
      // check for available M.2 storage slots
      const storageM2Count = storage.reduce((total, devices) => total + (devices.nvme === 1 ? 1 : 0), 0);
      storageM2Slots = (storageM2Count > motherboard.mTwoSlot) ?
        "INCOMPATIBLE - # of M.2 Storage devices (SSDs) exceeds Motherboard's available M.2 M-Key slots" :
        'COMPATIBLE - Motherboard provides enough M2 key slots for build'

      // check for SATA storage slots
      const storageSATACount = storage.reduce((total, devices) => total + (devices.interface === 'SATA 6.0 Gb/s' ? 1 : 0), 0);
      storageSATASlots = (storageSATACount > motherboard.sataSlot) ?
        "INCOMPATIBLE - # of SATA Storage devices exceeds Motherboard's SATA slots" :
        'COMPATIBLE - Motherboard provides enough SATA slots for build'
    }
  }

  // =========================== Power Supply Unit ============================
  if (powerSupply.part) {
    const requiredHeadroom = totalWattage * 1.25;
    if (totalWattage > powerSupply.wattage) {
      psuStatus = 'INCOMPATIBLE - PSU does not provide enough wattage for your current build';
    } else if (requiredHeadroom <= powerSupply.wattage) {
      psuStatus = 'COMPATIBLE - PSU provides sufficient wattage for your current build';
    } else {
      psuStatus = 'ISSUE (COMPATIBLE) - PSU exceeds total wattage, but does not meet 25% extra headroom';
    }
  }

  const [open, setOpen] = useState(true);

  return (
    <div className="w-full md:max-w-7xl px-4 md:p-4 flex flex-col border-2 bg-white dark:bg-black transition-all duration-300 hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_white] dark:hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_gray]">
      <Collapsible
        open={open}
        onOpenChange={setOpen}
      >
        <div className="flex items-center justify-start gap-4 py-1 md:pb-2">
          <h2 className="text-xl md:text-lg font-semibold py-2">
            Build Audit
          </h2>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-6">
              {open ? <ChevronUp /> : <ChevronDown />}
              <span className="sr-only">Toggle Build Audit</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mb-4 flex flex-col gap-2 text-base">
          <div className="border md:border-gray-200 md:dark:border-gray-200/50 p-2 bg-white dark:bg-black transition-all duration-300 hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_white] dark:hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_gray]">
            <span className="font-medium">Graphics: </span>
            {cpuGraphics}
          </div>
          <div className="border md:border-gray-200 md:dark:border-gray-200/50 p-2 bg-white dark:bg-black transition-all duration-300 hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_white] dark:hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_gray]">
            <span className="font-medium">Socket: </span>
            {cpuSockets}
          </div>
          <div className="border md:border-gray-200 md:dark:border-gray-200/50 p-2 bg-white dark:bg-black transition-all duration-300 hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_white] dark:hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_gray]">
            <span className="font-medium">Cooling: </span>
            {cpuCooling}
          </div>
          <div className="border md:border-gray-200 md:dark:border-gray-200/50 p-2 bg-white dark:bg-black transition-all duration-300 hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_white] dark:hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_gray]">
            <span className="font-medium">Memory (DDR type): </span>
            {memoryType}
          </div>
          <div className="border md:border-gray-200 md:dark:border-gray-200/50 p-2 bg-white dark:bg-black transition-all duration-300 hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_white] dark:hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_gray]">
            <span className="font-medium">Memory (RAM speed support): </span>
            {memorySpeed}
          </div>
          <div className="border md:border-gray-200 md:dark:border-gray-200/50 p-2 bg-white dark:bg-black transition-all duration-300 hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_white] dark:hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_gray]">
            <span className="font-medium">Memory (DIMM slots): </span>
            {memorySlots}
          </div>
          <div className="border md:border-gray-200 md:dark:border-gray-200/50 p-2 bg-white dark:bg-black transition-all duration-300 hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_white] dark:hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_gray]">
            <span className="font-medium">Storage (M.2 M-Key slots): </span>
            {storageM2Slots}
          </div>
          <div className="border md:border-gray-200 md:dark:border-gray-200/50 p-2 bg-white dark:bg-black transition-all duration-300 hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_white] dark:hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_gray]">
            <span className="font-medium">Storage (SATA slots): </span>
            {storageSATASlots}
          </div>
          <div className="border md:border-gray-200 md:dark:border-gray-200/50 p-2 bg-white dark:bg-black transition-all duration-300 hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_white] dark:hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_gray]">
            <span className="font-medium">Power (Watts): </span>
            {psuStatus}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
