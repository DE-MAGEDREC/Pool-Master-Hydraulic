"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";

export default function CalculatorPage(){
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(()=>{
    async function check(){
      const supabase = getSupabase();
      const { data } = await supabase.auth.getSession();
      const sess = data?.session ?? null;
      if(!sess){
        router.push('/auth/login');
        return;
      }
      setSession(sess);
      setLoading(false);
    }
    check();
  },[router]);

  if(loading) return <div>Chargement...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Calculateur hydraulique - Piscine</h1>
      <p>Bienvenue, vous êtes connecté.</p>
      <p>Intégrer ici le dashboard de calcul.</p>
      <p><a href="/auth/logout">Se déconnecter</a></p>
    </div>
  );
}
