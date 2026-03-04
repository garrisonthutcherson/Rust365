"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutGrid, MessageSquare, Newspaper, User, Menu, LogOut, ShieldCheck } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from "@/components/ui/sheet";
import { useState } from "react";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { getPlaceholderById } from "@/lib/placeholder-images";

export function MainHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const auth = useAuth();
  const logoPlaceholder = getPlaceholderById("brand-logo");

  const handleLogout = () => {
    signOut(auth);
  };

  const navLinks = [
    { href: "/servers", label: "Servers", icon: LayoutGrid },
    { href: "/board", label: "Community", icon: MessageSquare },
    { href: "/news", label: "News", icon: Newspaper },
    { href: "/creators", label: "Creators", icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 rounded-sm overflow-hidden transform transition-transform group-hover:scale-110">
            <Image 
              src={logoPlaceholder.imageUrl}
              alt="Rust365 Icon"
              fill
              className="object-contain"
            />
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
          
          {user && (
            <Link 
              href="/admin/seed" 
              className="flex items-center gap-2 text-sm font-bold text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              ADMIN
            </Link>
          )}

          <div className="h-4 w-px bg-border mx-2" />
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase text-muted-foreground">@{user.email?.split('@')[0]}</span>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground hover:text-primary">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login" className="font-headline">LOGIN</Link>
              </Button>
              <Button size="sm" asChild className="rust-gradient font-headline">
                <Link href="/auth/register">JOIN THE RAID</Link>
              </Button>
            </>
          )}
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
                <SheetTitle className="text-left font-headline uppercase italic">Navigation <span className="text-primary">Menu</span></SheetTitle>
                <SheetDescription className="text-left">
                  Access site pages and community features.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-8">
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

                {user && (
                  <Link 
                    href="/admin/seed" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 text-xl font-headline font-bold text-yellow-500"
                  >
                    <ShieldCheck className="w-6 h-6" />
                    ADMIN TOOLS
                  </Link>
                )}
                
                <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8">
                  {user ? (
                    <Button variant="outline" className="w-full" onClick={() => { handleLogout(); setIsOpen(false); }}>
                      LOGOUT
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full" asChild onClick={() => setIsOpen(false)}>
                        <Link href="/auth/login">LOGIN</Link>
                      </Button>
                      <Button className="w-full rust-gradient" asChild onClick={() => setIsOpen(false)}>
                        <Link href="/auth/register">REGISTER</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}