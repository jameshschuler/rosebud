import { Button, Group, Modal, Text } from '@mantine/core'

interface RemoveCheckInModalProps {
  opened: boolean
  close: () => void
}

export function RemoveCheckInModal({ opened, close }: RemoveCheckInModalProps) {
  return (
    <Modal.Root opened={opened} onClose={close} size="lg">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Remove Check In</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body p={24}>
          {/* <form
              onSubmit={form.onSubmit(async (values) => {
                try {
                //   await addCheckIn({
                //     userId: user.id,
                //     date: values.date,
                //   })

                  notifications.show({
                    title: 'Success!',
                    message: 'Added check in successfully.',
                    color: 'green',
                    icon: <FontAwesomeIcon icon={faCheck} />,
                    withBorder: true,
                    autoClose: 2000,
                    radius: 'md',
                  })

                  close()
                } catch (error) {
                  console.error(error)
                  // TODO: add toast
                }
              })}
            > */}
          <Text size="md">Are you sure?</Text>

          <Group justify="flex-end" mt="md">
            <Button variant="default" color="gray" onClick={close}>
              Cancel
            </Button>
            <Button
              type="button"
              color="red"
              //   disabled={isPending}
              //   loading={isPending}
            >
              Remove
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
