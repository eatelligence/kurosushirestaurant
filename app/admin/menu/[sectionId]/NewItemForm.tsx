"use client";

import { useRef, useTransition } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Field } from "@/components/admin/Field";
import { createItem } from "@/lib/actions/menu";

export function NewItemForm({ sectionId }: { sectionId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, start] = useTransition();

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const payload = {
          section_id: sectionId,
          name: String(fd.get("name") ?? ""),
          description: String(fd.get("description") ?? "") || null,
          price: Number(fd.get("price")),
          spicy: fd.get("spicy") === "on",
          signature: fd.get("signature") === "on",
          available: true,
        };
        start(async () => {
          const res = await createItem(payload);
          if (res.ok) {
            toast.success("Plato añadido");
            formRef.current?.reset();
          } else toast.error(res.error);
        });
      }}
      className="grid grid-cols-1 md:grid-cols-[2fr_3fr_auto_auto] gap-3 items-end"
    >
      <Field label="Nombre">
        <input name="name" required className="admin-input" placeholder="Kuro Dragon Roll" />
      </Field>
      <Field label="Descripción">
        <input name="description" className="admin-input" placeholder="Langostino tempura, aguacate…" />
      </Field>
      <Field label="Precio USD">
        <input name="price" type="number" step="0.5" min="0" required className="admin-input" placeholder="18" />
      </Field>
      <button type="submit" disabled={pending} className="admin-btn-primary self-end">
        <Plus size={14} strokeWidth={1.5} />
        {pending ? "…" : "Añadir"}
      </button>

      <div className="md:col-span-4 flex items-center gap-5 -mt-1">
        <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-kuro-stone">
          <input type="checkbox" name="signature" className="accent-kuro-cream" />
          Signature
        </label>
        <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-kuro-stone">
          <input type="checkbox" name="spicy" className="accent-kuro-cream" />
          Picante
        </label>
      </div>
    </form>
  );
}
