import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Flex, VisuallyHidden } from '@mantine/core'
import { Link, useLocation } from '@tanstack/react-router'
import { useCallback } from 'react'
import { navLinks } from '@/constants'
import { SWOL_GREEN } from '@/theme'

export function Toolbar() {
  const location = useLocation()
  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname])

  return (
    <Flex
      justify="space-between"
      w="100%"
      pos="fixed"
      bottom={0}
      left={0}
      p={16}
      bg="white"
      style={{
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {navLinks.map((link) => {
        return (
          <ActionIcon key={link.to} variant="transparent" aria-label={link.label} size={48} component={Link} to={link.to} color={isActive(link.to) ? SWOL_GREEN : 'gray'}>
            <FontAwesomeIcon icon={link.icon} size="2xl" />
            <VisuallyHidden>{link.label}</VisuallyHidden>
          </ActionIcon>
        )
      })}
    </Flex>
  )
}
