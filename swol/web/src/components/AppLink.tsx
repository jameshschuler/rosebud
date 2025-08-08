import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, NavLink } from '@mantine/core'
import { Link, useLocation } from '@tanstack/react-router'
import { useMemo } from 'react'
import { SWOL_GREEN } from '@/theme'

interface AppLinkProps {
  to: string
  label: string
  icon: IconDefinition
  onClick?: () => void
}

export function AppLink({ onClick, to, label, icon }: AppLinkProps) {
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
          <FontAwesomeIcon icon={icon} size={isActive ? 'xl' : undefined} color={isActive ? SWOL_GREEN : 'gray'} />
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
