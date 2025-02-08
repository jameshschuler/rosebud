import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

export const supabase = createClient<Database>(
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_LOCAL_SUPABASE_URL
    : import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_LOCAL_SUPABASE_ANON_KEY
    : import.meta.env.VITE_SUPABASE_ANON_KEY!,
)
