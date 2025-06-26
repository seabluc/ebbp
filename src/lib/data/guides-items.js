import { Cpu, CircuitBoard, MemoryStick, HardDrive, Gpu, PowerSquare } from "lucide-react";
import { CpuCooler } from "@/components/Icons";
import Link from "next/link";

export const guidesItems = [
  {
    id: 1,
    type: 'CPU',
    description: "Think of the CPU as the brain of your computer. It processes instructions and handles all the tasks that make your system responsive and functional. Nothing works without a brain.",
    img: '/ebbp-cpu.png',
    link: '/guides/cpu',
    icon: <Cpu size={29} />,
    topics: [
      {
        id: 'naming',
        label: 'Name Breakdown',
        content: 'BRAND, BRAND/PERFORMANCE LEVEL, SERIES, SUFFIXES, CLOCK SPEED, CORES. | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        href: '/guides/cpu#naming'
      },
      {
        id: 'graphics',
        label: 'Graphics',
        content: 'INTEGRATED OR DEDICATED. | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        href: '/guides/cpu#graphics'
      },
      {
        id: 'socket',
        label: 'Socket',
        content: 'CPU, MOBO, AND YOUR CPU COOLER BETTER HAVE MATCHING SOCKETS. | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        href: '/guides/cpu#socket'
      },
      {
        id: 'cores',
        label: 'Cores',
        content: 'CLOCK SPEED (GHz), CORE COUNT, P-CORE, E-CORE, ETC. | Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        href: '/guides/cpu#cores'
      },
      {
        id: 'microarchitecture',
        label: 'Microarchitecture',
        content: 'not rly that important tbh mostly nonsense ngl. | Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        href: '/guides/cpu#microarchitecture'
      },
    ],
  },
  {
    id: 2,
    type: 'Motherboard',
    description: `Think of the motherboard as the spinal cord of a computer. It connects all your PC parts to the brain (CPU), allowing them to work together. It's just a large circuit board that you plug everything into.`,
    img: '/ebbp-mobo.png',
    link: '/guides/motherboard',
    icon: <CircuitBoard size={30} />,
    topics: [
      {
        id: 'naming',
        label: 'Name Breakdown',
        content: 'BRAND, SERIES/SUB-BRAND, CHIPSET, SUFFIX/MODEL VARIATION, MARKETING LABEL, WIFI (onboard), FORM FACTOR, SOCKET. |  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        href: '/guides/motherboard#naming'
      },
      {
        id: 'socket',
        label: 'Socket',
        content: 'MOBO, CPU, AND YOUR CPU COOLER BETTER HAVE MATCHING SOCKETS. | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        href: '/guides/motherboard#socket'
      },
      {
        id: 'form-factor',
        label: 'Form Factor',
        content: 'NGL THIS IS MOSTLY APPLICABLE TOWARDS CASE COMPATIBILITY, BUT JUST KNOW FOR THE MOST PART LARGER FORM FACTOR = MORE EFFICIENT. | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        href: '/guides/motherboard#form-factor'
      },
      {
        id: 'memory',
        label: 'Memory',
        content: 'MEMORY TYPE, MEMORY CAPACITY, MEMORY SLOTS (DIMM), ETC. | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        href: '/guides/motherboard#memory'
      },
    ],
  },
  {
    id: 3,
    type: 'Memory',
    description: "Think of RAM as your PC's short-term memory. It stores recent and temporary data that your brain (CPU) uses for active tasks, helping your system multitask and run applications more smoothly.",
    img: '/ebbp-memory.png',
    link: '/guides/memory',
    icon: <MemoryStick size={28} />,
    topics: [
      {
        id: 'naming',
        label: 'Name Breakdown',
        content: 'BRAND NAME, BRAND SERIES, CAPACITY (GB), MODULE COUNT, MEMORY TYPE-MEMORYSPEED (MHz or MT/s), CAS LATENCY. | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        href: '/guides/memory#naming'
      },
      {
        id: 'what-makes-a-ram-good',
        label: 'What Makes a RAM Good?',
        content: 'CAPACITY IS NICE, BIGGER SPEED IS NICE, SMALLER CAS LATENCY IS NICE. | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        href: '/guides/memory#what-makes-a-ram-good'
      },
      {
        id: 'work-with-your-mobo',
        label: 'Work With Your Mobo',
        content: "DOES YOUR MOTHERBOARD SUPPORT YOUR RAM'S SPEED? DOES YOUR MEMORY MODULE COUNT EXCEED THE MOBO'S AVAILABLE MEMORY SLOTS? ARE THEY EVEN THE SAME FORM FACTOR (DIMM)? DOES YOUR TOTAL MEMORY CAPACITY EXCEED YOUR MOBO'S (and CPU's)? DOES YOUR MOTHERBOARD SUPPORT YOUR RAM'S MEMORY TYPE (DDR#)? | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        href: '/guides/memory#work-with-your-mobo'
      },
    ],
  },
  {
    id: 4,
    type: 'Storage',
    description: "Storage is your PC's long-term memory. It holds everything your system needs to boot and run — from the operating system to your games, files, and software. Storage devices come in different forms, like SSDs and HDDs, but all serve the same purpose: keeping your data safe and accessible even when the PC is powered off.",
    img: '/ebbp-ssd.png',
    link: '/guides/storage',
    icon: <HardDrive size={28} />,
    topics: [
      {
        id: 'naming',
        label: 'Name Breakdown',
        content: "BRAND, SERIES, CAPACITY, INTERFACE, ETC. | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        href: '/guides/storage#naming'
      },
      {
        id: 'hdd',
        label: 'Hard Disk Drive',
        content: "MECHANICAL/MOVING PARTS. PRONE TO FAILURE. SLOWER. SOMEWHAT CHEAPER. MOSTLY DISCONTINUED BY MANUFACTURERS. IT KINDA BAD. | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        href: '/guides/storage#hdd'
      },
      {
        id: 'ssd',
        label: 'Solid State Drive',
        content: "NO MOVING PARTS. FAST (INSTANTANEOUS DATA RETRIEVAL VIA FLASH MEMORY [NAND FLASH]). SLIGHTLY MORE EXPENSIVE PER GB. FORM FACTORS: SATA SSDs & M.2 SSDs (SATA or NVMe) |  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        href: '/guides/storage#ssd'
      },
      {
        id: 'nvme',
        label: 'NVMe',
        content: "SSD, TAKES ON THE M.2 FORM FACTOR. NVMe DIMENSIONS (2260, 2280, etc.) GOES IN M.2 M-KEY SLOT IN MOBO. EXTREMELY FAST, VERY SMALL. THE BEST STORAGE OPTION. |  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        href: '/guides/storage#nvme'
      },
      {
        id: 'endurance',
        label: 'Endurance',
        content: "DURABILITY OF STORAGE (# OF TIMES NAND FLASH CELLS IN AN SSD CAN BE WRITTEN AND ERASED BEFORE THEY WEAR OUT). STORAGE DEVICE CAN ONLY WRITE A LIMITED AMOUNT OF DATA. SINCE ENDURANCE = NAND FLASH ONLY APPLICABLE TO SSD/NVMe. DONT WORRY HDD HAVE AN ENDURANCE METRIC OF THEIR OWN (they're physical)... |  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        href: '/guides/storage#endurance'
      },
    ],
  },
  {
    id: 5,
    type: 'Video Card',
    description: "The video card (or GPU) lets you see stuff. It's responsible for rendering every pixel on your screen. The better the GPU, the better the graphics, which is why gamers go crazy for them.",
    img: '/ebbp-video-card.png',
    link: '/guides/video-card',
    icon: <Gpu size={28} />,
    topics: [
      {
        id: 'naming',
        label: 'Name Breakdown',
        content: "BRAND, SERIES?, CHIPSET, GRAPHICS MEMORY TYPE (GDDR#), VRAM (GB). | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        href: '/guides/video-card#naming'
      },
      {
        id: 'do-i-really-need-one',
        label: 'Do I Really Need One?',
        content: "IF YOUR CPU IS INTEGRATED AND YOU NEVER INTEND ON PLAYING ANY DEMANDING GAMES THEN NO. SAVE MONEY... unless you're trying to ⛏️ | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        href: '/guides/video-card#do-i-really-need-one'
      },
      {
        id: 'choosing-the-right-gpu',
        label: 'Choosing the Right GPU',
        content: "IF UR A GAMER AND UR RICH THEN U NEED ALL THE FIREPOWER TO SUPPORT THE FRAMES AND HZ UR 4K MONITOR DEMANDS. DOUBLE CHECK DIMENSIONS IF YOU INTEND ON GETTING A 3-FAN GPU FOR AN MINI-ITX BUILD... GPU TAKES UP A LOT OF PCIE LANES, MAKE SURE YOUR MOBO CAN SUPPORT IT ALONG WITH OTHER PC PARTS THAT NEED SOME LANES TOO (i.e NVMe). | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        href: '/guides/video-card#choosing-the-right-gpu'
      },
    ],
  },
  {
    id: 6,
    type: 'CPU Cooler',
    description: "The CPU generates heat, and it can get very hot. To keep your brain (CPU) from frying, a CPU cooler is essential. It's especially important if you plan on overclocking, as it helps maintain stable performance during heavy workloads.",
    img: '/ebbp-air-cooler.png',
    link: '/guides/cpu-cooler',
    icon: <CpuCooler size={26} />,
    topics: [
      {
        id: 'naming',
        label: 'Name Breakdown',
        content: "BRAND NAME, BRAND SERIES. NOTHING TOO CRAZY. |  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        href: '/guides/cpu-cooler#naming'
      },
      {
        id: 'air-cooling',
        label: 'Air Cooling',
        content: "TRADITIONAL TYPE OF CPU COOLER. IT'S JUST A MINIATURE FAN. EXHAUST AND INTAKE WITH CASE. MAKE SURE IT FITS IN UR BUILD/CASE. MIGHT BE LOUD, LOOK OUT FOR NOISE LEVEL SPEC (DECIBELS/dB) | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        href: '/guides/cpu-cooler#air-cooling'
      },
      {
        id: 'liquid-cooling',
        label: 'Liquid Cooling',
        content: "ALL-IN-ONE (AIO) IS LIQUID COOLING. USES A COOLANT AND TUBES TO COOL YOUR CPU. NOT AS NOISY AND DOES A BETTER JOB AT COOLING. | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        href: '/guides/cpu-cooler#liquid-cooling'
      },
      {
        id: 'why-should-i-care',
        label: 'Why Should I Care?',
        content: "EVEN IF YOU'RE DOING THE BARE MINIMUM YOU SHOULD STILL ALWAYS BUY A CPU COOLER (UNLESS YOUR CPU CAME WITH A STOCK COOLER). JUST MAKE SURE THE CPU COOLER SUPPORTS BOTH YOUR CPU AND MOTHERBOARD (CHECK FOR MATCHING SOCKETS). | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        href: '/guides/cpu-cooler#why-should-i-care'
      },
    ],
  },
  {
    id: 7,
    type: 'Power Supply',
    description: "The power supply unit (PSU) supplies your PC with.. power. No PSU means your computer won't turn on.",
    img: '/ebbp-power-supply.png',
    link: '/guides/power-supply',
    icon: <PowerSquare size={30} />,
    topics: [
      {
        id: 'naming',
        label: 'Name Breakdown',
        content: "BRAND, BRAND SERIES, WATTAGE, EFFICIENCY RATING, MODULARITY, FORM FACTOR. | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        href: '/guides/power-supply#naming'
      },
      {
        id: 'efficiency-rating',
        label: 'Efficiency Rating',
        content: "80+ AND THROW IN THE METAL RANKS (BRONZE, SILVER, GOLD, PLAT, YUP) | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        href: '/guides/power-supply#efficiency-rating'
      },
      {
        id: 'modularity',
        label: 'Modularity',
        content: "FULLY-MODULAR = CABLES CAN BE REMOVED. NON-MODULAR = CABLES CANNOT BE REMOVED. SEMI-MODULAR = MOST CABLES CANNOT BE REMOVED. ONLY USE THE CABLES THAT CAME WITH YOUR PSU. NEVER MIX AND MATCH CABLES!!!!! | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        href: '/guides/power-supply#modularity'
      },
      {
        id: 'wattage',
        label: 'Wattage',
        content: "I HOPE U HAVE A POWER OUTLET NEARBY. YOU SUPPLY YOUR PC PARTS WITH WATTAGE. ALWAYS MAKE SURE YOUR PSU HAS MORE WATTAGE THAN YOUR BUILD DEMANDS, IDEALLY 25% MORE. THIS 25% WATTAGE HEADROOM IS A SAFE PRACTICE AS THE LAST THING YOU WANT IS TO DAMAGE ANY OF YOUR PC PARTS. | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        href: '/guides/power-supply#wattage'
      },
    ],
  },
  // {
  //   id: 8,
  //   type: 'Case',
  //   description: 'The frame of your PC. A case houses all your components, offering airflow, protection, and a chance to showcase your style.', 
  //   img: '/ebbp-case.png',
  //   link: '/guides/case',
  //   icon: <PcCase size={28} />,
  //   topics : [
  //     { id: '', label: '', content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", href: '' },
  //     { id: '', label: '', content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", href: '' },
  //     { id: '', label: '', content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", href: '' },
  //   ]
  // }
];