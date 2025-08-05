import { useAuth, useNotifications } from "@/hooks"
import { useIsMobile } from "@/hooks/useIsMobile"
import { Button, Checkbox, Flex, Group, Text, Textarea } from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import { useForm } from "@mantine/form"
import dayjs from "dayjs"
import { useState } from "react"
import { useAddCheckIn } from "../hooks/useAddCheckIn"

interface CreateEditFormProps {
    close: () => void
}

export function CreateEditForm({ close }: CreateEditFormProps) {
    const { user } = useAuth()
    const { success, error } = useNotifications()

    const isMobile = useIsMobile()

    const { mutateAsync: addCheckIn, isPending } = useAddCheckIn()

    const [selectedDate, setSelectedDate] = useState<Date>(dayjs().toDate())

    const form = useForm({
        initialValues: {
            date: dayjs().toDate(),
            activityIds: new Array<string>(),
            notes: ''
        },
        validate: {
            date: value => (!value ? 'Date is required' : null),
            activityIds: value => (value.length === 0 ? 'At least one activity must be selected' : null),
        },
    })

    const handleOnSubmit = async (values: { activityIds: string[], date: Date, notes: string }) => {
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

            form.reset()
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
        <form
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
            onSubmit={form.onSubmit(handleOnSubmit)}
        >
            <Checkbox.Group
                label="Activities"
                withAsterisk
                key={form.key('activityIds')}
                {...form.getInputProps('activityIds', { type: 'checkbox' })}
            >
                <Group my="xs" gap="xs" dir='column'>
                    <Checkbox value="1" label="Strength Training" />
                    <Checkbox value="2" label="Running" />
                </Group>
            </Checkbox.Group>


            <Flex justify='center'>
                <DatePicker numberOfColumns={isMobile ? 1 : 2} value={selectedDate} onChange={(date) => {
                    form.setFieldValue('date', date as Date);
                    form.validateField('date');
                    setSelectedDate(date as Date);
                }} />
            </Flex>
            {form.errors.date && (
                <Text c="red" size="xs">
                    {form.errors.date}
                </Text>
            )}

            <div>
                <Textarea
                    label="Notes"
                    placeholder="Enter some notes..."
                    rows={5}
                    maxLength={500}
                    key={form.key('notes')}
                    {...form.getInputProps('notes')}
                />
                <Text size="sm" c="dimmed" mt={4}>
                    {form.values.notes.length} / 500
                </Text>
            </div>

            <Group justify="flex-end">
                <Button
                    type="submit"
                    color="green"
                    radius="md"
                    disabled={isPending}
                    loading={isPending}
                >
                    Add
                </Button>
            </Group>
        </form>
    )
}