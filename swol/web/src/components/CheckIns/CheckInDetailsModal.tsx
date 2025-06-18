import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faDumbbell, faRunning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Divider, Flex, Modal, Text, ThemeIcon } from '@mantine/core'
import { useAuth, useModal } from '../../hooks'
import { useNotifications } from '../../hooks/useNotifications'
import { useRemoveCheckIn } from '../../hooks/useRemoveCheckIn'
import { ConfirmModal } from './ConfirmModal'

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

  const confirmModal = useModal(false)

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

      confirmModal.close()
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
    <>
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
          <Modal.Body px={24}>
            <Text size="md" fw={500}>
              Activities
            </Text>
            <Flex gap={'xs'} mt={'xs'}>
              <ThemeIcon variant="outline" size='lg' p='md'>
                <FontAwesomeIcon icon={faDumbbell} size='lg' />
              </ThemeIcon>
              <ThemeIcon variant="outline" size='lg' p='md'>
                <FontAwesomeIcon icon={faRunning} size='lg' />
              </ThemeIcon>
            </Flex>
            <Divider my='lg' />
            <Flex align={'center'} justify='center'>
              <ActionIcon variant="light" aria-label="Remove check in" color='red' onClick={confirmModal.open}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </ActionIcon>
            </Flex>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <ConfirmModal opened={confirmModal.opened} close={confirmModal.close} onConfirm={handleRemoveCheckIn} isPending={isPending} />
    </>
  )
}
