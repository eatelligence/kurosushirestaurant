"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Trash2, Check, Pencil } from "lucide-react";
import { SortableList } from "@/components/admin/SortableList";
import { Field } from "@/components/admin/Field";
import {
  deleteItem,
  reorderItems,
  toggleItemAvailable,
  updateItem,
} from "@/lib/actions/menu";

type Item = {
  id: string;
  section_id: string;
  name: string;
  description: string | null;
  price: number;
  spicy: boolean;
  signature: boolean;
  available: boolean;
  sort: number;
};

export function ItemsList({
  sectionId,
  items,
}: {
  sectionId: string;
  items: Item[];
}) {
  if (items.length === 0) {
    return (
      <div className="border border-dashed border-kuro-smoke p-8 text-center text-kuro-ash">
        Esta sección aún no tiene platos.
      </div>
    );
  }

  return (
    <SortableList
      items={items}
      onReorder={async (ids) => {
        const res = await reorderItems(sectionId, ids);
        if (!res.ok) toast.error(res.error);
      }}
      renderItem={(item, handle) => (
        <ItemRow item={item} handle={handle} />
      )}
    />
  );
}

function ItemRow({ item, handle }: { item: Item; handle: React.ReactNode }) {
  const [editing, setEditing] = useState(false);
  const [available, setAvailable] = useState(item.available);
  const [pending, start] = useTransition();
  const [deleting, startDelete] = useTransition();

  return (
    <div className={`border ${available ? "border-kuro-smoke" : "border-dashed border-kuro-smoke"} ${available ? "" : "opacity-70"}`}>
      <div className="flex items-center gap-3 pl-2 pr-4 py-3">
        {handle}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-kuro-cream text-base" style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
              {item.name}
            </span>
            {item.signature && (
              <span className="text-[9px] uppercase tracking-[0.28em] text-kuro-stone border border-kuro-graphite px-1.5 py-0.5">
                Signature
              </span>
            )}
            {item.spicy && (
              <span className="text-[9px] uppercase tracking-[0.28em] text-kuro-stone border border-kuro-graphite px-1.5 py-0.5">
                Picante
              </span>
            )}
            {!available && (
              <span className="text-[9px] uppercase tracking-[0.28em] text-kuro-stone border border-kuro-graphite px-1.5 py-0.5">
                Agotado
              </span>
            )}
          </div>
          {item.description && (
            <p className="text-[12px] text-kuro-ash mt-0.5 line-clamp-1">{item.description}</p>
          )}
        </div>

        <span className="text-kuro-cream text-base" style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
          ${item.price.toFixed(0)}
        </span>

        <button
          type="button"
          onClick={() => {
            const next = !available;
            setAvailable(next);
            start(async () => {
              const res = await toggleItemAvailable(item.id, next);
              if (res.ok) toast.success(next ? "Disponible" : "Marcado como agotado");
              else {
                toast.error(res.error);
                setAvailable(!next);
              }
            });
          }}
          disabled={pending}
          aria-label={available ? "Marcar como agotado" : "Marcar como disponible"}
          className={`w-10 h-10 flex items-center justify-center border transition-colors ${
            available
              ? "border-kuro-smoke text-kuro-cream hover:border-kuro-graphite"
              : "border-kuro-smoke text-kuro-ash hover:text-kuro-cream"
          }`}
        >
          <Check size={14} strokeWidth={1.5} />
        </button>

        <button
          type="button"
          onClick={() => setEditing((e) => !e)}
          aria-label="Editar"
          className="w-10 h-10 flex items-center justify-center border border-kuro-smoke text-kuro-stone hover:text-kuro-cream hover:border-kuro-graphite transition-colors"
        >
          <Pencil size={13} strokeWidth={1.5} />
        </button>

        <button
          type="button"
          disabled={deleting}
          onClick={() => {
            if (!confirm(`¿Eliminar "${item.name}"?`)) return;
            startDelete(async () => {
              const res = await deleteItem(item.id);
              if (!res.ok) toast.error(res.error);
              else toast.success("Plato eliminado");
            });
          }}
          aria-label="Eliminar"
          className="w-10 h-10 flex items-center justify-center border border-kuro-smoke text-kuro-stone hover:text-kuro-cream hover:border-kuro-graphite transition-colors"
        >
          <Trash2 size={13} strokeWidth={1.5} />
        </button>
      </div>

      {editing && (
        <EditItemForm
          item={item}
          onDone={() => setEditing(false)}
        />
      )}
    </div>
  );
}

function EditItemForm({ item, onDone }: { item: Item; onDone: () => void }) {
  const [pending, start] = useTransition();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const payload = {
          section_id: item.section_id,
          name: String(fd.get("name") ?? ""),
          description: String(fd.get("description") ?? "") || null,
          price: Number(fd.get("price")),
          spicy: fd.get("spicy") === "on",
          signature: fd.get("signature") === "on",
          available: item.available,
        };
        start(async () => {
          const res = await updateItem(item.id, payload);
          if (res.ok) {
            toast.success("Plato guardado");
            onDone();
          } else toast.error(res.error);
        });
      }}
      className="border-t border-kuro-smoke px-4 py-5 bg-kuro-charcoal/40 grid grid-cols-1 md:grid-cols-[2fr_3fr_auto] gap-4"
    >
      <Field label="Nombre">
        <input name="name" defaultValue={item.name} required className="admin-input" />
      </Field>
      <Field label="Descripción">
        <input name="description" defaultValue={item.description ?? ""} className="admin-input" />
      </Field>
      <Field label="Precio (USD)">
        <input name="price" type="number" step="0.5" min="0" defaultValue={item.price} required className="admin-input" />
      </Field>

      <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-kuro-stone">
        <input type="checkbox" name="signature" defaultChecked={item.signature} className="accent-kuro-cream" />
        Signature
      </label>
      <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-kuro-stone">
        <input type="checkbox" name="spicy" defaultChecked={item.spicy} className="accent-kuro-cream" />
        Picante
      </label>

      <div className="flex items-center gap-2">
        <button type="submit" disabled={pending} className="admin-btn-primary">
          {pending ? "…" : "Guardar"}
        </button>
        <button type="button" onClick={onDone} className="admin-btn-ghost">
          Cancelar
        </button>
      </div>
    </form>
  );
}
