import type { Session, User } from '@supabase/supabase-js'
import { createContext } from 'react'

export interface AuthContextProps {
  isAuthenticated: boolean
  session: Session | null
  user: User | null
  signIn: (provider: 'github' | 'google') => {}
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps | null>(null)
