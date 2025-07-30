'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";

export function RightSidebar({ topic, ...props }) {
  const { isMobile } = useSidebar();
  const topics = topic.topics;

  return (
    <>
      {!isMobile && (
        <Sidebar {...props}>
          <SidebarHeader className="p-0 pl-6 font-medium bg-background">
            On this page
          </SidebarHeader>
          <SidebarContent className="bg-background">
            <SidebarGroup>
              <SidebarMenu className="gap-0">
                {topics.map((topic) => (
                  <SidebarMenuItem key={topic.id}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={topic.href}
                        className="whitespace-nowrap text-sidebar-foreground hover:text-sidebar-accent-foreground text-sm">
                        {topic.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}
    </>
  )
}