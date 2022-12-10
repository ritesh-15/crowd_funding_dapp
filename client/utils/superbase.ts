import { createClient, SupabaseClient } from "@supabase/supabase-js";

class Superbase {
  private static client: SupabaseClient<any, "public", any> | null = null;

  static get() {
    if (Superbase.client == null) {
      Superbase.client = createClient(
        process.env.NEXT_PUBLIC_SUPERBASE_URL!!,
        process.env.NEXT_PUBLIC_SUPERBASE_KEY!!
      );
    }

    return Superbase.client;
  }
}

export default Superbase;
