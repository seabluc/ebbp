'use client'
import { Button } from "@/components//ui/button";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const dark = theme === 'dark'

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <span className="flex items-center gap-2">
        <Spinner data-testid="spinner-icon" className="mx-[18px] md:mx-0 size-5 md:size-6 md:text-white" />
        <Switch disabled className="hidden md:flex" />
      </span>
    )
  }

  return (
    <span className="flex items-center gap-2">
      {/* Mobile: Icon only */}
      <Button variant="ghost" size="icon"
        className="md:hidden px-7 focus:bg-[#7A8588] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ?
          <Sun data-testid="sun-icon" className="text-[#DBAE58] absolute transition-all duration-300 rotate-0 scale-100 dark:scale-0 dark:rotate-90" /> :
          <Moon data-testid="moon-icon" className="text-white absolute transition-all duration-300 rotate-90 scale-0 dark:scale-100 dark:rotate-0" />
        }
      </Button>

      {/* Desktop: Switch enabled */}
      <span className="hidden md:flex items-center gap-2">
        <span className="">
          {dark ?
            <Moon className="text-white transition-all duration-300 rotate-90 scale-0 dark:scale-100 dark:rotate-0" /> :
            <Sun className="text-[#DBAE58] transition-all duration-300 rotate-0 scale-100 dark:scale-0 dark:rotate-90" />
          }
        </span>
        <Switch checked={dark} onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
      </span>
    </span>
  )
}
