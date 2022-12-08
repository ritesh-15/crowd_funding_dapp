import { createClient, SupabaseClient } from "@supabase/supabase-js";

class Superbase {
  private static client: SupabaseClient<any, "public", any> | null = null;

  static get() {
    if (Superbase.client == null) {
      Superbase.client = createClient(
        "https://wvgquckrarvztcgkdsxk.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2Z3F1Y2tyYXJ2enRjZ2tkc3hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA1MTA2NTEsImV4cCI6MTk4NjA4NjY1MX0.CIkuP4awKkx52Ce22e8yrNpgjM2EIg5BY6P9gUPkqpg"
      );
    }

    return Superbase.client;
  }
}

export default Superbase;
