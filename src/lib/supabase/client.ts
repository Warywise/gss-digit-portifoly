import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.PUBLIC_SUPABASE_URL as string,
    process.env.PUBLIC_SUPABASE_ANON_KEY as string,
  );
}
