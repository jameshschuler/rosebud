import { Session, User } from '@supabase/supabase-js'
import { createContext } from 'react'

export interface AuthContext {
  isAuthenticated: boolean,
  session: Session | null,
  user: User | null,
  signIn: (provider: 'github' | 'google') => {},
  signOut(): Promise<void>,
}

export const AuthContext = createContext<AuthContext | null>(null)
