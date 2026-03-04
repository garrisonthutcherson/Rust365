"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, LayoutGrid, MessageSquare, Newspaper, User, Menu } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from "@/components/ui/sheet";
import { useState } from "react";

export function MainHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/servers", label: "Servers", icon: LayoutGrid },
    { href: "/board", label: "Community", icon: MessageSquare },
    { href: "/news", label: "News", icon: Newspaper },
    { href: "/creators", label: "Creators", icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-sm transform transition-transform group-hover:rotate-12">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="font-headline font-bold text-2xl tracking-tighter text-white">RUST365</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
          <div className="h-4 w-px bg-border mx-2" />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/login" className="font-headline">LOGIN</Link>
          </Button>
          <Button size="sm" asChild className="rust-gradient font-headline">
            <Link href="/auth/register">JOIN THE RAID</Link>
          </Button>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-l border-border pt-12">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Access site pages and community features.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 text-xl font-headline font-semibold text-foreground"
                  >
                    <link.icon className="w-6 h-6 text-primary" />
                    {link.label}
                  </Link>
                ))}
                <div className="mt-8 flex flex-col gap-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/auth/login">LOGIN</Link>
                  </Button>
                  <Button className="w-full rust-gradient" asChild>
                    <Link href="/auth/register">REGISTER</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
