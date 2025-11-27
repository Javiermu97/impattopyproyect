"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");  // redirige si no hay sesión
    }
  }, [user, loading, router]);

  if (loading) return <p>Cargando...</p>;

  return <>{children}</>;
}
