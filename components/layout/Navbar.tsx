"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import { Menu, X, Instagram } from "lucide-react";
import { navLinks, RESTAURANT } from "@/lib/constants";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      triggerRef.current?.focus();
      return;
    }

    document.body.style.overflow = "hidden";
    // focus close button on open
    requestAnimationFrame(() => closeRef.current?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;
      const focusables = drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(10,10,10,0.88)] backdrop-blur-xl border-b border-kuro-gold/15"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav
          className="max-w-[1480px] mx-auto px-gutter flex items-center justify-between h-20 md:h-24"
          aria-label="Navegación principal"
        >
          <Link
            href="/"
            className="flex flex-col leading-none group min-h-[44px] justify-center"
          >
            <span
              className="text-kuro-cream text-[22px] md:text-[24px] tracking-[0.32em]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              KURO
            </span>
            <span className="text-[12px] md:text-[10px] uppercase tracking-[0.3em] text-kuro-stone mt-1">
              Sushi Restaurant
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-12">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[13px] uppercase tracking-[0.22em] text-kuro-stone hover:text-kuro-cream underline-slide pb-1 transition-colors min-h-[44px] inline-flex items-center"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <a
              href={RESTAURANT.whatsappReservation}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost group"
            >
              <span>Reservar</span>
              <span className="block w-2 h-2 rounded-full bg-kuro-red group-hover:bg-kuro-cream transition-colors" />
            </a>
          </div>

          <button
            ref={triggerRef}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
            className="lg:hidden flex items-center justify-center w-11 h-11 -mr-2 text-kuro-cream"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} strokeWidth={1.4} aria-hidden="true" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú principal"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-kuro-black grain flex flex-col"
          >
            <div className="flex items-center justify-between px-gutter h-20 md:h-24 border-b border-kuro-smoke/40">
              <span
                className="text-kuro-cream text-[22px] tracking-[0.32em]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                KURO
              </span>
              <button
                ref={closeRef}
                aria-label="Cerrar menú"
                onClick={() => setOpen(false)}
                className="w-11 h-11 flex items-center justify-center text-kuro-cream"
              >
                <X size={24} strokeWidth={1.4} aria-hidden="true" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-gutter" aria-label="Navegación móvil">
              <ul className="space-y-7">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block text-[40px] sm:text-[52px] leading-none text-kuro-cream hover:text-kuro-red focus-visible:text-kuro-red transition-colors min-h-[44px]"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="pt-4"
                >
                  <a
                    href={RESTAURANT.whatsappReservation}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="inline-block text-[40px] sm:text-[52px] leading-none italic text-kuro-red min-h-[44px]"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                  >
                    Reservar por WhatsApp →
                  </a>
                </motion.li>
              </ul>
            </nav>

            <div className="px-gutter pb-10 border-t border-kuro-smoke/40 pt-6 flex items-center justify-between flex-wrap gap-4">
              <a
                href={RESTAURANT.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label={`Instagram ${RESTAURANT.social.instagramHandle}`}
                className="flex items-center gap-2 text-kuro-stone hover:text-kuro-gold transition-colors min-h-[44px]"
              >
                <Instagram size={16} strokeWidth={1.4} aria-hidden="true" />
                <span className="text-[12px] uppercase tracking-[0.22em]">
                  {RESTAURANT.social.instagramHandle}
                </span>
              </a>
              <a
                href={RESTAURANT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="text-[12px] uppercase tracking-[0.22em] text-kuro-gold min-h-[44px] inline-flex items-center"
              >
                WhatsApp ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
