import type { Session, User } from '@supabase/supabase-js'
import { createContext } from 'react'

export const AuthContext = createContext({
  auth: false,
  session: null as Session | null,
  user: null as User | null,
  signIn: (provider: 'github' | 'google') => { },
  signOut: () => { },
})
