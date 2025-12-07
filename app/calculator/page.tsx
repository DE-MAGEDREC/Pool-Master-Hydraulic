"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import PoolHydraulicsCalculator from "@/components/PoolHydraulicsCalculator";
import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslation } from "@/lib/i18n/translations";

export default function CalculatorPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = getTranslation(language || "fr");

  const [checking, setChecking] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    // create client inside effect to avoid SSR/SSR-mismatch
    const supabase = getSupabase();

    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      const sess = data?.session ?? null;
      if (!sess) {
        // not logged -> go to login
        router.replace("/auth/login");
      } else {
        setIsAuthed(true);
      }
      setChecking(false);
    });

    return () => {
      mounted = false;
    };
  }, [router]);

  async function handleLogout() {
    try {
      const supabase = getSupabase();
      await supabase.auth.signOut();
    } finally {
      router.push("/auth/login");
    }
  }

  if (checking) {
    return (
      <div style={{ padding: 24 }}>
        <p>{t?.connecting ?? "Vérification de la session..."}</p>
      </div>
    );
  }

  if (!isAuthed) {
    // if not authed we already redirected, but render fallback
    return (
      <div style={{ padding: 24 }}>
        <p>{t?.login ?? "Connexion requise"}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h1 style={{ margin: 0 }}>{t?.calculatorTitle ?? "Calculateur hydraulique - Piscine"}</h1>
        <div>
          <button
            onClick={handleLogout}
            style={{
              background: "#e11d48",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            {t?.logout ?? "Se déconnecter"}
          </button>
        </div>
      </div>

      <PoolHydraulicsCalculator />
    </div>
  );
}
