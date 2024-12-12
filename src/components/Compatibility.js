"use client"
import { useSharedData } from '@/context/SharedDataContext';
import { useEffect } from 'react';
import SmileIcon from '@/../public/smile.svg';
import FrownIcon from '@/../public/frown.svg';
import HelpIcon from "@/../public/help-circle.svg";
import Image from "next/image";
import {
  Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Navbar,
  NavbarContent, NavbarItem, Tooltip
} from "@nextui-org/react";

export const Compatibility = () => {
  const { selectedCPU, selectedMotherboard, selectedMemory, clearSelectedMemory, selectedStorage,
    selectedVideoCard, selectedPowerSupply, selectedCPUCooler, compatibilityStatus,
    setCompatibilityStatus, totalWattage, socketStatus, setSocketStatus, memoryStatus,
    setMemoryStatus, coolerStatus, setCoolerStatus, slotStatus, setSlotStatus,
    videoStatus, setVideoStatus, powerStatus, setPowerStatus, } = useSharedData();
  //const [totalPrice, setTotalPrice] = useState(0);

  // Run all compatibility checks
  useEffect(() => {
    const checkSocket = () => {
      if (selectedCPU.cpuSocket === selectedMotherboard.motherboardSocket) {
        setCompatibilityStatus('Good');
        setSocketStatus('Compatible');
      } else {
        setCompatibilityStatus('Bad');
        setSocketStatus('Incompatible'); // CPU & Mobo sockets do not match
      }
    };

    const checkCoolerSocket = () => {
      if (!selectedCPUCooler.supportedSockets.includes(selectedCPU.cpuSocket) ||
        (!selectedCPUCooler.supportedSockets.includes(selectedMotherboard.motherboardSocket))) {
        setCompatibilityStatus('Bad');
        setCoolerStatus('Incompatible');
      } else {
        setCompatibilityStatus('Good');
        setCoolerStatus('Compatible');
      }
    };

    const checkIntegrated = () => {
      // If CPU is dedicated
      if (selectedCPU) {
        if (selectedCPU.integrated === 'None') {
          if (selectedVideoCard) {
            setCompatibilityStatus('Good');
            setVideoStatus('Compatible1'); // Dedicated CPU and video card is selected
          } else {
            setCompatibilityStatus('Bad');
            setVideoStatus('Incompatible'); // No integrated graphics or video card selected
          }
        }
        // If CPU is integrated
        else if (selectedCPU.integrated !== 'None') {
          if (selectedVideoCard) {
            setCompatibilityStatus('Good');
            setVideoStatus('Compatible2') // Integrated CPU and video card selected
          }
          else if (!selectedVideoCard) {
            setCompatibilityStatus('Good');
            setVideoStatus('Issue1'); // Integrated CPU but no video card selected
          }
        } else {
          setCompatibilityStatus('Good');
          setVideoStatus('Issue2'); // Video card selected, but no CPU selected
        }
      }
    };

    const checkMemory = () => {
      setMemoryStatus('Compatible1'); // Default status to Compatible1 - (DDR gen & mobo supports ram speed)
      // Check for memory speed compatibility
      for (let i = 0; i < selectedMemory.length; i++) {
        const memorySpeed = `${selectedMemory[i].memoryType}-${selectedMemory[i].speed}`;
        if (selectedMotherboard.supportedSpeeds.includes(memorySpeed)) {
          setCompatibilityStatus('Good');
        } else {
          setCompatibilityStatus('Good'); // still compatible tho
          setMemoryStatus('Issue1'); // Speed issue: RAM will likely be downclocked
        }
      }
      // Check for memory type compatibility
      for (let i = 0; i < selectedMemory.length; i++) {
        if (selectedMotherboard.motherboardMemoryType !== selectedMemory[i].memoryType) {
          setMemoryStatus('Incompatible1');
          //memoryStatus = 'Incompatible1'; // Type issue: Mobo doesn't support this DDR type
          setCompatibilityStatus('Bad');
        }
      }
    }

    /* Not MVP - implement soon.
    const checkMemoryCapacity = () => {
      if (selectedCPU && selectedMotherboard && selectedMemory) {
        if (selectedCPU.cpuMemoryMax <= selectedMotherboard.motherboardMemoryMax) {
          if (selectedMemory.capacity <= selectedCPU.cpuMemoryMax) {
            setCompatibilityStatus('Good');
            setMemoryStatus('Compatible');
          } else {
            setCompatibilityStatus('Bad');
            setMemoryStatus('Incompatible2'); // INCOMP - RAM capacity shouldn't exceed CPU's memory limit
          }
        } else {
          setCompatibilityStatus('Issue');
          setMemoryStatus('Issue2'); // ISSUE - not rly minmaxing on CPU and Mobo space
        }
      } // CPU, Mobo, and Memory have not been selected yet
    };
    */

    const checkSlots = () => {
      setSlotStatus('Compatible');
      let totalMemSlots = 0, totalSATASlots = 0, totalMTwoSlots = 0;
      selectedMemory.forEach((memoryItem) => {
        totalMemSlots += memoryItem.modules;
      });
      if (totalMemSlots > selectedMotherboard?.memorySlot) {
        setSlotStatus('Incompatible1'); // selected RAM modules exceeds Mobo's limit
        setCompatibilityStatus('Bad');
      }
      selectedStorage.forEach((storageItem) => {
        if (storageItem.nvme) {
          totalMTwoSlots++;
        } else {
          totalSATASlots++;
        }
      });
      if (totalMTwoSlots > selectedMotherboard?.mTwoSlot) {
        setSlotStatus('Incompatible2'); // selected M.2 storages exceeds Mobo's limit
        setCompatibilityStatus('Bad');
      }
      if (totalSATASlots > selectedMotherboard?.sataSlot) {
        setSlotStatus('Incompatible3'); // selected SATA storages exceeds Mobo's limit
        setCompatibilityStatus('Bad');
      }
    };

    const checkWattage = () => {
      // recommended 25% extra headroom over total wattage
      const requiredHeadroom = totalWattage * 1.25;
      if (totalWattage > selectedPowerSupply.wattage) {
        setCompatibilityStatus('Bad');
        setPowerStatus('Incompatible'); // INCOMP - PSU selected, but wattage is below total wattage
      }
      else if (selectedPowerSupply.wattage >= requiredHeadroom) {
        setCompatibilityStatus('Good');
        setPowerStatus('Compatible');
      } else {
        setCompatibilityStatus('Good');
        setPowerStatus('Issue'); // ISSUE - PSU exceeds total wattage, but does not meet 25% extra headroom.
      }
    };

    const checkCompatibilityStatus = () => {
      if (!selectedCPU && !selectedMotherboard && selectedMemory.length === 0 &&
        selectedStorage.length === 0 && !selectedVideoCard && !selectedCPUCooler
        && !selectedPowerSupply) {
        setCompatibilityStatus("None");
      }
      else if (!selectedCPU && selectedMotherboard && selectedMemory.length === 0 &&
        selectedStorage.length === 0 && !selectedVideoCard && !selectedCPUCooler
        && !selectedPowerSupply) {
        setCompatibilityStatus("None");
      }
      else if (!selectedCPU && !selectedMotherboard && (selectedMemory.length > 0 ||
        selectedStorage.length === 0) && !selectedVideoCard && !selectedCPUCooler
        && !selectedPowerSupply) {
        setCompatibilityStatus("None");
      }
      else if (!selectedCPU && !selectedMotherboard && selectedMemory.length === 0 &&
        selectedStorage.length > 0 && !selectedVideoCard && !selectedCPUCooler
        && !selectedPowerSupply) {
        setCompatibilityStatus("None");
      }
      else if (!selectedCPU && !selectedMotherboard && selectedMemory.length === 0 &&
        selectedStorage.length === 0 && selectedVideoCard && !selectedCPUCooler
        && !selectedPowerSupply) {
        setCompatibilityStatus("None");
      }
      else if (!selectedCPU && !selectedMotherboard && selectedMemory.length === 0 &&
        selectedStorage.length === 0 && !selectedVideoCard && selectedCPUCooler
        && !selectedPowerSupply) {
        setCompatibilityStatus("None");
      }
      else if (!selectedCPU && !selectedMotherboard && selectedMemory.length === 0 &&
        selectedStorage.length === 0 && !selectedVideoCard && !selectedCPUCooler
        && selectedPowerSupply) {
        setCompatibilityStatus("None");
      }
      if ((slotStatus === 'Incompatible1' || slotStatus === 'Incompatible2' || slotStatus == 'Incompatible3')
        || (memoryStatus === 'Incompatible1' || memoryStatus === 'Incompatible2' || memoryStatus === 'Incompatible3')
        || (coolerStatus === 'Incompatible') || (videoStatus === 'Incomnpatible')
        || (powerStatus === 'Incompatible') || (socketStatus === 'Incompatible')) {
        setCompatibilityStatus('Bad'); // if any current statuses are incompatible, maintain 'Bad' compatibility status
      }
    };

    if (selectedCPU || selectedVideoCard) {
      checkIntegrated();
    }

    if (selectedCPU && selectedMotherboard) {
      checkSocket();
    }

    // Check for CPU is compatible with memory based on socket (case where mobo isn't selected)
    if (selectedCPU && selectedMemory) {
      if (selectedCPU.socket === 'LGA1851' || selectedCPU.socket === 'AM5') {
        for (let i = 0; i < selectedMemory.length; i++) {
          if (selectedMemory[i].memoryType === 'DDR4') {
            setCompatibilityStatus('Bad');
            setMemoryStatus('Incompatible3');
          }
        }
      }
    }

    if (selectedCPUCooler && selectedCPU && selectedMotherboard) {
      checkCoolerSocket();
    }

    if (selectedMemory.length >= 1 && selectedMotherboard) {
      checkMemory();
    }

    if (selectedMotherboard && (selectedMemory?.length >= 1 || selectedStorage?.length >= 1)) {
      checkSlots();
    }

    if (selectedPowerSupply) {
      checkWattage();
    }

    checkCompatibilityStatus();
  }, [selectedCPU, selectedMotherboard, selectedMemory, selectedStorage,
    selectedVideoCard, selectedCPUCooler, selectedPowerSupply, totalWattage,
    compatibilityStatus, setCompatibilityStatus, socketStatus, memoryStatus,
    coolerStatus, slotStatus, videoStatus, powerStatus]);

  const icon = compatibilityStatus === 'Bad' ?
    <Tooltip offset={0} className="opacity-90 bg-opacity-50" content="Incompatibilities or issues detected. See notes for details">
      <Image src={FrownIcon} alt="☹" className="ml-1" />
    </Tooltip> :
    compatibilityStatus === 'None' ?
      <Tooltip offset={0} className="opacity-90 bg-opacity-50" content="Select PC components to check compatibility">
        <Image src={HelpIcon} alt="❓" className="ml-1" />
      </Tooltip> :
      <Tooltip offset={0} className="opacity-90 bg-opacity-50" content="No issues or incompatibilities found. See notes for details">
        <Image src={SmileIcon} alt="☺" className="ml-1" />
      </Tooltip>;

  const socketStatusInfo = socketStatus === 'Compatible' ?
    <DropdownItem
      key="socket"
      description='The selected CPU and Motherboard have matching socket types, hence compatible.'>Socket:
      <span className="text-green-600"> {selectedCPU?.cpuSocket || ''}</span>
    </DropdownItem> :
    socketStatus === 'Incompatible' ?
      <DropdownItem
        key="socket"
        description='The selected CPU & Mobo socket types do not match, hence incompatible.'>Socket:
        <span className="text-red-500"> {selectedCPU?.cpuSocket || ''} &</span>
        <span className="text-red-500"> {selectedMotherboard?.motherboardSocket || ''}</span>
      </DropdownItem> :
      socketStatus === 'Issue' ?
        <DropdownItem
          key="socket"
          description='CPU and Motherboard sockets are compatible, but a CPU Cooler has not been selected. Consider choosing one that supports your socket type.'>Socket:
          <span className="text-orange-500"> {selectedCPU?.cpuSocket || ''}</span>
        </DropdownItem> :
        <DropdownItem
          key="socket"
          description="Select a CPU, motherboard, and CPU cooler that all share the same socket type for compatibility.">Socket:
        </DropdownItem>;

  const memoryStatusInfo = memoryStatus === 'Compatible1' ?
    <DropdownItem
      key="memory"
      description={selectedMemory?.length === 1 ? "The selected RAM's memory type (DDR generation) is compatible with the motherboard, and its speed is supported."
        : "The selected RAM's memory type (DDR generation) is compatible with the motherboard, and its speeds are supported."}>Memory:
      <span className="text-green-600"> {(() => {
        for (let i = 0; i < selectedMemory.length; i++) {
          const memorySpeed = `${selectedMemory[i].memoryType}-${selectedMemory[i].speed}`;
          return memorySpeed;
        }
      })()}
      </span>
    </DropdownItem> :
    memoryStatus === 'Incompatible1' ?
      <DropdownItem
        key="memory"
        description="The selected RAM's memory type (DDR generation) is not supported by the motherboard.">Memory:
        <span className="text-red-500"> RAM: {selectedMemory[0]?.memoryType || ''} &</span>
        <span className="text-red-500"> Motherboard: {selectedMotherboard?.motherboardMemoryType || ''}</span>
      </DropdownItem> :
      memoryStatus === 'Incompatible2' ?
        <DropdownItem
          key="memory"
          description="RAM's overall capacity surpasses the maximum supported by both the CPU and motherboard.">Memory:
        </DropdownItem> :
        memoryStatus === 'Incompatible3' ?
          <DropdownItem
            key="memory"
            description="The CPU's socket (LGA1851 or AM5) is not compatible with DDR4 memory.">
            <span className="text-red-500"> CPU socket: {selectedCPU?.socket || ''}</span>
          </DropdownItem> :
          memoryStatus === 'Issue1' ?
            <DropdownItem
              key="memory"
              description="CPU and motherboard are compatible; however, the selected RAM may be downclocked as the motherboard does not support its memory speed.">Memory:
              <span className="text-orange-500">
                {(() => {
                  for (let i = 0; i < selectedMemory.length; i++) {
                    const memorySpeed = `${selectedMemory[i].memoryType}-${selectedMemory[i].speed}`;
                    if (!selectedMotherboard.supportedSpeeds.includes(memorySpeed)) return ` ${memorySpeed}`;
                  }
                })()}
              </span>
            </DropdownItem> :
            <DropdownItem
              key="memory"
              description="Select a motherboard and memory with the same memory type (DDR4 or DDR5). Ensure the CPU's maximum supported memory capacity matches the motherboard's limit, and never exceed this total with the installed memory.">Memory:
            </DropdownItem>;

  const coolerStatusInfo = coolerStatus === 'Compatible' ?
    <DropdownItem
      key="cooler"
      description='The selected CPU Cooler, CPU, and Motherboard have matching socket types, hence compatible.'>CPU Cooling:
      <span className="text-green-600"> {selectedCPU?.cpuSocket || ''}</span>
    </DropdownItem> :
    coolerStatus === 'Incompatible' ?
      <DropdownItem
        key="cooler"
        description='Selected CPU Cooler is incompatible with your CPU and/or Motherboard socket.'>CPU Cooling:
        <span className="text-red-500">
          <div>
            CPU Cooler only supports these sockets:<br />{selectedCPUCooler.supportedSockets.join(', ')}
          </div>
        </span>
      </DropdownItem> :
      coolerStatus === 'Issue' ?
        <DropdownItem
          key="cooler"
          description='CPU Cooler.'>CPU Cooling:
          <span className="text-orange-500"> </span>
        </DropdownItem> :
        <DropdownItem
          key="cooler"
          description="Select a CPU Cooler that has the same socket type as the CPU and motherboard.">CPU Cooling:
        </DropdownItem>;

  const slotStatusInfo = slotStatus === 'Compatible' ?
    <DropdownItem
      key="slot"
      description="The selected motherboard supports the installation of the chosen memory modules and storage devices.">Slots:
      <span className="text-green-600">
        <div className="">Memory slots used: {selectedMemory.length > 0 ? (
          selectedMemory.reduce((sum, memoryItem) => sum + memoryItem.modules, 0)
        ) : 0}/{selectedMotherboard?.memorySlot}
        </div>
        <div className="">SATA slots used: {(() => {
          if (selectedStorage.length >= 1) {
            const sataStorages = selectedStorage.filter((sata) => !sata.nvme);
            return sataStorages.length;
          } else {
            return 0;
          }
        })()}/{selectedMotherboard?.sataSlot}
        </div>
        <div className="">M.2 slots used: {(() => {
          {/* (M.2-2280 [M-key]) */ }
          if (selectedStorage.length >= 1) {
            const nvmeStorages = selectedStorage.filter((nvme) => nvme.nvme);
            return nvmeStorages.length;
          } else {
            return 0;
          }
        })()}/{selectedMotherboard?.mTwoSlot}
        </div>
      </span>
    </DropdownItem> :
    slotStatus === 'Incompatible1' ? // selected RAM modules exceeds Mobo's limit
      <DropdownItem
        key="slot"
        description="The number of RAM modules selected exceeds the available DIMM slots on the motherboard.">Slots:
        <span className="text-red-500">
          <div className="">
            {` Memory slots: ${selectedMotherboard.memorySlot}`}
          </div>
          <div className="">
            Memory slots used: {selectedMemory.reduce((sum, memoryItem) =>
              sum + memoryItem.modules, 0)}
          </div>
        </span>
      </DropdownItem> :
      slotStatus === 'Incompatible2' ? // selected M.2 storages exceeds Mobo's limit
        <DropdownItem
          key="slot"
          description="The number of M.2 storage devices selected exceeds the available M.2 slots on the motherboard.">Slots:
          <span className="text-red-500">
            <div className="">
              {` M.2 slots available: ${selectedMotherboard.mTwoSlot}`}
            </div>
            <div className="">
              M.2 slots used: {(() => {
                if (selectedStorage.length >= 1) {
                  const nvmeStorages = selectedStorage.filter((nvme) => nvme.nvme);
                  return nvmeStorages.length;
                } else {
                  return 0;
                }
              })()}
            </div>
          </span>
        </DropdownItem> :
        slotStatus === 'Incompatible3' ? // selected SATA storages exceeds Mobo's limit
          <DropdownItem
            key="slot"
            description="The number of SATA storage devices selected exceeds the motherboard's available SATA slots.">Slots:
            <span className="text-red-500">
              <div className="">
                {` SATA slots available: ${selectedMotherboard.sataSlot}`}
              </div>
              <div className="">
                SATA slots used: {(() => {
                  if (selectedStorage.length >= 1) {
                    const sataStorages = selectedStorage.filter((sata) => !sata.nvme);
                    return sataStorages.length;
                  } else {
                    return 0;
                  }
                })()}
              </div>
            </span>
          </DropdownItem> :
          <DropdownItem
            key="slot"
            description="When selecting memory modules and storage devices, make sure they fit within the available slots on your chosen motherboard.">Slots:
          </DropdownItem>;

  const videoStatusInfo = videoStatus === 'Compatible1' ?
    <DropdownItem
      key="video"
      description="The selected CPU lacks integrated graphics, but a video card has been chosen to allow display output and enhanced graphics performance.">Video:
      <span className="text-green-600"> {selectedVideoCard?.chipset || ''}</span>
    </DropdownItem> :
    videoStatus === 'Compatible2' ?
      <DropdownItem
        key="video"
        description="The CPU includes integrated graphics, and a video card has been selected for additional graphics performance.">Video:
        <span className="text-green-600"> {selectedCPU?.integrated || ''}, {selectedVideoCard?.chipset || ''}</span>
      </DropdownItem> :
      videoStatus === 'Incompatible' ?
        <DropdownItem
          key="video"
          description="The selected CPU lacks integrated graphics, and no video card has been chosen. Please select a video card to enable display output.">Video:
          <span className="text-red-500"> {selectedCPU?.name || ''}</span>
        </DropdownItem> :
        videoStatus === 'Issue1' ?
          <DropdownItem
            key="video"
            description="The CPU includes integrated graphics, but no video card has been selected. For improved visual performance, consider adding a dedicated video card to your build.">Video:
            <span className="text-green-600"> {selectedCPU?.integrated || ''}</span>
          </DropdownItem> :
          videoStatus === 'Issue2' ?
            <DropdownItem
              key="video"
              description="Video card has been selected with no CPU... who picks out the video card before the CPU?">Video:
              <span className="text-orange-500"> {selectedVideoCard?.chipset || ''}</span>
            </DropdownItem> :
            <DropdownItem
              key="video"
              description="Please select either a video card or a CPU with integrated graphics to enable display output.">Video:
            </DropdownItem>;

  const powerStatusInfo = powerStatus === 'Compatible' ?
    <DropdownItem
      key="power_supply"
      description="The selected Power Supply Unit (PSU) provides adeqate wattage to support all selected components.">Power Supply:
      <span className="text-green-600"> {selectedPowerSupply?.wattage + 'W' || ''}</span>
    </DropdownItem> :
    powerStatus === 'Incompatible' ?
      <DropdownItem
        key="power_supply"
        description="The selected PSU does not provide enough wattage to support all selected components. Consider selecting a PSU with wattage that exceeds your build's Total Wattage.">Power Supply:
        <span className="text-red-500"> {selectedPowerSupply?.wattage + 'W' || ''}</span>
      </DropdownItem> :
      powerStatus === 'Issue' ?
        <DropdownItem
          key="power_supply"
          description="Although the selected PSU exceeds your build's Total Wattage demands, it does so only marginally, putting it at risk of overloading. Consdier choosing a PSU with a higher wattage for additional headroom and stability.">Power Supply:
          <span className="text-orange-500"> {selectedPowerSupply?.wattage + 'W' || ''}</span>
        </DropdownItem> :
        <DropdownItem
          key="power_supply"
          description="Select a Power Supply Unit (PSU) with at least 25% more wattage than your Total Wattage to ensure sufficient headroom.">Power Supply:
        </DropdownItem>;

  return (
    <Navbar className="bg-inherit h-12 rounded-bl-lg">
      <NavbarContent>
        <NavbarItem className="flex items-center h-auto">
          <p className="flex font-semibold text-sm">
            Compatibility Status: {icon}
          </p>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              {
                <Button
                  disableRipple
                  className="flex p-0 bg-transparent data-[hover=true]:bg-transparent"
                  radius="sm"
                  variant="light">
                  <span className="text-sm underline text-default-600 transition-colors hover:text-default-500">See notes</span>
                </Button>
              }
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Compatibility:"
            className="w-[340px]">
            {socketStatusInfo}
            {memoryStatusInfo}
            {coolerStatusInfo}
            {slotStatusInfo}
            {videoStatusInfo}
            {powerStatusInfo}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

export default Compatibility;
{/* add Price related content below everything else (like PcPP)
  <NavbarItem isActive>
    Total Price: ${totalPrice}
  </NavbarItem>
*/}

{ /* @/components/Compatibility.js in useEffect()
  Temporarily putting a pause on Price related stuff
// Calculate total cost of PC components
const cost =
 (parseFloat(selectedCPU?.price) || 0) +
 (parseFloat(selectedMotherboard?.price) || 0) +
 (parseFloat(selectedMemory?.price) || 0) +
 (parseFloat(selectedStorage?.price) || 0) +
 (parseFloat(selectedVideoCard?.price) || 0) +
 (parseFloat(selectedCPUCooler?.price) || 0) +
 (parseFloat(selectedPowerSupply?.price) || 0);

// Update totalPrice state
setTotalPrice(cost);
*/}