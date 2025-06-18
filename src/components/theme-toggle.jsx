'use client'
import { Button } from "@/components//ui/button";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const dark = theme === 'dark'

  const toggleTheme = () => {
    setTheme(dark ? 'light' : 'dark')
  }

  return (
    <span className="flex items-center gap-2">
      {/* Mobile: Icon only */}
      <Button variant="ghost" size="icon" 
      className="md:hidden px-7 focus:bg-[#7A8588] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" 
      onClick={toggleTheme}>
        {dark ? <Moon /> : <Sun className="text-[#DBAE58]" />}
      </Button>

      {/* Desktop: Switch enabled */}
      <span className="hidden md:flex items-center gap-2">
        <span className="">{dark ? (<Moon />) : (<Sun className="text-[#DBAE58]" />)}</span>
        <Switch checked={dark} onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
      </span>
    </span>
  )
}