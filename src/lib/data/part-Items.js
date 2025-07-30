export const partItems = [
  {
    id: 1,
    type: 'CPU',
    description: 'The brain of your computer. The CPU handles all instructions and calculations, determining how fast your system can think, react, and perform.',
    img: '/ebbp-cpu.png',
    link: '/products/cpu',
  },
  {
    id: 2,
    type: 'Motherboard',
    description: 'The central hub of your PC that connects all components — CPU, memory, storage, and more — and ensures they communicate seamlessly.',
    img: '/ebbp-mobo.png',
    link: '/products/motherboard',
  },
  {
    id: 3,
    type: 'Memory',
    description: 'Your PC’s short-term memory. RAM stores temporary data for active tasks, making multitasking and application performance smoother.',
    img: '/ebbp-memory.png',
    link: '/products/memory',
  },
  {
    id: 4,
    type: 'Storage',
    description: 'The long-term memory of your PC. SSDs and HDDs store your operating system, games, files, and software — everything your PC needs to boot and run.',
    img: '/ebbp-ssd.png',
    link: '/products/storage',
  },
  {
    id: 5,
    type: 'Video Card',
    description: 'The graphics powerhouse. GPUs handle visual rendering, from smooth gameplay to high-resolution video editing and 3D modeling.',
    img: '/ebbp-video-card.png',
    link: '/products/video-card',
  },
  {
    id: 6,
    type: 'CPU Cooler',
    description: 'Keeps your processor cool under pressure. Essential for maintaining performance and preventing overheating during heavy workloads or gaming.',
    img: '/ebbp-air-cooler.png',
    link: '/products/cpu-cooler',
  },
  {
    id: 7,
    type: 'Power Supply',
    description: 'Delivers electricity to every component. A reliable PSU ensures stability and protects your build from power surges and failure.',
    img: '/ebbp-power-supply.png',
    link: '/products/power-supply',
  },
  // {
  // id: 8,
  // type: 'Case',
  // description: 'The frame of your PC. A case houses all your components, offering airflow, protection, and a chance to showcase your style.', 
  // img: '/ebbp-case.png',
  // link: '/products/case',
  // }
]

export const partName = new Map([
  ['cpu', 'CPU'],
  ['motherboard', 'Motherboard'],
  ['memory', 'Memory'],
  ['storage', 'Storage'],
  ['video-card', 'Video Card'],
  ['cpu-cooler', 'CPU Cooler'],
  ['power-supply', 'Power Supply']
]);

export const validCategories = Array.from(partName.keys());