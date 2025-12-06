"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslation } from "@/lib/i18n/translations";

export default function SignUpPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = getTranslation(language || "fr");

  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(null); const [loading, setLoading] = useState(false);

  async function handleSignUp(e) {
    e.preventDefault();
    setError(null); setLoading(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      router.push('/auth/login');
    } catch (err) {
      setError(err?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>{t.signUpTitle}</h1>
      <form onSubmit={handleSignUp}>
        <div><label>{t.email}</label><br/><input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required/></div>
        <div style={{ marginTop: 8 }}><label>{t.password}</label><br/><input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required/></div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ marginTop: 12 }}><button type="submit" disabled={loading}>{loading ? t.connecting : t.signUpAction}</button></div>
      </form>
    </div>
  );
}
