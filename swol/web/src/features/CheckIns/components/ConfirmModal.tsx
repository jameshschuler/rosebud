import { Button, Group, Modal, Text } from '@mantine/core'

interface ConfirmModalProps {
  opened: boolean
  close: () => void
  onConfirm: () => void
  isPending: boolean
}

export function ConfirmModal({ opened, close, onConfirm, isPending }: ConfirmModalProps) {
  return (
    <Modal.Root opened={opened} onClose={close} size="lg">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Text size="xl" fw={600}>
              Confirm
            </Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body px={24}>
          <Text size="md" fw={500}>
            Are you sure you want to remove this check in? This action cannot be
            undone.
          </Text>
          <Group justify="flex-end" mt="md">
            <Button
              type="button"
              color="red"
              radius="md"
              disabled={isPending}
              loading={isPending}
              onClick={onConfirm}
            >
              Yes, remove it
            </Button>
            <Button variant="default" color="gray" radius="md" onClick={close}>

              Close
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
