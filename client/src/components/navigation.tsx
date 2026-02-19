import { Link, useLocation } from "wouter";
import { Sparkles, Calendar, Home, ShoppingBag, Moon, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/reading", label: "Reading", icon: Sparkles },
  { path: "/shop", label: "Shop", icon: ShoppingBag },
  { path: "/book", label: "Book a Session", icon: Calendar },
  { path: "/about", label: "About", icon: Heart },
];

export function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card" data-testid="navigation">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 group" data-testid="link-home-logo">
            <Moon className="w-5 h-5 text-[#FFD78C] animate-gentle-float" />
            <span className="font-serif text-lg text-[#F4F6FF] tracking-wide">
              Starseed Treasures
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`gap-2 ${!isActive ? "text-[#F4F6FF]/70 hover:text-[#F4F6FF]" : ""}`}
                    data-testid={`link-nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="md:hidden text-[#F4F6FF]/70"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pt-3 pb-1 flex flex-col gap-1 animate-fade-in-up">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start gap-2 ${!isActive ? "text-[#F4F6FF]/70" : ""}`}
                    onClick={() => setMobileOpen(false)}
                    data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
