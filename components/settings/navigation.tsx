"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LucideLayoutDashboard, Users, Globe, Bell } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  {
    title: "Configuration",
    icon: <LucideLayoutDashboard className="h-4 w-4 mr-2" />,
    href: "/dashboard/settings",
  },
  {
    title: "Websites",
    icon: <Globe className="h-4 w-4 mr-2" />,
    href: "/dashboard/settings/websites",
  },
  {
    title: "Customer Groups",
    icon: <Users className="h-4 w-4 mr-2" />,
    href: "/dashboard/settings/customer-groups",
  },
  // Add new navigation items here
  {
    title: "Notifications",
    icon: <Bell className="h-4 w-4 mr-2" />,
    href: "/dashboard/settings/notifications",
  },
]

export function SideNavigation() {
  const pathname = usePathname()

  return (
    <Card className="w-64 h-fit">
      <CardContent className="p-4">
        <nav className="flex flex-col gap-2">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "default" : "ghost"}
                className="w-full justify-start"
              >
                {item.icon}
                {item.title}
              </Button>
            </Link>
          ))}
        </nav>
      </CardContent>
    </Card>
  )
}
