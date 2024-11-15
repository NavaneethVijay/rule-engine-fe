import { SideNavigation } from "@/components/settings/navigation"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="flex gap-6">
        <SideNavigation />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}
