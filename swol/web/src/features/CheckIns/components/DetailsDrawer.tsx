import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider, Drawer, Text } from '@mantine/core'
import { useIsPhablet } from '@/hooks'
import { useGetAllCheckInsByIds } from '../hooks/useGetCheckInsByIds'

interface DetailsDrawerProps {
  opened: boolean
  close: () => void
  checkInIds: number[]
}

export function DetailsDrawer({ opened, close, checkInIds }: DetailsDrawerProps) {
  const isPhablet = useIsPhablet()

  console.log({ checkInIds })

  const { data, isLoading } = useGetAllCheckInsByIds({
    ids: checkInIds,
  })

  return (
    <Drawer.Root
      opened={opened}
      onClose={close}
      position={isPhablet ? 'bottom' : 'right'}
      top={isPhablet ? 25 : 0}
      size={isPhablet ? '95%' : 'lg'}
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
              Check In Details
            </Text>
          </Drawer.Title>
          <Drawer.CloseButton icon={<FontAwesomeIcon icon={faCircleXmark} size="xl" />} />
        </Drawer.Header>
        <Divider mb="md" mx="md" />
        <Drawer.Body px={24} pb={16}>
          <h1>Hello</h1>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  )
}
