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
  const t = getTranslation(language);

  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();  // ← déplacer ici

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/auth/login");
      } else {
        setSessionChecked(true);
      }
    });
  }, [router]); // ← ajouter router en dépendance

  async function handleLogout() {
    const supabase = getSupabase(); // ← même correction
    await supabase.auth.signOut();
    router.push("/auth/login");
  }

  if (!sessionChecked) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">{t.calculatorTitle}</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          {t.logout}
        </button>
      </div>

      <PoolHydraulicsCalculator />
    </div>
  );
}
