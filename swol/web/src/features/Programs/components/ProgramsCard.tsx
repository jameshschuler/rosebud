import { faChevronLeft, faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Flex, Group, Input, Menu, ScrollArea, Select, Text, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { useAddProgram } from '../hooks/useAddProgram'
import { MenuAction } from './MenuAction'
import { ProgramsListContainer } from './ProgramsListContainer'

interface FormValues {
  name: string
  programType: string
  setAsCurrent: string
  author?: string
  description?: string
}

export function ProgramsCard() {
  const [mode, setMode] = useState<'read' | 'create' | 'edit'>('read')

  const { mutateAsync: addProgram, isPending } = useAddProgram()

  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      author: '',
      description: '',
      programType: '',
      setAsCurrent: 'No',
    },
    validate: {
      name: value => (!value ? 'Name is required' : null),
      programType: value => (!value ? 'Program type is required' : null),
      setAsCurrent: value => (value === '' ? 'Set as current program is required' : null),
    },
  })

  const handleOnSubmit = async (values: FormValues) => {
    await addProgram({
      name: values.name,
      programType: values.programType,
      active: values.setAsCurrent === 'Yes',
      author: values.author || '',
      description: values.description || '',
    })

    setMode('read')
    form.reset()
  }

  return (
    <Card shadow="md" radius="md">
      <Card.Section py={16} px={24} withBorder>
        <Group justify="space-between">
          <Text fw={500}>My Programs</Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <MenuAction
              isPending={isPending}
              onClick={async () => {
                if (mode === 'create') {
                  await handleOnSubmit(form.values)
                }
                else {
                  setMode('create')
                }
              }}
              icon={mode === 'read' ? faPlus : faFloppyDisk}
            />
          </Menu>
        </Group>
      </Card.Section>
      {mode === 'read' && (
        <ProgramsListContainer />
      )}
      {mode === 'create' && (
        <>
          <Card.Section p={24}>
            <Flex align="center">
              <Button pl={0} onClick={() => setMode('read')} leftSection={<FontAwesomeIcon icon={faChevronLeft} />} variant="transparent" color="dark">
                Back
              </Button>
            </Flex>
            <ScrollArea mt={16} h={300}>
              <form onSubmit={form.onSubmit(handleOnSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <Input.Wrapper label="Name" size="md" required>
                  <Input
                    size="md"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                    placeholder="Enter a name..."
                    maxLength={100}
                  />
                </Input.Wrapper>
                <Select
                  size="md"
                  required
                  label="Program Type"
                  placeholder="Select program type"
                  data={['Strength Training', 'Running']}
                  key={form.key('programType')}
                  {...form.getInputProps('programType')}
                />
                <Select
                  size="md"
                  defaultValue="No"
                  description="Only one current program per type is allowed."
                  label="Set as Current Program"
                  data={['Yes', 'No']}
                  key={form.key('setAsCurrent')}
                  {...form.getInputProps('setAsCurrent')}
                />
                <Input.Wrapper label="Author" size="md">
                  <Input 
                    size="md"
                    placeholder="Enter an author..." 
                    maxLength={100}
                    key={form.key('author')}
                    {...form.getInputProps('author')}
                  />
                </Input.Wrapper>
                <Textarea
                  label="Description"
                  placeholder="Enter a description..."
                  rows={5}
                  maxLength={500}
                  size="md"
                  key={form.key('description')}
                  {...form.getInputProps('description')}
                />
              </form>
            </ScrollArea>
          </Card.Section>
        </>
      )}
    </Card>
  )
}
