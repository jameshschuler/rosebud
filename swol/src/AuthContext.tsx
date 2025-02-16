import { User } from '@supabase/supabase-js'
import { createContext } from 'react'

export const AuthContext = createContext({
  auth: false,
  user: null as User | null,
  signIn: () => {},
  signOut: () => {},
})
