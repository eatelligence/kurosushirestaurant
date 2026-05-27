"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Images,
  Building2,
  Clock,
  Megaphone,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "@/lib/actions/auth";

const ITEMS = [
  { href: "/admin/dashboard", label: "Inicio", icon: LayoutDashboard },
  { href: "/admin/menu", label: "Menú", icon: UtensilsCrossed },
  { href: "/admin/galeria", label: "Galería", icon: Images },
  { href: "/admin/info", label: "Información", icon: Building2 },
  { href: "/admin/horarios", label: "Horarios", icon: Clock },
  { href: "/admin/banner", label: "Anuncio", icon: Megaphone },
];

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-kuro-black border-b border-kuro-smoke/60 h-14 flex items-center justify-between px-4">
        <Link href="/admin/dashboard" className="text-kuro-cream text-2xl" style={{ fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', serif" }}>
          黒
        </Link>
        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((o) => !o)}
          className="w-11 h-11 flex items-center justify-center text-kuro-cream"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-kuro-obsidian border-r border-kuro-smoke/60 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-20 border-b border-kuro-smoke/60 flex items-center px-6">
          <Link href="/admin/dashboard" className="flex items-baseline gap-3">
            <span className="text-kuro-cream text-3xl leading-none" style={{ fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', serif" }}>
              黒
            </span>
            <span className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash">
              Admin
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {ITEMS.map((it) => {
            const Icon = it.icon;
            const active = pathname?.startsWith(it.href);
            return (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 text-[12px] uppercase tracking-[0.18em] transition-colors min-h-[44px] ${
                  active
                    ? "bg-kuro-charcoal text-kuro-cream"
                    : "text-kuro-stone hover:text-kuro-cream hover:bg-kuro-charcoal/60"
                }`}
              >
                <Icon size={15} strokeWidth={1.4} />
                {it.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-kuro-smoke/60">
          <div className="px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-kuro-ash truncate">
            {email}
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] uppercase tracking-[0.18em] text-kuro-stone hover:text-kuro-cream hover:bg-kuro-charcoal/60 transition-colors min-h-[44px]"
            >
              <LogOut size={15} strokeWidth={1.4} />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-kuro-black/60 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}
    </>
  );
}
