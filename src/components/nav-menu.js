'use client';

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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button.jsx";
import { Logo } from "./Icons.jsx";
import { navParts, navPartsMobile } from "@/lib/data/nav-items";
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle";
import { forwardRef, useState } from "react";
import { Wrench, PcCase, BookOpenText, User } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible.jsx";

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full h-14 md:h-16 flex items-center justify-between px-4 bg-[#4D585B] shadow-lg">
      {/*======================= Desktop Navigation =======================*/}
      <div className="hidden md:flex w-full items-center justify-between">
        {/* Left: Home */}
        <div className="ml-12 flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <span className="flex items-center text-white ">
                      <Logo /><p className="text-2xl font-bold">EBBP</p>
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Center: Workshop, Products, Guides, Credits */}
        <div className="flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/workshop" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <p className="text-xl text-white">Workshop</p>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger><p className="text-xl text-white">Products</p></NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-1 w-[400px] gap-y-2 p-2 bg-[#4D585B]">
                    {navParts.map((part) => (
                      <ListItem key={part.type} type={part.type} href={part.href} className="bg-[#647072] border-1">
                        <div className="flex items-center gap-4">
                          {part.icon}
                          {part.description}
                        </div>
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/guides" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <p className="md:text-xl text-white">Guides</p>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/credits" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <p className="md:text-xl text-white">Credits</p>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right: Login, Register, Dark Mode */}
        <div className="mr-12 flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/account/login" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <p className="md:text-xl text-white">Login</p>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/account/register" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <p className="md:text-xl text-white">Register</p>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className={navigationMenuTriggerStyle()}>
                <ThemeToggle />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/*======================== Mobile Navigation ========================*/}
      <NavigationMenu className="flex md:hidden w-full items-center justify-center text-white">
        <NavigationMenuList>
          <NavigationMenuItem className="flex items-center">
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/" className="flex items-center pl-1"><Logo />
                <p className="text-xl font-bold">EBBP</p>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex items-center justify-items-center">
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/workshop"><Wrench /></Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger><PcCase /></NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid grid-cols-1 gap-y-2 p-2 w-[200px] bg-[#4D585B]">
                <p className="text-lg text-white text-center font-bold">Products</p>
                {navPartsMobile.map((part) => (
                  <li key={part.type} type={part.type} href={part.href} className="bg-[#647072] border-1">
                    <NavigationMenuLink asChild>
                      <Link href={part.href}>
                        <div className="m-1 ml-2 py -0.5 flex items-center gap-2 text-white">
                          {part.icon}
                          {part.type}
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/guides"><BookOpenText /></Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/account/register"><User /></Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ThemeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu >
    </nav>
  );
}

const ListItem = forwardRef(({ className, type, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#7A8588] hover:text-accent-foreground focus:bg-[#7A8588] focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-lg text-white font-medium leading-none pb-0.5">{type}</div>
          <p className="line-clamp-2 text-sm leading-snug text-white">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"