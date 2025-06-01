import { Button, Flex, Group, Modal, Text } from '@mantine/core'
import { useAuth } from '../../hooks'
import { useNotifications } from '../../hooks/useNotifications'
import { useRemoveCheckIn } from '../../hooks/useRemoveCheckIn'

interface CheckInDetailsModalProps {
  selectedCheckIn?: number
  opened: boolean
  close: () => void
}

export function CheckInDetailsModal({
  selectedCheckIn,
  opened,
  close,
}: CheckInDetailsModalProps) {
  const { user } = useAuth()
  const { error, success } = useNotifications()

  const { mutateAsync: removeCheckIn, isPending } = useRemoveCheckIn()
  async function handleRemoveCheckIn() {
    try {
      if (!selectedCheckIn || !user) {
        return
      }

      await removeCheckIn({
        userId: user?.id,
        checkInId: selectedCheckIn,
      })

      success({
        message: 'Removed check in successfully.',
      })

      close()
    }
    catch {
      error({
        message:
          'Unable to remove check in. Please try again in a moment.',
      })
    }
  }

  return (
    <Modal.Root opened={opened} onClose={close} size="lg">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Text size="xl" fw={600}>
              Check In Details
            </Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body p={24}>
          <Text size="md" fw={500}>
            Are you sure you want to remove this check in? This action cannot be
            undone.
          </Text>


          <Flex>
            <Button
              type="button"
              color="red"
              radius="md"
              disabled={isPending}
              loading={isPending}
              onClick={handleRemoveCheckIn}
            >
              Yes, remove it
            </Button>
          </Flex>

          <Group justify="flex-end" mt="md">
            <Button variant="default" color="gray" radius="md" onClick={close}>
              Close
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
