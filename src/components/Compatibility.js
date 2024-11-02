"use client"
import { useSharedData } from '@/context/SharedDataContext';
import { useEffect, useState } from 'react';
import ThumbsUpIcon from '../../public/thumbs-up.svg';
import ThumbsDownIcon from "../../public/thumbs-down.svg";
import HelpIcon from "../../public/help-circle.svg";
import Image from "next/image";
import { Navbar, NavbarContent, NavbarItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Tooltip } from "@nextui-org/react";

export const Compatibility = () => {
  const { selectedCPU, clearSelectedCPU,
    selectedMotherboard, clearSelectedMotherboard,
    selectedMemory, clearSelectedMemory,
    selectedStorage, clearSelectedStorage,
    selectedVideoCard, clearSelectedVideoCard,
    selectedPowerSupply, clearSelectedPowerSupply,
    selectedCPUCooler, clearSelectedCPUCooler,
    compatibilityStatus, setCompatibilityStatus, totalWattage,
    socketStatus, setSocketStatus, memoryStatus, setMemoryStatus, coolerStatus,
    setCoolerStatus, videoStatus, setVideoStatus, powerStatus, setPowerStatus } = useSharedData();
  //const [moboSlots, setMoboSlots] = useState(0);
  //const [memoryStatus, setMemoryStatus] = useState(null);
  //const [memorySlots, setMemorySlots] = useState(0);
  //const [storageSATASlots, setStorageSATASlots] = useState(0);
  //const [storageMTwoSlots, setStorageMTwoSlots] = useState(0);
  //const [totalPrice, setTotalPrice] = useState(0);

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
      if (selectedCPU.cpuSocket === selectedMotherboard.motherboardSocket) {
        if (selectedCPUCooler.supportedSockets.includes(selectedCPU.cpuSocket)) {
          setCompatibilityStatus('Good');
          setCoolerStatus('Compatible'); // cooler socket
        } else {
          setCompatibilityStatus('Bad');
          setCoolerStatus('Incompatible'); // cooler socket
        }
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
        }
      } else {
        setCompatibilityStatus('Good');
        setVideoStatus('Issue2'); // Video card selected, but no CPU selected
      }
    };

    const checkMemory = () => {
      if (selectedMemory.memoryType === selectedMotherboard.motherboardMemoryType) {
        setCompatibilityStatus('Good');
        setMemoryStatus('Compatible'); // COMP - RAM & Mobo DDR gen. Check for memory limits SOOONNNN 
      } else {
        setCompatibilityStatus('Bad');
        setMemoryStatus('Incompatible1'); // INCOMP - Mobo doesn't support DDR# type
      }
      /* Develop upon further db configing MotherboardMemorySpeeds
      if (mobo.supportedSpeeds.includes(`${memory.memoryType}-${memory.speed}`)) {
        setCompatibilityStatus('Bad'); // ISSUE - Mobo doesn't support RAM speed
      }
      */
    };

    /* Develop upon further db configing MotherboardMTwoSlots
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
          setMemoryStatus('Issue'); // ISSUE - not rly minmaxing on CPU and Mobo space
        }
      } // CPU, Mobo, and Memory have not been selected yet
    };
    */
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
        setCompatibilityStatus('Issue');
        setPowerStatus('Issue'); // ISSUE - PSU exceeds total wattage, but does not meet 25% extra headroom.
      }
    };

    const compatibilityColor = () => {
      if (!selectedCPU && !selectedMotherboard && !selectedMemory && !selectedStorage
        && !selectedVideoCard && !selectedCPUCooler && !selectedPowerSupply) {
        setCompatibilityStatus("None");
      }
    };
    compatibilityColor();

    if (selectedCPU || selectedVideoCard) {
      checkIntegrated();
    }

    if (selectedCPU && selectedMotherboard) {
      checkSocket();
    }

    if (selectedCPUCooler) {
      if (selectedCPU && selectedMotherboard) {
        checkCoolerSocket();
      }
    }

    if (selectedMemory && selectedMotherboard) {
      checkMemory();
    }
    if (selectedPowerSupply) {
      checkWattage();
    }
  }, [selectedCPU, selectedMotherboard, selectedMemory, selectedStorage,
    selectedVideoCard, selectedCPUCooler, selectedPowerSupply, totalWattage,
    compatibilityStatus, setCompatibilityStatus, socketStatus, memoryStatus,
    coolerStatus, videoStatus, powerStatus]);

  const icon = compatibilityStatus === 'Bad' ?
    <Tooltip offset={0} className="opacity-90 bg-opacity-50" content="Incompatibilities or issues detected. See notes for details">
      <Image src={ThumbsDownIcon} alt="👎" className="ml-1" />
    </Tooltip> :
    compatibilityStatus === 'None' ?
      <Tooltip offset={0} className="opacity-90 bg-opacity-50" content="Select PC components to check compatibility">
        <Image src={HelpIcon} alt="❓" className="ml-1" />
      </Tooltip> :
      <Tooltip offset={0} className="opacity-90 bg-opacity-50" content="No issues or incompatibilities found. See notes for details">
        <Image src={ThumbsUpIcon} alt="👍" className="ml-1" />
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
          <span className="text-gray-500"> {selectedCPU?.cpuSocket || ''}</span>
        </DropdownItem> :
        <DropdownItem
          key="socket"
          description="Select a CPU, motherboard, and CPU cooler that all share the same socket type for compatibility.">Socket:
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
        description='Selected CPU Cooler is incompatible with CPU & Mobo socket.'>CPU Cooling:
        <span className="text-red-500"> </span>
      </DropdownItem> :
      coolerStatus === 'Issue' ?
        <DropdownItem
          key="cooler"
          description='CPU Cooler.'>CPU Cooling:
          <span className="text-gray-500"> </span>
        </DropdownItem> :
        <DropdownItem
          key="cooler"
          description="Select a CPU Cooler that has the same socket type as the CPU and motherboard.">CPU Cooling:
        </DropdownItem>;

  const memoryStatusInfo = memoryStatus === 'Compatible' ?
    <DropdownItem
      key="memory"
      description="The selected RAM's memory type (DDR generation) is compatible with the motherboard, and its capacity is within the maximum supported by both the CPU and motherboard.">Memory:
      <span className="text-green-600"> {selectedMemory?.memoryType || ''}</span>
    </DropdownItem> :
    memoryStatus === 'Incompatible1' ?
      <DropdownItem
        key="memory"
        description="The selected RAM's memory type (DDR generation) is not supported by the motherboard.">Memory:
        <span className="text-red-500"> RAM: {selectedMemory?.memoryType || ''} &</span>
        <span className="text-red-500"> Motherboard: {selectedMotherboard?.motherboardMemoryType || ''}</span>
      </DropdownItem> :
      memoryStatus === 'Incompatible2' ?
        <DropdownItem
          key="memory"
          description="RAM's overall capacity surpasses the maximum supported by both the CPU and motherboard.">Memory:
        </DropdownItem> :
        memoryStatus === 'Issue' ?
          <DropdownItem
            key="memory"
            description="CPU and motherboard are compatible; however, the CPU's maximum supported memory exceeds the motherboard's capacity. Not fully utilizing CPU's memory potential.">Memory:
          </DropdownItem> :
          <DropdownItem
            key="memory"
            description="Select a motherboard and memory with the same memory type (DDR4 or DDR5). Ensure the CPU's maximum supported memory capacity matches the motherboard's limit, and never exceed this total with the installed memory.">Memory:
          </DropdownItem>;

  const videoStatusInfo = videoStatus === 'Compatible1' ?
    <DropdownItem
      key="video"
      description="The selected CPU lacks integrated graphics, but a video card has been chosen to provide display output enhanced graphics performance.">Video:
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
              <span className="text-gray-500"> {selectedVideoCard?.chipset || ''}</span>
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
          <span className="text-gray-500"> {selectedPowerSupply?.wattage + 'W' || ''}</span>
        </DropdownItem> :
        <DropdownItem
          key="power_supply"
          description="Select a Power Supply Unit (PSU) with at least 25% more wattage than your Total Wattage to ensure sufficient headroom.">Power Supply:
        </DropdownItem>;

  return (
    <Navbar className="bg-inherit h-10 rounded-bl-lg">
      <NavbarContent>
        <NavbarItem className="flex items-center h-auto">
          <p className="flex font-semibold text-sm">
            Compatibility Status: {icon}
          </p>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="flex p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
              ><span className="text-sm underline text-default-600 transition-colors hover:text-default-500">See notes</span>
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Compatibility:"
            className="w-[340px]">
            {socketStatusInfo}
            {memoryStatusInfo}
            {coolerStatusInfo}
            {videoStatusInfo}
            {powerStatusInfo}
            {/*
            <DropdownItem
              key="storage"
              description="Motherboard provides appropriate slots/interfaces for selected storage type."
            >
              Storage: {selectedStorage?.formFactor || '-'} {selectedStorage?.storageType || "-"}
            </DropdownItem>
            <DropdownItem
              key="graphics"
              description="Motherboard has an available x16 expansion slot and CPU supports 16 PCIe lanes."
            >
              Video Card: {selectedVideoCard?.memoryType || '-'} {selectedVideoCard?.memory || '-'}
            </DropdownItem>
            */}
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