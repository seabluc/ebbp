'use client'
import { Button } from "@/components//ui/button";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  // Implement systemTheme and localStorage soon. For now default to light mode
  const { theme, setTheme } = useTheme();
  const dark = theme === 'dark'

  return (
    <span className="flex items-center gap-2">
      {/* Mobile: Icon only */}
      <Button variant="ghost" size="icon"
        className="md:hidden px-7 focus:bg-[#7A8588] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        <Sun className="text-[#DBAE58] absolute transition-all duration-300 rotate-0 scale-100 dark:scale-0 dark:rotate-90" />
        <Moon className="text-white absolute transition-all duration-300 rotate-90 scale-0 dark:scale-100 dark:rotate-0" />
      </Button>

      {/* Desktop: Switch enabled */}
      <span className="hidden md:flex items-center gap-2">
        <span className="">
          {dark ? <Moon className="text-white transition-all duration-300 rotate-90 scale-0 dark:scale-100 dark:rotate-0" /> :
            <Sun className="text-[#DBAE58] transition-all duration-300 rotate-0 scale-100 dark:scale-0 dark:rotate-90" />}
        </span>
        <Switch checked={dark} onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
      </span>
    </span>
  )
}
