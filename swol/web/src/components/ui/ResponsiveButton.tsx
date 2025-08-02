import { useIsMobile } from '@/hooks/useIsMobile'
import type { MantineColor } from '@mantine/core'
import { ActionIcon, Button } from '@mantine/core'
import type { ReactNode } from 'react'

interface ResponsiveButtonProps {
  color?: MantineColor
  onClick: () => void
  label: string
  icon?: ReactNode
}

export function ResponsiveButton({
  color = 'yellow',
  onClick,
  label,
  icon,
}: ResponsiveButtonProps) {
  const isMobile = useIsMobile()

  return isMobile
    ? (
      <ActionIcon
        onClick={onClick}
        size="lg"
        color={color}
        variant="filled"
        radius="md"
      >
        {icon}
      </ActionIcon>
    )
    : (
      <Button
        radius="md"
        leftSection={icon}
        variant="filled"
        color={color}
        onClick={onClick}
      >
        {label}
      </Button>
    )
}
