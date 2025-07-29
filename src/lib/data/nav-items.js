import {
  Cpu,
  CircuitBoard,
  MemoryStick,
  HardDrive,
  Gpu,
  PowerSquare
} from "lucide-react";
import { CpuCooler } from "@/components/Icons";

export const navParts = [
  {
    type: "CPU",
    href: "/products/cpu",
    description: "Explore the latest CPUs designed to boost your PC's performance",
    icon: <Cpu size={40} />
  },
  {
    type: "Motherboard",
    href: "/products/motherboard",
    description: "Find the perfect motherboard for your components",
    icon: <CircuitBoard size={34} />
  },
  {
    type: "Memory",
    href: "/products/memory",
    description: "Choose RAM to boost your PC's speed and handle your computing tasks",
    icon: <MemoryStick size={42} />
  },
  {
    type: "Storage",
    href: "/products/storage",
    description: "Pick a storage device to securely save your data your PC",
    icon: <HardDrive size={34} />
  },
  {
    type: "Video Card",
    href: "/products/video-card",
    description: "Browse powerful video cards to elevate your PC's visuals and boost frame rates",
    icon: <Gpu size={46} />
  },
  {
    type: "CPU Cooler",
    href: "/products/cpu-cooler",
    description: "Prevent your CPU from overheating with sufficient thermal dissipation",
    icon: <CpuCooler size={40} />
  },
  {
    type: "Power Supply Unit",
    href: "/products/power-supply",
    description: "Find a power supply unit to provide your PC with ample wattage",
    icon: <PowerSquare size={42} />
  },
]

export const navPartsMobile = [
  {
    type: "CPU",
    href: "/products/cpu",
    description: "Explore the latest CPUs designed to boost your PC's performance",
    icon: <Cpu size={29} />
  },
  {
    type: "Motherboard",
    href: "/products/motherboard",
    description: "Find the perfect motherboard for your components",
    icon: <CircuitBoard size={30} />
  },
  {
    type: "Memory",
    href: "/products/memory",
    description: "Choose RAM to boost your PC's speed and handle your computing tasks",
    icon: <MemoryStick size={28} />
  },
  {
    type: "Storage",
    href: "/products/storage",
    description: "Pick a storage device to securely save your data your PC",
    icon: <HardDrive size={28} />
  },
  {
    type: "Video Card",
    href: "/products/video-card",
    description: "Browse powerful video cards to elevate your PC's visuals and boost frame rates",
    icon: <Gpu size={28} />
  },
  {
    type: "CPU Cooler",
    href: "/products/cpu-cooler",
    description: "Prevent your CPU from overheating with sufficient thermal dissipation",
    icon: <CpuCooler size={26} />
  },
  {
    type: "Power Supply",
    href: "/products/power-supply",
    description: "Find a power supply unit to provide your PC with ample wattage",
    icon: <PowerSquare size={30} />
  },
]

// export const contactIcons = [
//   {
//     id: 1,
//     img: "/git.svg",
//     alt: "GitHub Logo",
//     link: "https://www.github.com/seabluc"
//   },
//   {
//     id: 2,
//     img: "/email.svg",
//     alt: "Email creator",
//     link: "mailto:seanluc.ghim@gmail.com",
//   }
// ];

export const contributors = [
  {
    id: 1,
    // img: "/git.svg",
    alt: "GitHub Contributor Link",
    name: "khoadtra",
    link: "https://www.github.com/khoadtra"
  },
  {
    id: 2,
    // img: "/git.svg",
    alt: "GitHub Contributor Link",
    name: "ReaganVu29",
    link: "https://www.github.com/ReaganVu29"
  },
  {
    id: 3,
    // img: "/git.svg",
    alt: "GitHub Contributor Link",
    name: "seabluc",
    link: "https://www.github.com/seabluc"
  }
]