import type { AppType } from '@api/app'
import { hc } from 'hono/client'
import { useMemo } from 'react'
import { useAuth } from './useAuth'

export type Client = ReturnType<typeof hc<AppType>>

export function useGetHonoClient() {
  const { session } = useAuth()

  const client = useMemo(() => {
    if (!session?.access_token) {
      throw new Error('Access token is missing, cannot create Hono client.')
    }

    return hc<AppType>(import.meta.env.VITE_API_URL, {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
        Accept: 'application/json',
      },
    })
  }, [session?.access_token])

  return {
    client,
  }
}
