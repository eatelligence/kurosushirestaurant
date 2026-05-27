"use client";

import { useRef, useTransition } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Field } from "@/components/admin/Field";
import { createSection } from "@/lib/actions/menu";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function NewSectionForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, start] = useTransition();

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const title = String(fd.get("title") ?? "");
        const payload = {
          slug: slugify(title),
          title,
          kanji: String(fd.get("kanji") ?? "") || null,
          romaji: String(fd.get("romaji") ?? "") || null,
        };
        start(async () => {
          const res = await createSection(payload);
          if (res.ok) {
            toast.success("Sección creada");
            formRef.current?.reset();
          } else {
            toast.error(res.error);
          }
        });
      }}
      className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-3 items-end"
    >
      <Field label="Título">
        <input name="title" required className="admin-input" placeholder="Rolls Especiales" />
      </Field>
      <Field label="Kanji">
        <input name="kanji" className="admin-input" placeholder="特" maxLength={4} />
      </Field>
      <Field label="Romaji">
        <input name="romaji" className="admin-input" placeholder="Tokubetsu" />
      </Field>
      <button type="submit" disabled={pending} className="admin-btn-primary">
        <Plus size={14} strokeWidth={1.5} />
        {pending ? "…" : "Añadir"}
      </button>
    </form>
  );
}
