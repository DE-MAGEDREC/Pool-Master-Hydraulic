"use client";
import { useEffect } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  useEffect(()=>{
    async function doLogout(){
      const supabase = getSupabase();
      await supabase.auth.signOut();
      router.push('/');
    }
    doLogout();
  },[router]);
  return <div>Déconnexion...</div>;
}
