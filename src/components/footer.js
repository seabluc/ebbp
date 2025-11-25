import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { /*contactIcons,*/ contributors } from "@/lib/data/nav-items";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="w-full md:h-24 flex flex-col-reverse items-center gap-y-6 md:flex-row md:items-center md:justify-between pb-1.5 md:pb-0 px-4 md:px-24 bg-[#4D5858] dark:bg-[#2F3333] shadow-lg text-white">
      <div className="flex flex-row md:items-center gap-x-3 mt-1.5 md:mt:0">
        <p className="max-w-60 md:max-w-96 text-center mb-10 md:mb-0 text-sm font-light md:font-normal">
          © 2025 EBBP. All rights reserved. <br />
          All trademarks are property of their respective owners.
        </p>
        <Separator
          orientation="vertical"
          className="hidden md:block ml-2 h-9 bg-white dark:bg-white/70" />
        <Select>
          <SelectTrigger className="w-12 h-12" />{/*<SelectValue /></SelectTrigger>*/}
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Contributors</SelectLabel>
              {contributors.map((git) => (
                <SelectItem key={git.id} value={git.name}>
                  <a href={git.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    {git.name}
                  </a>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* links like sitemap and other footer oriented links
      <nav className="md:flex items-center justify-center">
        <p className="text-sm md:text-base">GitHub</p>
        <p className="text-sm md:text-base"></p>
        <p className="text-sm md:text-base"></p>
      </nav>
      */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-10 md:mt-0">
        <a
          href="https://vercel.com/?utm_source=ebbp"
          target="_blank"
          rel="noopener noreferrer"
          className="md:h-14 md:w-56">
          <Image
            src="/powered-by-vercel.svg"
            alt="Vercel Logo"
            width={212}
            height={44}
            className="h-11 w-56 md:h-full md:w-auto object-cover md:object-contain rounded-xl"
          />
        </a>
        <a
          href="https://www.digitalocean.com/?refcode=2cffefcdc38a&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"
          target="_blank"
          rel="noopener noreferrer"
          className="md:h-14 md:w-56">
          <Image
            src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg"
            alt="DigitalOcean Referral Badge"
            width={200}
            height={65}
            className="h-14 w-56 md:h-full object-cover rounded-xl"
          />
        </a>
      </div>
    </footer>
  )
}

export default Footer;