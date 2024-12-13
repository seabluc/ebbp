"use client";

import {
  Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Link,
  Navbar, NavbarBrand, NavbarContent, NavbarItem
} from "@nextui-org/react";
import { ChevronDown, Cpu, Mobo, Memory, Storage, VideoCard, CpuCooler, PowerSupply, User } from "./Icons.jsx";
//import { EBBPLogo } from "./EBBPLogo.jsx";
import { useAuth } from '@/lib/firebase/authContext'; // Import the useAuth hook from the context
import { logOutUser } from '@/lib/firebase/authHelpers'; // Import the logout helper function

export default function Menu() {
  const { user, loading } = useAuth(); // Access user and loading state from the auth context

  // Handle user logout when the logout button is clicked
  const handleLogout = async () => {
    try {
      await logOutUser(); // Call the logout helper function
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    cpu: <Cpu fill="currentColor" size={30} />,
    mobo: <Mobo fill="currentColor" size={30} />,
    memory: <Memory fill="currentColor" size={30} />,
    storage: <Storage fill="currentColor" size={30} />,
    gpu: <VideoCard fill="currentColor" size={30} />,
    cooler: <CpuCooler fill="currentColor" size={30} />,
    psu: <PowerSupply fill="currentColor" size={30} />,
    user: <User fill="currentColor" size={30} />,
  };

  return (
    <Navbar height="56px" className="bg-pink-50" shouldHideOnScroll>
      <NavbarBrand className="">
        {/*<EBBPLogo />*/}
        <Link className="text-xl" color="foreground" href="/">
          <p className="font-bold text-inherit">EBBP</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem className="mx-2">
          <Link className="text-lg" color="foreground" href="/workshop">
            PC Workshop
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem className="mx-2">
            <DropdownTrigger>
              <Button
                disableRipple
                className="text-lg p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Products
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="PC Parts"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="cpu"
              description="Explore the latest CPUs designed to boost your PC's performance"
              startContent={icons.cpu}
              as={Link} href="/products/cpu" className="text-[#DBAE58]"
            >
              CPU
            </DropdownItem>
            <DropdownItem
              key="motherboard"
              description="Find the perfect motherboard for your components"
              startContent={icons.mobo}
              as={Link} href="/products/motherboard" className="text-[#DBAE58]"
            >
              Motherboard
            </DropdownItem>
            <DropdownItem
              key="memory"
              description="Choose RAM to boost your PC's speed and handle your computing tasks"
              startContent={icons.memory}
              as={Link} href="/products/memory" className="text-[#DBAE58]"
            >
              Memory
            </DropdownItem>
            <DropdownItem
              key="storage"
              description="Pick a storage device to securely save your data your PC"
              startContent={icons.storage}
              as={Link} href="/products/storage" className="text-[#DBAE58]"
            >
              Storage
            </DropdownItem>
            <DropdownItem
              key="video_card"
              description="Browse powerful video cards to elevate your PC's visuals and boost frame rates"
              startContent={icons.gpu}
              as={Link} href="/products/video-card" className="text-[#DBAE58]"
            >
              Video Card
            </DropdownItem>
            <DropdownItem
              key="cpu_cooler"
              description="Prevent your CPU from overheating with sufficient thermal dissipation"
              startContent={icons.cooler}
              as={Link} href="/products/cpu-cooler" className="text-[#DBAE58]"
            >
              CPU Coolers
            </DropdownItem>
            <DropdownItem
              key="power_supply_unit"
              description="Find a power supply unit to provide your PC with ample wattage"
              startContent={icons.psu}
              as={Link} href="/products/power-supply" className="text-[#DBAE58]"
            >
              Power Supply Units
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem className="mx-2">
          <Link className="text-lg" color="foreground" href="/guides">
            Guides
          </Link>
        </NavbarItem>
        <NavbarItem className="mx-2">
          <Link className="text-lg" color="foreground" href="/credits">
            Credits
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {!loading && user ? (
            <>
              <Link href="/account/profile" className="mr-2 text-gray-800 hover:underline">
              <span className="mr-1">{icons.user}</span>{user.displayName || user.username}
              </Link>
              <Button className="mx-2.5 text-base" color="danger" variant="flat" onPress={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link className="text-lg mr-2" href="/account/login">Login</Link>
              <Button className="mx-2.5 text-base" color="primary" variant="flat" as={Link} href="/account/register">
                Sign Up
              </Button>
            </>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}