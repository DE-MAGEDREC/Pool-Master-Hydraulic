"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslation } from "@/lib/i18n/translations";

export default function LoginPage() {
  const router = useRouter();
  const supabase = getSupabase();

  const { language } = useLanguage();
  const t = getTranslation(language);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/calculator");
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>{t.loginTitle}</h1>

      <form onSubmit={handleLogin}>
        <label>{t.email}</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>{t.password}</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? t.connecting : t.login}
        </button>
      </form>
    </div>
  );
}
