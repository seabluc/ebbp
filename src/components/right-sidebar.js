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
          <SidebarHeader className="mt-9 ml-2 p-0 pl-4 font-medium">
            On this page
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu className="gap-0">
                {topics.map((topic) => (
                  <SidebarMenuItem key={topic.id}>
                    <SidebarMenuButton asChild>
                      <Link href={topic.href} className="whitespace-nowrap text-sidebar-foreground hover:text-sidebar-accent-foreground text-sm">
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