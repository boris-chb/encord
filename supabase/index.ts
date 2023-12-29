import { Database } from '@/lib/database.types';
import {
  createBrowserClient,
  createServerClient as createSSR,
} from '@supabase/ssr';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cache } from 'react';

export const createServerClient = cache(function createClient(
  cookieStore: ReadonlyRequestCookies
) {
  // creates and returns ssr client

  return createSSR<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
});

export const browserClient = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);
