import { useAddCheckIn } from '@/hooks/api/useAddCheckIn'
import { Button, Checkbox, Group, Modal, Text } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import dayjs from 'dayjs'
import { useAuth } from '../../hooks'
import { useNotifications } from '../../hooks/useNotifications'

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
      activityIds: new Array<string>(),
    },
    validate: {
      date: value => (!value ? 'Date is required' : null),
      activityIds: value => (value.length === 0 ? 'At least one activity must be selected' : null),
    },
  })

  const handleOnSubmit = async (values: { activityIds: string[], date: Date }) => {
    try {
      if (!user) {
        return
      }

      await addCheckIn({
        checkinDate: dayjs(values.date).utc().format(),
        activityIds: values.activityIds.map(id => parseInt(id, 10)),
      })

      success({
        message: `Added ${values.activityIds.length > 1 ? 'check ins' : 'check in'} successfully.`,
      })

      close()
    }
    catch {
      error({
        message:
          'Unable to add check in. Please try again in a moment.',
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
              New Check In
            </Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body px={24}>
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            onSubmit={form.onSubmit(handleOnSubmit)}
          >
            <DateInput
              withAsterisk
              label="Date"
              placeholder="Check In Date"
              maxDate={new Date()}
              key={form.key('date')}
              {...form.getInputProps('date')}
            />

            <Checkbox.Group
              label="Activities"
              withAsterisk
              key={form.key('activityIds')}
              {...form.getInputProps('activityIds', { type: 'checkbox' })}
            >
              <Group mt="xs" gap="xs" dir='column'>
                <Checkbox value="1" label="Strength Training" />
                <Checkbox value="2" label="Running" />
              </Group>
            </Checkbox.Group>

            <Group justify="flex-end" mt="md">
              <Button
                variant="default"
                color="gray"
                radius="md"
                onClick={close}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="yellow"
                radius="md"
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
