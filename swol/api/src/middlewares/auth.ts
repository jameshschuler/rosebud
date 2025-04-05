import env from '@/env';
import { createClient } from '@supabase/supabase-js';
import type { Context, Next } from 'hono';
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

let supabaseClient: ReturnType<typeof createClient> | null = null

function getSupabaseClient() {
  if (supabaseClient) {
    return supabaseClient
  }

  const { SUPABASE_URL, SUPABASE_ANON_KEY } = env

  supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  return supabaseClient
}

export async function authMiddleware(c: Context, next: Next) {
    const supabase = getSupabaseClient()

    const authHeader = c.req.header('Authorization')
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: HttpStatusPhrases.UNAUTHORIZED }, HttpStatusCodes.UNAUTHORIZED)
    }
  
    const token = authHeader.split(' ')[1]
  
    const { data, error } = await supabase.auth.getUser(token)
  
    if (error || !data?.user) {
      return c.json({ error: HttpStatusPhrases.UNAUTHORIZED }, HttpStatusCodes.UNAUTHORIZED)
    }
  
    c.set('user', data.user)
  
    await next()
}
