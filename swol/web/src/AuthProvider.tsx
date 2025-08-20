import type { Session, User } from '@supabase/supabase-js'
import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from './AuthContext'
import { supabase } from './lib'

async function signIn(provider: 'github' | 'google' = 'github') {
  await supabase.auth.signInWithOAuth({ provider })
}

async function signOut() {
  await supabase.auth.signOut()
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const contextValue = useMemo(() => ({
    isAuthenticated: !!user,
    session,
    user,
    signIn,
    signOut,
  }), [session, user])

  return (
    <AuthContext value={contextValue}>
      {!loading && children}
    </AuthContext>
  )
}
