import { Button, Group, Modal } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import dayjs from 'dayjs'
import { useAuth } from '../hooks'
import { useAddCheckIn } from '../hooks/useAddCheckIn'
import { useNotifications } from '../hooks/useNotifications'

interface AddCheckInModalProps {
  opened: boolean
  close: () => void
}

export function AddCheckInModal({ opened, close }: AddCheckInModalProps) {
  const { user } = useAuth()
  const { success, error } = useNotifications()

  const { mutateAsync: addCheckIn, isPending } = useAddCheckIn()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      date: dayjs().toDate(),
    },

    validate: {
      date: (value) => (!value ? 'Date is required' : null),
    },
  })

  return (
    <Modal.Root opened={opened} onClose={close} size="lg">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>New Check In</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body p={24}>
          <form
            onSubmit={form.onSubmit(async (values) => {
              try {
                if (!user) {
                  return
                }

                await addCheckIn({
                  userId: user.id,
                  date: values.date,
                })

                success({
                  message: 'Added check in successfully.',
                })

                close()
              } catch {
                error({
                  message:
                    'Unable to add check in. Please try again in a moment.',
                })
              }
            })}
          >
            <DateInput
              withAsterisk
              label="Date"
              placeholder="Check In Date"
              key={form.key('date')}
              maxDate={new Date()}
              {...form.getInputProps('date')}
            />

            <Group justify="flex-end" mt="md">
              <Button variant="default" color="gray" onClick={close}>
                Cancel
              </Button>
              <Button
                type="submit"
                color="yellow"
                disabled={isPending}
                loading={isPending}
              >
                Add
              </Button>
            </Group>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
