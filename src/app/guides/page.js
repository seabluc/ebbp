'use client'; // Indicates this is a client component
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export default function App() {
  return (
    <div className="min-h-screen bg-[#4D585B] flex flex-col p-8"> {/* Charcoal background */}
      {/* Centered title for Guides */}
      <h1 className="text-center text-4xl mt-8 mb-4 font-bold text-[#DBAE58]">Guides</h1>

      <div className="flex w-full"> {/* Allow tabs to take full width */}
        {/* Tabs with vertical orientation and charcoal background aligned to the left */}
        <Tabs
          aria-label="Options"
          isVertical={true}
          css={{
            backgroundColor: '#4D585B', // Charcoal background for tabs
            flex: '0 0 200px', // Fixed width for tabs (adjust as needed)
            border: '2px solid transparent', // No border around the tabs
          }}
        >
          <Tab key="glossary" title="Glossary">
            <Card css={{ backgroundColor: '#4D585B', flex: 1 }}> {/* Adjusted to full width */}
              <CardBody className="text-black">

                <p className="mb-4">
                  This glossary provides essential definitions for terms encountered while building a PC. Understanding these terms will make the process smoother and help in troubleshooting or making informed component choices.
                </p>

                <h2 className="font-semibold text-lg mb-2">Air Cooling</h2>
                <p className="mb-4">
                  A method of cooling components (usually the CPU) using fans and heatsinks to dissipate heat.
                </p>

                <h2 className="font-semibold text-lg mb-2">Anti-Static Wrist Strap</h2>
                <p className="mb-4">
                  A device worn on the wrist and grounded to prevent static discharge, protecting components from damage during assembly.
                </p>

                <h2 className="font-semibold text-lg mb-2">ATX</h2>
                <p className="mb-4">
                  A motherboard form factor and size standard that dictates case and component compatibility. ATX, Micro-ATX, and Mini-ITX are common sizes.
                </p>

                <h2 className="font-semibold text-lg mb-2">BIOS (Basic Input/Output System)</h2>
                <p className="mb-4">
                  Firmware that initializes and manages hardware during the boot-up process. It allows users to configure settings for the PC’s components.
                </p>

                <h2 className="font-semibold text-lg mb-2">Bootable USB</h2>
                <p className="mb-4">
                  A USB drive formatted with an operating system installer, allowing users to install the OS on a new or formatted computer.
                </p>

                <h2 className="font-semibold text-lg mb-2">CPU (Central Processing Unit)</h2>
                <p className="mb-4">
                  The main processing chip of a computer that executes instructions and performs calculations. Often referred to as the "brain" of the computer.
                </p>

                <h2 className="font-semibold text-lg mb-2">CPU Cooler</h2>
                <p className="mb-4">
                  A component that dissipates heat from the CPU to prevent it from overheating. Common types include air coolers and liquid coolers.
                </p>

                <h2 className="font-semibold text-lg mb-2">Drivers</h2>
                <p className="mb-4">
                  Software that allows the operating system to communicate with hardware components. Installing the latest drivers ensures compatibility and performance.
                </p>

                <h2 className="font-semibold text-lg mb-2">Dual-Channel Memory</h2>
                <p className="mb-4">
                  A memory configuration that pairs two matching RAM sticks to improve data throughput, requiring specific RAM slots on the motherboard.
                </p>

                <h2 className="font-semibold text-lg mb-2">Expansion Slot</h2>
                <p className="mb-4">
                  A slot on the motherboard for adding extra hardware like a GPU, sound card, or network card, typically a PCIe slot.
                </p>

                <h2 className="font-semibold text-lg mb-2">GPU (Graphics Processing Unit)</h2>
                <p className="mb-4">
                  A specialized processor designed to render graphics and perform tasks related to visual output, such as gaming and video editing.
                </p>

                <h2 className="font-semibold text-lg mb-2">Heatsink</h2>
                <p className="mb-4">
                  A metal component attached to the CPU or GPU to absorb and dissipate heat, often used in combination with fans.
                </p>

                <h2 className="font-semibold text-lg mb-2">I/O (Input/Output) Ports</h2>
                <p className="mb-4">
                  Physical connectors on the back of the motherboard or case that allow peripherals (keyboard, mouse, monitor, etc.) to connect to the PC.
                </p>

                <h2 className="font-semibold text-lg mb-2">Modular PSU</h2>
                <p className="mb-4">
                  A type of power supply that allows users to connect only the cables they need, improving airflow and cable management.
                </p>

                <h2 className="font-semibold text-lg mb-2">Motherboard</h2>
                <p className="mb-4">
                  The main circuit board in a PC that houses the CPU, RAM, and other components, allowing them to communicate with each other.
                </p>

                <h2 className="font-semibold text-lg mb-2">NVMe (Non-Volatile Memory Express)</h2>
                <p className="mb-4">
                  A storage protocol for high-speed SSDs that connects through the PCIe interface, offering faster data transfer rates than traditional SATA SSDs.
                </p>

                <h2 className="font-semibold text-lg mb-2">Overclocking</h2>
                <p className="mb-4">
                  The process of increasing a component’s clock speed beyond its factory settings to improve performance, typically applied to CPUs and GPUs.
                </p>

                <h2 className="font-semibold text-lg mb-2">PCIe (Peripheral Component Interconnect Express)</h2>
                <p className="mb-4">
                  A high-speed interface standard for connecting expansion cards like GPUs and NVMe SSDs to the motherboard.
                </p>

                <h2 className="font-semibold text-lg mb-2">PSU (Power Supply Unit)</h2>
                <p className="mb-4">
                  A component that supplies power to all other components in the PC. It converts AC power from an outlet to the appropriate DC power levels for the computer.
                </p>

                <h2 className="font-semibold text-lg mb-2">RAM (Random Access Memory)</h2>
                <p className="mb-4">
                  A form of volatile memory that temporarily stores data for quick access by the CPU, essential for running applications smoothly.
                </p>

                <h2 className="font-semibold text-lg mb-2">SATA (Serial ATA)</h2>
                <p className="mb-4">
                  A standard interface for connecting storage devices like SSDs and HDDs to the motherboard.
                </p>

                <h2 className="font-semibold text-lg mb-2">Static Electricity</h2>
                <p className="mb-4">
                  A buildup of electrical charge on the surface of objects, which can damage sensitive computer components if discharged improperly.
                </p>

                <h2 className="font-semibold text-lg mb-2">Standoff</h2>
                <p className="mb-4">
                  Small screw-like components that raise the motherboard off the case, preventing short circuits and securing the motherboard in place.
                </p>

                <h2 className="font-semibold text-lg mb-2">Storage</h2>
                <p className="mb-4">
                  Devices that store data, including operating systems, applications, and files. Common types include SSDs, HDDs, and NVMe drives.
                </p>

                <h2 className="font-semibold text-lg mb-2">Thermal Paste</h2>
                <p className="mb-4">
                  A heat-conductive material applied between the CPU and CPU cooler to improve heat transfer and prevent overheating.
                </p>

              </CardBody>
            </Card>
          </Tab>


          <Tab key="pc-building" title="PC Building Process">
            <Card css={{ backgroundColor: '#4D585B', flex: 1 }}>
              <CardBody className="text-black">
                <p className="mb-4">
                  Building a PC can seem daunting at first, but with patience and careful attention, you can assemble a custom machine that meets your specific needs. Here’s a step-by-step guide to building a PC from scratch, including preparation, component installation, and post-build setup.
                </p>

                <h2 className="font-semibold text-lg mb-2">1. Preparation</h2>
                <p className="mb-4">
                  Before diving in, gather all the components and tools you'll need:
                  <ul className="list-disc ml-6">
                    <li>Your PC components (case, motherboard, CPU, CPU cooler, memory, storage, GPU, PSU, and optional components)</li>
                    <li>A clean, static-free workspace with ample lighting</li>
                    <li>Essential tools, including a Phillips-head screwdriver and an anti-static wrist strap</li>
                  </ul>
                  Read through the manuals for each component, especially the motherboard and case, as they often contain specific instructions and layouts. Planning each step beforehand can help prevent errors.
                </p>

                <h2 className="font-semibold text-lg mb-2">2. Installing the CPU and Cooler</h2>
                <p className="mb-4">
                  Begin by installing the CPU onto the motherboard. Carefully lift the CPU socket latch, align the CPU (checking the arrows on the socket and CPU corner), and place it into the socket without applying force. Secure the latch, and then install the CPU cooler. Depending on the cooler, you may need to apply a small amount of thermal paste if it doesn’t come pre-applied. Follow the cooler’s manual to secure it properly.
                </p>

                <h2 className="font-semibold text-lg mb-2">3. Installing Memory (RAM)</h2>
                <p className="mb-4">
                  Next, install the RAM by locating the appropriate slots on the motherboard. Open the retention clips, align each RAM stick with the slot, and press down until the clips snap back in place. Ensure you’re using the correct slots for dual-channel memory if you have two sticks.
                </p>

                <h2 className="font-semibold text-lg mb-2">4. Preparing the Case</h2>
                <p className="mb-4">
                  Open the PC case and remove any screws, brackets, or panels. Ensure there’s enough room to work and locate the motherboard standoffs (small raised screws where the motherboard will sit). Check that the standoffs match the holes on your motherboard; adjust them if necessary to prevent shorts.
                </p>

                <h2 className="font-semibold text-lg mb-2">5. Installing the Motherboard</h2>
                <p className="mb-4">
                  Carefully place the motherboard into the case, aligning it with the standoffs. Use screws to secure the motherboard in place, ensuring it’s level and securely attached. Don’t overtighten the screws, as this can damage the board.
                </p>

                <h2 className="font-semibold text-lg mb-2">6. Installing Storage Drives</h2>
                <p className="mb-4">
                  Depending on the type of storage (SSD, NVMe, HDD), locate the appropriate slot or bay. NVMe drives typically go into an M.2 slot on the motherboard, while 2.5” SSDs and HDDs fit into designated bays. Secure each drive with screws and connect them to the motherboard using SATA cables if needed.
                </p>

                <h2 className="font-semibold text-lg mb-2">7. Installing the Graphics Card (GPU)</h2>
                <p className="mb-4">
                  Insert the GPU into the appropriate PCIe slot on the motherboard, usually the top slot. Push it down gently until it clicks into place and secure it with screws to the case’s back panel. Ensure that the GPU is level and connected properly, as this is a heavier component.
                </p>

                <h2 className="font-semibold text-lg mb-2">8. Installing the Power Supply Unit (PSU)</h2>
                <p className="mb-4">
                  Place the PSU into the designated space in the case (usually at the bottom) and secure it with screws. Connect the necessary power cables to each component: the motherboard (24-pin connector), CPU (4/8-pin connector), GPU, and any storage drives. Modular PSUs allow you to connect only the cables you need, reducing clutter.
                </p>

                <h2 className="font-semibold text-lg mb-2">9. Cable Management</h2>
                <p className="mb-4">
                  Organize and secure cables to improve airflow and make the build look cleaner. Use cable ties or the case’s built-in cable management options to keep cables out of the way. Proper cable management ensures better airflow and can prevent overheating.
                </p>

                <h2 className="font-semibold text-lg mb-2">10. Power On and Post-Build Checks</h2>
                <p className="mb-4">
                  Once all components are connected, double-check all connections and ensure everything is secure. Close the case, plug in your monitor, keyboard, and mouse, and turn on the PSU. Press the power button on the case. If everything is installed correctly, the PC should boot up and display the BIOS screen. If there’s no display, check connections and consult the motherboard manual for troubleshooting tips.
                </p>

                <h2 className="font-semibold text-lg mb-2">11. Installing the Operating System</h2>
                <p className="mb-4">
                  Insert a bootable USB drive with the operating system (e.g., Windows or Linux). Follow the installation steps, format your drives as necessary, and set up your system. Once installed, update drivers, optimize settings, and install necessary software.
                </p>

                <p className="mt-4">
                  <strong>Congratulations!</strong> You’ve successfully built your own PC. With the right components and careful assembly, your custom PC should serve your needs and allow for future upgrades. Enjoy the flexibility and performance of your newly built machine!
                </p>
              </CardBody>
            </Card>

          </Tab>

          <Tab key="cpu" title="CPU">
            <Card css={{ backgroundColor: '#4D585B', flex: 1 }}>
              <CardBody className="text-black">
                <p className="mb-4">
                  The CPU, or Central Processing Unit, is often referred to as the "brain" of the computer. It performs the calculations and instructions needed to execute programs, run the operating system, and manage hardware components.
                </p>

                <p className="mb-4">
                  <strong>What It Does:</strong> The CPU processes instructions from programs and the operating system. It handles tasks ranging from basic operations like opening files to complex computations needed for applications like gaming, video editing, and data analysis.
                </p>

                <p className="mb-4">
                  <strong>Why It's Important:</strong> A faster CPU can improve the overall performance of your system, especially for tasks that require heavy computation. The CPU’s speed and core count determine how well it can handle multitasking and demanding applications.
                </p>

                <p className="mb-4">
                  <strong>Analogy:</strong> Imagine the CPU as the chef in a kitchen. The chef (CPU) follows recipes (program instructions) to prepare dishes (process data). The more skilled and faster the chef, the quicker and better the dishes are prepared.
                </p>

                <p className="mb-4">
                  <strong>Things to Consider When Choosing a CPU:</strong>
                </p>

                <ul className="list-disc ml-6 mb-4">
                  <li><strong>Core Count:</strong> More cores allow the CPU to handle more tasks simultaneously, useful for multitasking and heavy applications.</li>
                  <li><strong>Clock Speed:</strong> Higher speeds mean the CPU can process tasks faster, measured in GHz. Look for high clock speeds for gaming or single-threaded applications.</li>
                  <li><strong>Compatibility:</strong> Ensure your CPU is compatible with your motherboard’s socket type and chipset.</li>
                  <li><strong>Power Consumption:</strong> Some CPUs are more power-efficient, while others require more power and cooling solutions.</li>
                </ul>
              </CardBody>
            </Card>


          </Tab>
          <Tab key="cpu-cooler" title="CPU Cooler">
            <Card css={{ backgroundColor: '#4D585B', flex: 1 }}> {/* Full width and padding added */}
              <CardBody className="text-black">
                <p className="mb-4">
                  The CPU cooler is responsible for keeping the CPU at an optimal temperature by dissipating the heat it generates during operation. Effective cooling is crucial for maintaining the performance and longevity of the CPU.
                </p>

                <p className="mb-4">
                  <strong>What It Does:</strong> The CPU cooler prevents the CPU from overheating by drawing heat away and either dissipating it through fins and fans (air cooling) or circulating liquid (liquid cooling).
                </p>

                <p className="mb-4">
                  <strong>Why It's Important:</strong> Overheating can cause the CPU to throttle performance or even shut down to prevent damage. A good CPU cooler ensures that the CPU can run at high speeds without overheating, which is essential for demanding applications.
                </p>

                <p className="mb-4">
                  <strong>Analogy:</strong> Think of the CPU cooler as an air conditioning unit for a room. Just as the AC keeps the room from getting too hot, the CPU cooler keeps the processor at a stable temperature.
                </p>

                <p className="mb-4">
                  <strong>Things to Consider When Choosing a CPU Cooler:</strong>
                </p>

                <ul className="list-disc ml-6 mb-4">
                  <li><strong>Cooling Method:</strong> Air coolers are generally more affordable and easier to install, while liquid coolers provide more efficient cooling but are more complex to set up.</li>
                  <li><strong>Compatibility:</strong> Ensure the cooler fits your CPU socket type and case dimensions.</li>
                  <li><strong>Noise Level:</strong> Some coolers are quieter than others, an important factor if you prefer a silent build.</li>
                  <li><strong>Thermal Performance:</strong> Look for coolers with high thermal efficiency, especially if you plan on overclocking the CPU.</li>
                </ul>
              </CardBody>
            </Card>


          </Tab>
          <Tab key="memory" title="Memory">
            <Card css={{ backgroundColor: '#4D585B', flex: 1 }}> {/* Charcoal card background and flexible width */}
              <CardBody className="text-black"> {/* Black text */}
                <p className="mb-4">
                  Memory, or RAM (Random Access Memory), is a crucial component in any computer. It provides temporary storage for data and instructions that the CPU needs to access quickly while performing tasks. RAM differs from storage (like hard drives or SSDs) in that it only holds data temporarily and is much faster to read and write to.
                </p>

                <p className="mb-4">
                  <strong>What It Does:</strong> RAM allows your computer to run multiple programs simultaneously by providing a quick-access space for active data. For example, when you open an application, the data it needs to operate is loaded into RAM so the CPU can access it quickly, without having to constantly retrieve it from slower storage.
                </p>

                <p className="mb-4">
                  <strong>Why It's Important:</strong> The amount and speed of your RAM directly impact how well your computer handles multitasking and intensive applications. More RAM generally allows for smoother performance in demanding tasks like gaming, video editing, or using multiple applications simultaneously.
                </p>

                <p className="mb-4">
                  <strong>Analogy:</strong> Think of RAM as your desk while you're working. The bigger the desk, the more papers and tools you can keep within arm's reach without having to put anything away. With more RAM, you can keep more "papers" (programs and data) ready for immediate access, rather than having to retrieve them from the "file cabinet" (storage).
                </p>

                <p className="mb-4">
                  <strong>Things to Consider When Choosing Memory:</strong>
                </p>

                <ul className="list-disc ml-6 mb-4">
                  <li><strong>Capacity:</strong> More RAM (e.g., 16GB or 32GB) is better for multitasking and demanding applications. Standard builds may use 8GB, but 16GB or more is ideal for gaming or professional work.</li>
                  <li><strong>Speed:</strong> Measured in MHz, faster RAM can improve data transfer rates. For example, 3200MHz is a common speed for gaming setups, while some high-performance applications may benefit from even faster speeds.</li>
                  <li><strong>Form Factor:</strong> Ensure the RAM sticks are compatible with your motherboard. Common types include DIMM (for desktops) and SO-DIMM (for laptops).</li>
                  <li><strong>Latency:</strong> Lower latency can improve performance in certain applications. CAS (Column Access Strobe) latency is one metric to consider when comparing memory sticks of similar speeds.</li>
                  <li><strong>Compatibility:</strong> Check if your CPU and motherboard support the RAM speed you choose. Some motherboards have limits on supported RAM speeds.</li>
                </ul>
              </CardBody>
            </Card>

          </Tab>
          <Tab key="storage" title="Storage">
            <Card css={{ backgroundColor: '#4D585B', flex: 1 }}>
              <CardBody className="text-black">
                <p className="mb-4">
                  Storage in a PC refers to the components where data is saved and retrieved. It is where your operating system, applications, files, and games are stored, so it plays a crucial role in both performance and capacity.
                </p>

                <p className="mb-4">
                  <strong>What It Does:</strong> Storage devices hold the data that your PC needs to operate and access programs. When you open a file or run a program, the data is read from storage and loaded into memory for the CPU to process.
                </p>

                <p className="mb-4">
                  <strong>Why It's Important:</strong> Storage affects both the speed of data retrieval and the amount of data you can store. Faster storage like SSDs can significantly reduce load times, making the PC more responsive. Meanwhile, higher-capacity storage allows you to save more files and programs without running out of space.
                </p>

                <p className="mb-4">
                  <strong>Analogy:</strong> Think of storage as a library where all your books and information are kept. When you need information, you go to the library (storage) to get the book you need (data). A faster storage drive is like having an organized library where you can quickly find and retrieve the book.
                </p>

                <p className="mb-4">
                  <strong>Things to Consider When Choosing Storage:</strong>
                </p>

                <ul className="list-disc ml-6 mb-4">
                  <li><strong>Type:</strong> HDDs (Hard Disk Drives) offer larger storage capacities at a lower cost but are slower. SSDs (Solid State Drives) are faster but typically more expensive per gigabyte. NVMe SSDs are even faster, connecting directly to the motherboard for high-speed data transfer.</li>
                  <li><strong>Capacity:</strong> Choose storage capacity based on your needs. 500GB may be sufficient for light use, but gaming or multimedia projects often require 1TB or more.</li>
                  <li><strong>Speed:</strong> Faster storage reduces load times for the operating system and applications. SSDs and NVMe drives are preferable for performance-focused builds.</li>
                  <li><strong>Reliability:</strong> SSDs are more durable than HDDs, as they have no moving parts. Consider this if you prioritize longevity and data security.</li>
                  <li><strong>Budget:</strong> Balance your budget between capacity and speed. SSDs are ideal for fast performance, while HDDs are cost-effective for mass storage.</li>
                </ul>
              </CardBody>
            </Card>

          </Tab>
          <Tab key="video-card" title="Video Card">
            <Card css={{ backgroundColor: '#4D585B', flex: 1 }}>
              <CardBody className="text-black">
                <p className="mb-4">
                  A video card, also known as a graphics card or GPU (Graphics Processing Unit), is a component in your PC responsible for rendering images, videos, and animations. It plays a critical role in visual performance, especially in gaming, 3D rendering, and any application that involves intensive graphical work.
                </p>

                <p className="mb-4">
                  <strong>What It Does:</strong> The video card processes graphical data and outputs images to your display. It handles complex calculations to render everything from simple 2D interfaces to intricate 3D environments. For gamers, artists, and content creators, a dedicated video card is essential for smooth, high-quality visuals.
                </p>

                <p className="mb-4">
                  <strong>Why It’s Important:</strong> A powerful video card is essential for tasks that require high visual fidelity and smooth frame rates, such as gaming, video editing, and 3D modeling. The video card's performance directly impacts image quality, resolution, and rendering speed, making it a key component for a responsive and immersive experience.
                </p>

                <p className="mb-4">
                  <strong>Analogy:</strong> Think of the video card as the artist in a production studio. Just as an artist brings concepts to life with detail and precision, the video card renders graphics, creating the visuals you see on screen. A more skilled artist (or powerful video card) can produce higher-quality work faster and with greater detail.
                </p>

                <p className="mb-4">
                  <strong>Things to Consider When Choosing a Video Card:</strong>
                </p>

                <ul className="list-disc ml-6 mb-4">
                  <li><strong>Performance:</strong> Look for a video card that matches your needs. For basic tasks, an integrated GPU may be sufficient, but for gaming or content creation, a dedicated card like NVIDIA’s GeForce or AMD’s Radeon series is recommended.</li>
                  <li><strong>Memory:</strong> Video cards come with dedicated memory (VRAM) for handling textures and complex graphics. For gaming, 4-8GB of VRAM is typically sufficient, while professionals in 3D rendering might require 10GB or more.</li>
                  <li><strong>Resolution:</strong> Higher resolutions (like 1440p or 4K) require more powerful GPUs to maintain smooth frame rates. Ensure your video card is capable of supporting your display resolution.</li>
                  <li><strong>Power Consumption:</strong> Video cards can be power-hungry, especially high-performance models. Make sure your power supply can handle the card's requirements.</li>
                  <li><strong>Size and Compatibility:</strong> Video cards can be large and require adequate space in the PC case. Double-check that the card will fit in your case and is compatible with your motherboard.</li>
                  <li><strong>Budget:</strong> Video cards vary widely in price. Consider balancing cost with performance, as mid-range cards often provide excellent value for the average user.</li>
                </ul>
              </CardBody>
            </Card>

          </Tab>
          <Tab key="psu" title="PSU">
            <Card css={{ backgroundColor: '#4D585B', flex: 1 }}>
              <CardBody className="text-black">
                <p className="mb-4">
                  The Power Supply Unit (PSU) is a critical component in your PC that provides power to all other components. It converts electricity from an outlet into a form that the computer's components can use safely and efficiently. Without a reliable PSU, your PC won't be able to function or, at worst, could be damaged by unstable power.
                </p>

                <p className="mb-4">
                  <strong>What It Does:</strong> The PSU takes AC (alternating current) power from a wall outlet and converts it to DC (direct current) power, which is what the internal components require. It also regulates voltage to ensure that components receive a consistent level of power, protecting them from surges and fluctuations.
                </p>

                <p className="mb-4">
                  <strong>Why It’s Important:</strong> A PSU is vital for system stability and longevity. A high-quality PSU can handle high workloads without overheating or shutting down, protecting your components from power-related issues. Additionally, a powerful PSU with sufficient wattage ensures that future upgrades, such as a new graphics card or CPU, can be supported without issues.
                </p>

                <p className="mb-4">
                  <strong>Analogy:</strong> Think of the PSU as the heart of the computer. Just as the heart pumps blood to all parts of the body, the PSU supplies the necessary power to each component. If the heart isn’t functioning well, other organs suffer – similarly, a poor-quality PSU can lead to system instability and even damage.
                </p>

                <p className="mb-4">
                  <strong>Things to Consider When Choosing a PSU:</strong>
                </p>

                <ul className="list-disc ml-6 mb-4">
                  <li><strong>Wattage:</strong> Calculate the total power needs of your system. For a basic build, 450-550W may be sufficient, but gaming and high-performance PCs typically require 600W or more. Check power requirements if you plan to upgrade components.</li>
                  <li><strong>Efficiency Rating:</strong> Look for an 80 Plus certification, which indicates energy efficiency. Ratings like 80 Plus Bronze, Silver, Gold, or Platinum show increasing levels of efficiency, reducing electricity costs and heat output.</li>
                  <li><strong>Modularity:</strong> Modular PSUs allow you to connect only the cables you need, reducing cable clutter. Semi-modular and fully modular PSUs provide more flexibility for clean builds.</li>
                  <li><strong>Quality and Reliability:</strong> Choose a PSU from a reputable brand with good reviews. Higher-quality PSUs are more reliable and often come with longer warranties, protecting your investment.</li>
                  <li><strong>Noise Level:</strong> Some PSUs are designed with silent or semi-passive cooling, which only turns on the fan when under heavy load. This can help reduce overall system noise.</li>
                  <li><strong>Future-Proofing:</strong> Consider getting a slightly higher wattage than currently needed, especially if you plan to upgrade your GPU or add more components in the future.</li>
                </ul>
              </CardBody>
            </Card>

          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
