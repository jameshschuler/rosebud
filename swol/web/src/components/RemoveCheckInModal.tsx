import { Button, Group, Modal, Text } from '@mantine/core'
import { useAuth } from '../hooks'
import { useNotifications } from '../hooks/useNotifications'
import { useRemoveCheckIn } from '../hooks/useRemoveCheckIn'

interface RemoveCheckInModalProps {
  selectedCheckIn?: number
  opened: boolean
  close: () => void
}

export function RemoveCheckInModal({
  selectedCheckIn,
  opened,
  close,
}: RemoveCheckInModalProps) {
  const { user } = useAuth()
  const { error, success } = useNotifications()

  const { mutateAsync: removeCheckIn, isPending } = useRemoveCheckIn()

  return (
    <Modal.Root opened={opened} onClose={close} size="lg">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Text size="xl" fw={600}>
              Remove Check In
            </Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body p={24}>
          <Text size="md" fw={500}>
            Are you sure you want to remove this check in? This action cannot be
            undone.
          </Text>

          <Group justify="flex-end" mt="md">
            <Button variant="default" color="gray" radius="md" onClick={close}>
              Cancel
            </Button>
            <Button
              type="button"
              color="red"
              radius="md"
              disabled={isPending}
              loading={isPending}
              onClick={async () => {
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
              }}
            >
              Yes, remove it
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
