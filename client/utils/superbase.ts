import { createClient, SupabaseClient } from "@supabase/supabase-js";

class Superbase {
  private static client: SupabaseClient<any, "public", any> | null = null;

  static get() {
    if (Superbase.client == null) {
      Superbase.client = createClient("", "");
    }

    return Superbase.client;
  }
}

export default Superbase;
