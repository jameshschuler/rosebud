import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Menu } from '@mantine/core'

interface MenuActionProps {
  onClick: () => void
  icon: IconDefinition
  isPending?: boolean
}

export function MenuAction({ isPending, onClick, icon }: MenuActionProps) {
  return (
    <Menu.Target>
      <ActionIcon
        variant="subtle"
        color="gray"
        size="lg"
        onClick={onClick}
        loading={isPending}
      >
        <FontAwesomeIcon size="lg" icon={icon} />
      </ActionIcon>
    </Menu.Target>
  )
}