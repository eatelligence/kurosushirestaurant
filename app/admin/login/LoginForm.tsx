"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signInWithPassword } from "@/lib/actions/auth";

export function LoginForm({ next }: { next?: string }) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          setError(null);
          const res = await signInWithPassword(fd);
          if (!res.ok) {
            setError(res.error);
          } else {
            router.push(next || "/admin/dashboard");
            router.refresh();
          }
        });
      }}
      className="bg-kuro-obsidian/60 border border-kuro-smoke p-8 space-y-5"
    >
      <label className="block">
        <span className="block text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-2">
          Email
        </span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="admin-input"
          placeholder="admin@kurosushi.com"
        />
      </label>

      <label className="block">
        <span className="block text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-2">
          Contraseña
        </span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="admin-input"
        />
      </label>

      {error && (
        <p role="alert" className="text-[12px] text-kuro-stone border-l-2 border-kuro-mist pl-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-6 py-3.5 bg-kuro-cream text-kuro-black text-[11px] uppercase tracking-[0.32em] font-medium hover:bg-kuro-ivory transition-colors disabled:opacity-60 min-h-[48px]"
      >
        {isPending ? "Entrando…" : "Entrar"}
      </button>

      <style jsx>{`
        :global(.admin-input) {
          width: 100%;
          background: transparent;
          border: 1px solid #2A2A2A;
          color: #F5F2EC;
          padding: 12px 14px;
          min-height: 44px;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 300;
          outline: none;
          transition: border-color 0.2s;
        }
        :global(.admin-input:focus) {
          border-color: #8A8A8A;
        }
      `}</style>
    </form>
  );
}
