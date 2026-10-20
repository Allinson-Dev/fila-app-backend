import { supabase } from "@/lib/supabase";

export async function listarLancamentos() {
  const { data, error } = await supabase
    .from("lancamentos")
    .select("*")
    .order("created_at");

  if (error) {
    throw error;
  }

  return data;
}