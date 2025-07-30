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
import { forwardRef } from "react";
//import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Wrench, PackageSearch, PcCase, BookText, BookOpenText, User, LogIn, UserPlus } from "lucide-react";
import { Separator } from "@/components/ui/separator.jsx";
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
  // fix nav - try to contain all links in one nav. perhaps make NavMenu sticky too?
  return (
    <div className="w-full h-14 md:h-16 flex items-center justify-between px-4 bg-[#4D585B] dark:bg-[#2F3333] shadow-lg">
      {/*======================= Desktop Navigation =======================*/}
      <div className="hidden md:flex w-full items-center justify-between">
        {/* Left: Home */}
        <nav className="ml-16 flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="group/logo">
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <span className="font-bold text-2xl text-white flex items-center gap-x-1">
                      <Logo className="transition-transform duration-300 ease-in-out group-hover/logo:animate-pulse" />
                      EBBP
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Center: Workshop, Products, Guides, Credits */}
        <nav className="ml-6 flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="group/workshop">
                <Link href="/workshop" legacyBehavior passHref>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()}`}>
                    <span className="text-xl text-white flex items-center gap-x-1.5">
                      <Wrench className="size-[22px] transition-transform duration-300 ease-in-out group-hover/workshop:rotate-90" />
                      Workshop
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="group/products">
                <NavigationMenuTrigger>
                  <span className="text-xl text-white flex items-center gap-x-1.5">
                    <PackageSearch className="size-[22px] transition-transform duration-500 group-hover/products:scale-125" />
                    Products
                  </span>
                </NavigationMenuTrigger>
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
              <NavigationMenuItem className="group/guides">
                <Link href="/guides/cpu" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <span className="relative text-xl text-white flex items-center gap-x-1.5">
                      <BookText className="size-[22px] transition-opacity duration-200 ease-in-out group-hover/guides:opacity-0 group-hover/guides:-rotate-6" />
                      <BookOpenText className="size-[22px] absolute transition-opacity duration-200 ease-in-out opacity-0 group-hover/guides:opacity-100" />
                      Guides
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {/* <NavigationMenuItem>
                <Link href="/credits" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <p className="text-xl text-white">Credits</p>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem> */}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right: Log in, Register, Dark Mode */}
        <nav className="mr-16 flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="group/login">
                <Link href="/login" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <span className="text-lg text-white flex items-center gap-x-1.5">
                      <LogIn className="size-5 transition-transform duration-300 ease-in-out group-hover/login:translate-x-1" />
                      Log in
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="group/register">
                <Link href="/register" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <span className="text-lg text-white flex items-center gap-x-1.5">
                      <User className="size-5 transition-opacity duration-150 ease-in-out group-hover/register:opacity-0 group-hover/register:-translate-x-0.5" />
                      <UserPlus className="size-5 absolute transition-opacity duration-150 ease-in-out opacity-0 group-hover/register:opacity-100" />
                      Sign up
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <Separator orientation="vertical" className="h-8 bg-white/70 dark:bg-white/50" />
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