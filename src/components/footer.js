import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { contactIcons, contributors } from "@/lib/data/nav-items";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full h-14 md:h-16 flex items-center justify-evenly bg-[#4D5858] shadow-lg">
      <div className="text-white">
        <NavigationMenu className=" text-white">
          <NavigationMenuList className="">
            <NavigationMenuItem>
              <p className="text-xs md:text-sm font-light md:font-normal mt-1 md:mt-0">
                © 2025 EBBP. All rights reserved. <br />
                All trademarks are property of their respective owners.
              </p>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Select>
                <SelectTrigger className="w-12 md:w-12">
                  {/* <SelectValue placeholder={<Image src="/git.svg" alt="GitHub Logo" width={24} height={24} />} /> */}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Contributors</SelectLabel>
                    {contributors.map((git) => (
                      <SelectItem key={git.id} value={git.name}>
                        <a href={git.link} target="_blank" rel="noopener noreferrer">
                          {/* <Image src={git.img} alt={git.alt} width={24} height={24} /> */}
                          {git.name}
                        </a>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </footer >
  )
}

export default Footer;
/*
          {contactIcons.map((icon) => (
            <NavigationMenuItem key={icon.id}>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <a href={icon.link} target="_blank" rel="noopener noreferrer">
                  <Image src={icon.img} alt={icon.alt} width={24} height={24} />
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
            */