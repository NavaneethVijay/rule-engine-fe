import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { BarChart, Home, Package, Settings, ShoppingCart, Users } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <SidebarProvider className="w-64">
          <Sidebar className="w-64 bg-white">
            <SidebarHeader>
              <h2 className="text-xl font-bold p-4">E-commerce Dashboard</h2>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Home className="mr-2 h-4 w-4" />
                        Dashboard
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Cart Rules
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Package className="mr-2 h-4 w-4" />
                        Products
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Users className="mr-2 h-4 w-4" />
                        Customers
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <BarChart className="mr-2 h-4 w-4" />
                        Analytics
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
          </Sidebar>
        </SidebarProvider>
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </>
  );
}
