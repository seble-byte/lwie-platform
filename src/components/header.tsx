import Link from "next/link"
import Image from "next/image"
import { Search, HelpCircle, Bell, ShoppingCart, Sun, Moon } from "lucide-react"
import { MobileNav } from "./mobile-nav"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-teal-600 dark:bg-teal-800 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/placeholder.svg" alt="LWIE Logo" width={32} height={32} />
              <span className="text-2xl font-bold">LWIE</span>
            </Link>
            <div className="ml-4">
              <MobileNav />
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:block flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search items to swap..."
                className="w-full px-4 py-2 rounded-md text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-6 w-6" />
            </Button>
            <Link href="/login">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link href="/post">
              <Button>Post</Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

