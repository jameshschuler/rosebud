import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider, Drawer, Text } from '@mantine/core'
import { useIsPhablet } from '@/hooks'
import { AddCheckInForm } from './AddCheckInForm'

interface AddCheckInDrawerProps {
  opened: boolean
  close: () => void
}

export function AddCheckInDrawer({ opened, close }: AddCheckInDrawerProps) {
  const isPhablet = useIsPhablet()

  return (
    <Drawer.Root
      opened={opened}
      onClose={close}
      position={isPhablet ? 'bottom' : 'right'}
      top={isPhablet ? 25 : 0}
      size={isPhablet ? '95%' : 'xl'}
    >
      <Drawer.Overlay />
      <Drawer.Content style={isPhablet
        ? {
            borderTopRightRadius: '16px',
            borderTopLeftRadius: '16px',
          }
        : {}}
      >
        <Drawer.Header p={24}>
          <Drawer.Title>
            <Text size="xl" fw={600}>
              New Check In
            </Text>
          </Drawer.Title>
          <Drawer.CloseButton icon={<FontAwesomeIcon icon={faCircleXmark} size="xl" />} />
        </Drawer.Header>
        <Divider mb="md" mx="md" />
        <Drawer.Body px={24} pb={16}>
          <AddCheckInForm close={close} />
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  )
}
