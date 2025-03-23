import { ActionIcon, Button, MantineColor } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { ReactNode } from 'react'

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
  const isMobile = useMediaQuery('(max-width: 768px)')

  return isMobile ? (
    <ActionIcon
      onClick={onClick}
      size="lg"
      color={color}
      variant="filled"
      radius="md"
    >
      {icon}
    </ActionIcon>
  ) : (
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
