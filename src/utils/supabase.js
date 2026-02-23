import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient = async (supabaseAccessToken) => {
    const supabase = createClient(
        supabaseUrl || "https://placeholder.supabase.co",
        supabaseKey || "placeholder",
        {
            global: {
                headers: { Authorization: `Bearer ${supabaseAccessToken}` },
            },
        }
    );
    return supabase;
};

export default supabaseClient;
