import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { contactIcons, contributors } from "@/lib/data/nav-items";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full h-14 md:h-16 flex items-center justify-between pb-1.5 md:pb-0 px-4 md:px-8 bg-[#4D5858] shadow-lg text-white">

      <div className="text-xs md:text-sm font-light md:font-normal">
        <p>
          © 2025 EBBP. All rights reserved. <br />
          All trademarks are property of their respective owners.
        </p>
      </div>

      <Select>
        <SelectTrigger className="w-12 md:w-12">
          {/* Optionally put your GitHub icon here */}
          <Image src="/git.svg" alt="GitHub Logo" width={32} height={32} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Contributors</SelectLabel>
            {contributors.map((git) => (
              <SelectItem key={git.id} value={git.name}>
                <a href={git.link} target="_blank" rel="noopener noreferrer">
                  {git.name}
                </a>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </footer>
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