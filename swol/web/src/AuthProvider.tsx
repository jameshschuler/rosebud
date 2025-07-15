import type { Session, User } from '@supabase/supabase-js'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
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
  const [auth, setAuth] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState<boolean | null>(null)

  useEffect(() => {
    setLoading(true)
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      const { user: currentUser } = data
      setUser(currentUser)
      setAuth(!!currentUser)
      setLoading(false)
    }
    getUser()

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null)
        setSession(session)
        setAuth(true)
      }
      else if (event === 'SIGNED_OUT') {
        setUser(null)
        setAuth(false)
        setSession(null)
      }
    })
    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ auth, session, user, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
