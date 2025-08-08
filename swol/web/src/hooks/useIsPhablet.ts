import { useIsMobile } from './useIsMobile'
import { useIsTablet } from './useIsTablet'

export function useIsPhablet() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  return isMobile || isTablet
}
