"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function signInWithPassword(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { ok: false as const, error: "Email y contraseña requeridos." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false as const, error: "Credenciales no válidas." };

  revalidatePath("/", "layout");
  return { ok: true as const };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updatePassword(newPassword: string) {
  if (!newPassword || newPassword.length < 8) {
    return { ok: false as const, error: "Mínimo 8 caracteres." };
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const };
}
