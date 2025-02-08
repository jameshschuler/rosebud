import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Modal,
  Title,
} from '@mantine/core'
import '@mantine/core/styles.css'
import { DateInput } from '@mantine/dates'
import '@mantine/dates/styles.css'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useMemo } from 'react'
import { useAuth } from './AuthProvider'
import { AppBar } from './components/AppBar'
import { ListSkeleton } from './components/ListSkeleton'
import { NoData } from './components/NoData'
import { useAddCheckIn } from './hooks/useAddCheckIn'
import { useGetCheckIns } from './hooks/useGetCheckIns'

dayjs.extend(utc)

function App() {
  const { auth, signIn, user } = useAuth()

  const [opened, { open, close }] = useDisclosure(false)

  const { data, error, isLoading: loadingCheckIns } = useGetCheckIns(user?.id)

  const { mutateAsync: addCheckIn, isPending } = useAddCheckIn()

  // TODO: move to hook (useTransformCheckIns)
  const checkIns = useMemo(() => {
    const checkIns = new Map<
      string,
      Map<string, { id: number; checkInDate: string }[]>
    >()

    if (!data) {
      return checkIns
    }

    data.forEach((d) => {
      const date = dayjs(d.checkin_date)
      const year = date.format('YYYY')
      const month = date.format('MMMM')

      if (!checkIns.has(year)) {
        checkIns.set(year, new Map())
      }

      const yearMap = checkIns.get(year)
      const monthCheckIns = yearMap?.get(month)
      if (!monthCheckIns) {
        yearMap?.set(month, [
          { id: d.id, checkInDate: dayjs(d.checkin_date).format('MM-DD-YYYY') },
        ])
      } else {
        monthCheckIns.push({
          id: d.id,
          checkInDate: dayjs(d.checkin_date).format('MM-DD-YYYY'),
        })
      }
    })

    return checkIns
  }, [data])

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      date: dayjs().toDate(),
    },

    validate: {
      date: (value) => (!value ? 'Date is required' : null),
    },
  })

  if (!auth || !user) {
    // TODO: improve design, should still show app bar
    return (
      <Flex justify="center" align="center" style={{ height: '100vh' }}>
        <Button onClick={signIn}>Sign in</Button>
      </Flex>
    )
  }

  const hasCheckIns = checkIns.size !== 0

  return (
    <>
      <Box p="xl">
        <AppBar />
        <Container size="lg" py="xl">
          <Flex justify="space-between" align="center" mt="xl">
            <Title>Your Check Ins</Title>
            <Flex gap={8} align="center">
              {false && (
                <ActionIcon
                  variant="transparent"
                  aria-label="Delete Check In"
                  color="pink"
                >
                  <FontAwesomeIcon icon={faTrashCan} size="xl" />
                </ActionIcon>
              )}
              {hasCheckIns && (
                <Button
                  leftSection={<FontAwesomeIcon icon={faPlus} size="xl" />}
                  variant="filled"
                  color="yellow"
                  onClick={open}
                >
                  New Check In
                </Button>
              )}
            </Flex>
          </Flex>
          <Box py="xl">
            {loadingCheckIns && <ListSkeleton />}
            {error && <div>Error: {error.message}</div>}
            {!error && !loadingCheckIns && data && (
              <Flex direction="column">
                {!hasCheckIns && <NoData onAction={open} />}

                {[...checkIns].map(([year, months]) => (
                  <Box key={year}>
                    <Title order={2}>{year}</Title>
                    <Flex direction="column" mt="lg" gap={32}>
                      {[...months].map(([month, data]) => (
                        <Box key={month}>
                          <Title size="md" order={3}>
                            {month}
                          </Title>
                          <Flex gap={16} wrap="wrap" mt="md">
                            {data.map((d) => (
                              <Button
                                style={{
                                  boxShadow: '4px 4px 0px black',
                                }}
                                w={140}
                                key={d.id}
                                variant="outline"
                                color="black"
                                radius="md"
                              >
                                {dayjs(d.checkInDate).format('MMMM DD')}
                              </Button>
                            ))}
                          </Flex>
                        </Box>
                      ))}
                    </Flex>
                    <Divider my="xl" />
                  </Box>
                ))}
              </Flex>
            )}
          </Box>
        </Container>
      </Box>
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
                  await addCheckIn({
                    userId: user.id,
                    date: values.date,
                  })

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
            >
              <DateInput
                withAsterisk
                label="Date"
                placeholder="Check In Date"
                key={form.key('date')}
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
    </>
  )
}

export default App
