import "../globals.css";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin · Kuro Sushi",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // /admin/login renders without sidebar (it's gated by middleware too).
  // For all other routes, sidebar shown if user is present.
  return (
    <div className="min-h-screen bg-kuro-black text-kuro-cream">
      {user ? (
        <div className="flex">
          <AdminSidebar email={user.email ?? ""} />
          <div className="flex-1 min-h-screen lg:ml-64">{children}</div>
        </div>
      ) : (
        <div className="min-h-screen">{children}</div>
      )}
    </div>
  );
}
