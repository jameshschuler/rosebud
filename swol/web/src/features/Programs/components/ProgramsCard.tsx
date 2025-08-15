import { faChevronLeft, faFloppyDisk, faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Button, Card, Flex, Group, Input, Menu, ScrollArea, Select, Text, Textarea } from '@mantine/core'
import { useState } from 'react'
import { useIsMobile } from '@/hooks'
import { ProgramsList } from './ProgramsList'
import { CreateEditProgram } from './CreateEditProgram'

// TODO: if user has active program, and we're adding or setting a different current program, we should prompt the user
// to confirm they want to change their current program
interface MenuActionProps {
  onClick: () => void
  icon: IconDefinition
}

function MenuAction({ onClick, icon }: MenuActionProps) {
  return (
    <Menu.Target>
      <ActionIcon
        variant="subtle"
        color="gray"
        size="lg"
        onClick={onClick}
      >
        <FontAwesomeIcon size="lg" icon={icon} />
      </ActionIcon>
    </Menu.Target>
  )
}

// TODO: debounce search
export function ProgramsCard() {
  const isMobile = useIsMobile()
  const [mode, setMode] = useState<'read' | 'create' | 'edit'>('read')

  return (
    <Card shadow="md" radius="md">
      <Card.Section py={16} px={24} withBorder>
        <Group justify="space-between">
          <Text fw={500}>Programs</Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <MenuAction
              onClick={() => {
                setMode(mode === 'read' ? 'create' : 'read')
              }}
              icon={mode === 'read' ? faPlus : faFloppyDisk}
            />
          </Menu>
        </Group>
      </Card.Section>
      {/* TODO: move to separate component? */}
      {mode === 'read' && (
        <>
          <Card.Section p={24}>
            <Input name="search" placeholder="Search by name, author, and program type..." size="md" />
          </Card.Section>
          <Card.Section px={24} pb={24} mih={250}>
            <ProgramsList />
          </Card.Section>
        </>
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
              <CreateEditProgram />
            </ScrollArea>
          </Card.Section>
        </>
      )}
    </Card>
  )
}
