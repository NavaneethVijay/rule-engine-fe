import MainNavbar from "@/components/layout/navbar";
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
import {
  BarChart,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex justify-between h-16">
        <div className="w-64"></div>
        <div className="flex-1">
          <MainNavbar />
        </div>
      </div>
      <div className="flex min-h-screen bg-gray-100">
        <SidebarProvider className="w-64">
          <Sidebar className="w-64 bg-white">
            <SidebarHeader>
              <h2 className="text-xl font-bold p-4">E-commerce Dashboard</h2>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <Link href="/dashboard">
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                        <Home className="mr-2 h-4 w-4" />
                        Dashboard
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                    <SidebarMenuItem>
                      <Link href="/dashboard/cart-rules">
                        <SidebarMenuButton>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Cart Rules
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                    <Link href="/dashboard/products">
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <Package className="mr-2 h-4 w-4" />
                        Products
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                    <Link href="/dashboard/customers">
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                        <Users className="mr-2 h-4 w-4" />
                        Customers
                      </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                    <Link href="/dashboard/analytics">
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <BarChart className="mr-2 h-4 w-4" />
                        Analytics
                      </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                    <Link href="/dashboard/settings">
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <Settings className="mr-2 h-4 w-4" />
                        Settings
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
          </Sidebar>
        </SidebarProvider>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </>
  );
}
