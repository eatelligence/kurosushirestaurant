"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Field } from "@/components/admin/Field";
import { updateSection, deleteSection } from "@/lib/actions/menu";

type Section = {
  id: string;
  slug: string;
  title: string;
  kanji: string | null;
  romaji: string | null;
};

export function SectionEditor({ section }: { section: Section }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [deleting, startDelete] = useTransition();

  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const payload = {
            slug: String(fd.get("slug") ?? "").trim(),
            title: String(fd.get("title") ?? "").trim(),
            kanji: String(fd.get("kanji") ?? "") || null,
            romaji: String(fd.get("romaji") ?? "") || null,
          };
          start(async () => {
            const res = await updateSection(section.id, payload);
            if (res.ok) toast.success("Sección guardada");
            else toast.error(res.error);
          });
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <Field label="Título">
          <input name="title" defaultValue={section.title} required className="admin-input" />
        </Field>
        <Field label="Slug (URL interna)" hint="Solo minúsculas, números y guiones.">
          <input name="slug" defaultValue={section.slug} required className="admin-input" />
        </Field>
        <Field label="Kanji">
          <input name="kanji" defaultValue={section.kanji ?? ""} className="admin-input" maxLength={4} />
        </Field>
        <Field label="Romaji">
          <input name="romaji" defaultValue={section.romaji ?? ""} className="admin-input" />
        </Field>

        <div className="md:col-span-2 flex items-center gap-3">
          <button type="submit" disabled={pending} className="admin-btn-primary">
            {pending ? "Guardando…" : "Guardar sección"}
          </button>
          <button
            type="button"
            disabled={deleting}
            onClick={() => {
              if (!confirm(`¿Eliminar la sección "${section.title}" y todos sus platos?`)) return;
              startDelete(async () => {
                const res = await deleteSection(section.id);
                if (res.ok) {
                  toast.success("Sección eliminada");
                  router.push("/admin/menu");
                } else {
                  toast.error(res.error);
                }
              });
            }}
            className="admin-btn-danger"
          >
            <Trash2 size={13} strokeWidth={1.4} />
            {deleting ? "Eliminando…" : "Eliminar"}
          </button>
        </div>
      </form>
    </div>
  );
}
