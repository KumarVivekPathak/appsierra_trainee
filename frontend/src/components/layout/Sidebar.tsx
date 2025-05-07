import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Icons.layoutDashboard,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: Icons.folder,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: Icons.checkSquare,
  },
  {
    title: "Team",
    href: "/team",
    icon: Icons.users,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Icons.settings,
  },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <>
      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50"
          >
            <Icons.menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r">
          <div className="flex h-16 flex-shrink-0 items-center px-4 border-b">
            <Icons.logo className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold">TaskFlow</span>
          </div>
          <ScrollArea className="h-full">
            <nav className="flex-1 space-y-1 p-4">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    location.pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </div>
    </>
  )
}

function SidebarContent() {
  const location = useLocation()

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-16 flex-shrink-0 items-center px-4 border-b">
        <Icons.logo className="h-8 w-8" />
        <span className="ml-2 text-xl font-bold">TaskFlow</span>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex-1 space-y-1 p-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                location.pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
