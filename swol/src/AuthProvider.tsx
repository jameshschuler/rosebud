import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { supabase } from './lib'

async function signIn() {
  await supabase.auth.signInWithOAuth({ provider: 'github' })
}

async function signOut() {
  await supabase.auth.signOut()
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [auth, setAuth] = useState(false)
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
        setAuth(true)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setAuth(false)
      }
    })
    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ auth, user, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
