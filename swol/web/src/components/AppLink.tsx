import type { AppLinkData } from '@/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, NavLink } from '@mantine/core'
import { Link, useLocation } from '@tanstack/react-router'
import { useMemo } from 'react'
import { SWOL_GREEN } from '@/theme'

interface AppLinkProps {
  link: AppLinkData
  onClick?: () => void
}

export function AppLink({ onClick, link }: AppLinkProps) {
  const { activeIcon, icon, to, label } = link
  const location = useLocation()
  const isActive = useMemo(() => location.pathname === to, [to, location.pathname])

  return (
    <NavLink
      onClick={onClick}
      label={label}
      component={Link}
      to={to}
      leftSection={(
        <Box mr={12}>
          <FontAwesomeIcon icon={isActive ? activeIcon : icon} size={isActive ? 'xl' : undefined} color={isActive ? SWOL_GREEN : 'gray'} />
        </Box>
      )}
      bg="none"
      styles={{
        label: {
          fontSize: isActive ? 20 : 18,
          fontWeight: isActive ? 600 : 500,
          color: isActive ? SWOL_GREEN : 'gray',
        },
      }}
    />
  )
}
