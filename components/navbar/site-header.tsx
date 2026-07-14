"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { company } from "@/data/company";
import { leftNavLinks, rightNavLinks, navigationLinks } from "@/data/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FullscreenSearch } from "@/components/navbar/fullscreen-search";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  const elevated = scrolled || mobileOpen || !isHome;
  const overHero = isHome && !elevated;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          elevated
            ? "border-b border-border/80 bg-white shadow-[0_1px_12px_rgba(36,50,61,0.06)]"
            : "bg-transparent"
        )}
      >
        <div className="relative mx-auto flex h-16 max-w-7xl items-center px-4 sm:h-20 sm:px-6 lg:px-8">
          {/* Left nav */}
          <nav className="absolute inset-y-0 left-4 hidden items-center gap-1 lg:flex xl:left-8">
            {leftNavLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-[12px] font-medium uppercase tracking-[0.18em] transition-colors",
                  overHero
                    ? "text-white/90 hover:text-white"
                    : "text-foreground/75 hover:text-primary",
                  pathname === link.href && (overHero ? "text-white" : "text-primary")
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Centered logo */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 shrink-0"
          >
            <Image
              src="/logo/logo.svg"
              alt={company.name}
              width={240}
              height={44}
              priority
              className={cn(
                "h-8 w-auto transition-all sm:h-9",
                overHero && "brightness-0 invert"
              )}
            />
          </Link>

          {/* Right nav + icons */}
          <div className="ml-auto flex items-center gap-0.5 lg:gap-1">
            <nav className="mr-2 hidden items-center gap-1 lg:flex">
              {rightNavLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-[12px] font-medium uppercase tracking-[0.18em] transition-colors",
                    overHero
                      ? "text-white/90 hover:text-white"
                      : "text-foreground/75 hover:text-primary",
                    pathname === link.href && (overHero ? "text-white" : "text-primary")
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Button
              variant="ghost"
              size="icon"
              className={cn("h-9 w-9", overHero ? "text-white hover:bg-white/10 hover:text-white" : "text-foreground")}
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className={cn("relative h-9 w-9", overHero ? "text-white hover:bg-white/10 hover:text-white" : "text-foreground")}
            >
              <Link href="/wishlist" aria-label="Wishlist">
                <Heart className="h-[18px] w-[18px]" />
                {wishlist.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-foreground">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className={cn(
                "hidden h-9 w-9 sm:inline-flex",
                overHero ? "text-white hover:bg-white/10 hover:text-white" : "text-foreground"
              )}
            >
              <Link href="/profile" aria-label="Account">
                <User className="h-[18px] w-[18px]" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className={cn("relative h-9 w-9", overHero ? "text-white hover:bg-white/10 hover:text-white" : "text-foreground")}
            >
              <Link href="/cart" aria-label="Cart">
                <ShoppingBag className="h-[18px] w-[18px]" />
                {itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn("h-9 w-9 lg:hidden", overHero ? "text-white hover:bg-white/10 hover:text-white" : "text-foreground")}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="border-t border-border bg-white px-4 py-6 lg:hidden">
            <ul className="space-y-1">
              {navigationLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="block px-3 py-3 text-sm font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:text-primary"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <FullscreenSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

      {!isHome && <div className="h-16 sm:h-20" aria-hidden />}
    </>
  );
}
