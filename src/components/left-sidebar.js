import { ChevronDown, Computer } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components//ui/collapsible";
import { guidesItems } from "@/lib/data/guides-items";
import { Separator } from "@/components//ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LeftSidebar({ ...props }) {
  return (
    <Sidebar {...props} collapsible="icon">
      <SidebarContent className="bg-background">

        <SidebarGroup /*className="group-data-[collapsible=icon]:hidden"*/>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem className="sticky">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Computer />
                      <span className="font-medium">Core PC Components</span>
                      <ChevronDown className="transition-transform duration-200 group-data-[state=closed]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="gap-y-2">
                      {guidesItems.map((part) => (
                        <SidebarMenuSubItem key={part.id}
                          className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                          <Link href={part.path} className="flex items-center gap-x-2">
                            {part.icon}{part.type}
                          </Link>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/*
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem className="sticky">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="font-medium">
                      <Computer />
                      <span>Example 2</span>
                      <ChevronDown className="transition-transform duration-200 group-data-[state=closed]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="gap-y-2">
                      {guidesItems.map((part) => (
                        <SidebarMenuSubItem key={part.id}
                          className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                          <Link href={part.path} className="flex items-center gap-x-2">
                            {part.icon}{part.type}
                          </Link>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        */}
      </SidebarContent>
      {/* <SidebarRail /> */}
    </Sidebar >
  )
}