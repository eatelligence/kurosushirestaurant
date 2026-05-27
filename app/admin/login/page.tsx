import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/admin/dashboard");

  const { next } = await searchParams;

  return (
    <section className="min-h-screen flex items-center justify-center px-gutter bg-kuro-black grain">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="text-kuro-cream text-5xl mb-3" style={{ fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', serif" }}>
            黒
          </div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-kuro-ash">
            Kuro Sushi · Admin
          </div>
        </div>
        <LoginForm next={next} />
      </div>
    </section>
  );
}
