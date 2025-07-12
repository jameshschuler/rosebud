import { Activity } from '@/types/checkIns'
import { faDumbbell, faRunning, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge, Button, Divider, Flex, Modal, Text, ThemeIcon, Tooltip } from '@mantine/core'
import { useState } from 'react'
import { useAuth, useModal } from '../../hooks'
import { useRemoveCheckIn } from '../../hooks/api/useRemoveCheckIn'
import { useNotifications } from '../../hooks/useNotifications'
import { ConfirmModal } from './ConfirmModal'

const iconMap: Record<number, IconDefinition> = {
  1: faDumbbell,
  2: faRunning,
}

interface CheckInDetailsModalProps {
  selectedCheckIns?: { checkInDate: string, details: { id: number, activity: Activity }[] }
  opened: boolean
  close: () => void
}

export function CheckInDetailsModal({
  selectedCheckIns,
  opened,
  close,
}: CheckInDetailsModalProps) {
  const { user } = useAuth()
  const { error, success } = useNotifications()

  const confirmModal = useModal(false)

  const { mutateAsync: removeCheckIn, isPending } = useRemoveCheckIn()

  const [selectedActivities, setSelectedActivities] = useState<Set<number>>()

  async function handleRemoveCheckIn() {
    try {
      if (!selectedCheckIns || !user || !selectedActivities || selectedActivities.size === 0) {
        return
      }

      await removeCheckIn({
        checkInIds: Array.from(selectedActivities)
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

  function toggleCheckInSelection(checkInId: number) {
    if (!selectedCheckIns) {
      setSelectedActivities(new Set([checkInId]))
      return
    }

    const newSelection = new Set(selectedActivities)
    if (newSelection.has(checkInId)) {
      newSelection.delete(checkInId)
    } else {
      newSelection.add(checkInId)
    }

    setSelectedActivities(newSelection)
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
              {selectedCheckIns?.details.map((detail) => {
                return (
                  <Tooltip key={detail.id} label={detail.activity.name}>
                    <ThemeIcon variant="outline" color={selectedActivities?.has(detail.id) ? 'red' : 'blue'} size='lg' p='md' style={{ cursor: 'pointer' }} onClick={() => toggleCheckInSelection(detail.id)}>
                      <FontAwesomeIcon icon={iconMap[detail.activity.id]} size='lg' />
                    </ThemeIcon>
                  </Tooltip>
                )
              })}
            </Flex>
            <Divider my='lg' />
            <Flex align={'center'} justify='center'>
              {selectedActivities?.size !== 0 && (
                <Button
                  onClick={handleRemoveCheckIn}
                  variant="outline"
                  color="red"
                  radius="md"
                  leftSection={<FontAwesomeIcon icon={faTrashAlt} />}
                  rightSection={
                    selectedActivities?.size ? <Badge size="xs" color="red">{selectedActivities?.size}</Badge> : undefined
                  }
                >
                  Remove
                </Button>
              )}
            </Flex>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root >
      <ConfirmModal opened={confirmModal.opened} close={confirmModal.close} onConfirm={handleRemoveCheckIn} isPending={isPending} />
    </>
  )
}
