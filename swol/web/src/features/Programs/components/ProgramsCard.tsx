import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Card, Group, Input, Menu, Text } from '@mantine/core'
import { ProgramsCardContent } from './ProgramsCardContent'

// TODO: if user has active program, and we're adding or setting a different current program, we should prompt the user
// to confirm they want to change their current program

export function ProgramsCard() {
  return (
    <Card shadow="md" radius="md">
      <Card.Section py={16} px={24} withBorder>
        <Group justify="space-between">
          <Text fw={500}>Programs</Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => {
                  console.log('Add program clicked')
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </ActionIcon>
            </Menu.Target>
          </Menu>
        </Group>
      </Card.Section>
      <Card.Section p={24}>
        <Input placeholder="Search by name, author, and program type..." size="md" />
      </Card.Section>
      <Card.Section px={24} pb={24} mih={250}>
        <ProgramsCardContent />
      </Card.Section>
    </Card>
  )
}
