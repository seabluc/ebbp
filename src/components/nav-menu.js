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
import { Logo } from "./Icons.jsx";
import { navParts, navPartsMobile } from "@/lib/data/nav-items";
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle";
import { useEffect, useState, forwardRef } from "react";
//import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Wrench, PcCase, BookOpenText, User } from "lucide-react";

export default function NavMenu() {
  /*
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, 'change', (currentY) => {
    if (currentY === "number") {
      const direction = current - scrollY.getPrevious();
      if (scrollY.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [visible])
  */
  // FIX NAV. CONTAIN ALL THAT SHIT IN ONE NO? AND ALSO APPLY STICKY SO WHEN U SCROLL IT STAYS??
  return (
    <div className="w-full h-14 md:h-16 flex items-center justify-between px-4 bg-[#4D585B] dark:bg-[#2F3333] shadow-lg">
      {/*======================= Desktop Navigation =======================*/}
      <div className="hidden md:flex w-full items-center justify-between">
        {/* Left: Home */}
        <nav className="ml-16 flex items-center gap-2">
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
        </nav>

        {/* Center: Workshop, Products, Guides, Credits */}
        <nav className="ml-32 flex items-center gap-2">
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
                        <span className="flex items-center gap-4">
                          {part.icon}
                          {part.description}
                        </span>
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link /*href="/guides"*/ href="/guides/cpu" legacyBehavior passHref>
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
        </nav>

        {/* Right: Log in, Register, Dark Mode */}
        <nav className="mr-16 flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/login" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <p className="md:text-lg text-white">Log in</p>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/register" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <p className="md:text-lg text-white">Sign up</p>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className={navigationMenuTriggerStyle()}>
                <ThemeToggle />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>

      {/*======================== Mobile Navigation ========================*/}
      <NavigationMenu className="flex md:hidden w-full items-center justify-center text-white">
        <NavigationMenuList>
          <NavigationMenuItem className="flex items-center">
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/" className="flex items-center pl-0"><Logo />
                <p className="text-xl font-bold">EBBP</p>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/workshop"><Wrench /></Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger><PcCase /></NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid grid-cols-1 gap-y-2.5 p-3 w-[222px] bg-[#4D585B]">
                <p className="text-lg text-white text-center font-bold">Products</p>
                {navPartsMobile.map((part) => (
                  <li key={part.type} type={part.type} href={part.href} className="bg-[#647072] border-1">
                    <NavigationMenuLink asChild>
                      <Link href={part.href}>
                        <span className="m-1 ml-2 py-[3px] flex items-center gap-2 text-white">
                          {part.icon}
                          {part.type}
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link /*href="/guides"*/ href="/guides/cpu"><BookOpenText /></Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/login"><User /></Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ThemeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu >
    </div>
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