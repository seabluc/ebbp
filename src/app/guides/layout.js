import { SidebarProvider } from "@/components/ui/sidebar";
import { GuidesSidebar } from "@/components/guides-sidebar";

export default function GuidesLayout({ children }) {

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <nav className=""><GuidesSidebar /></nav>
        <div className="flex-1 flex justify-center">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
