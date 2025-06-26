'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { guidesItems } from "@/lib/data/guides-items";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "./ui/separator";

export function GuidesSidebar() {
  const isMobile = useIsMobile();

  return (
    <nav aria-label="Guides navigation" className="flex gap-x-0.5">
      <Sidebar collapsible={isMobile ? "" : "none"}
        variant="sidebar">
        <SidebarContent>
          <SidebarGroup className="bg-[#4D585B]">
            <SidebarHeader className="bg-[#647072] text-[#e5e5e5] font-semibold rounded-t-lg">
              Core PC Components
            </SidebarHeader>
            <Separator className="bg-white" />
            <SidebarGroupContent className="pt-1 bg-[#647072] rounded-b-lg">
              <SidebarMenu>
                {guidesItems.map((part) => (
                  <SidebarMenuItem key={part.id} className="text-white">
                    <SidebarMenuButton asChild>
                      <Link href={part.link}>
                        <h1 className="w-full flex items-center justify-between hover:bg-[#7A8588] rounded-lg">
                          <span className="flex items-center gap-2 text-base font-medium">
                            {part.icon}{part.type}
                          </span>
                        </h1>
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      {part.topics.map((topic) => (
                        <SidebarMenuSubItem key={topic.id} className="hover:bg-[#7A8588] rounded-lg">
                          <SidebarMenuButton asChild>
                            <Link href={topic.href}>
                              <span className="flex items-center gap-2">{topic.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {isMobile && (
        <div className="pl-2 pt-2">
          <SidebarTrigger />
        </div>
      )}
    </nav>
  );
};

/*
'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/collapsible";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { guidesItems } from "@/lib/data/guides-items";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronDown } from "lucide-react";

export function GuidesSidebar() {
  const isMobile = useIsMobile();

  return (
    <nav aria-label="Guides navigation" className="flex gap-x-0.5">
      <Sidebar collapsible="none" variant="sidebar">
        <SidebarContent>
          <SidebarGroup className="bg-[#4D585B]">
            <SidebarGroupLabel className="bg-[#647072] hover:bg-[#7A8588] text-white md:text-base font-medium md:mb-2">Core PC Components</SidebarGroupLabel>
            <SidebarGroupContent className="bg-[#647072]">
              <SidebarMenu>
                {guidesItems.map((part) => (
                  <Collapsible defaultOpen key={part.id} className="text-white">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <h1 className="w-full flex items-center justify-between hover:bg-[#7A8588] rounded-lg">
                            <span className="flex items-center gap-2 text-base font-medium">
                              {part.icon}{part.type}
                            </span><ChevronDown size={22} />
                          </h1>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {part.topics.map((topic) => (
                            <SidebarMenuSubItem key={topic.id} className="hover:bg-[#7A8588] rounded-lg">
                              <SidebarMenuButton asChild>
                                <Link href={topic.href}>
                                  <span className="flex items-center gap-2">{topic.label}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar >
      {isMobile && (
        <div className="p-2">
          <SidebarTrigger />
        </div>
      )}
    </nav>
  );
};
*/