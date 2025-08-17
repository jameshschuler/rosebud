import { faDumbbell, faPersonRunning, faStar, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Accordion, ActionIcon, Flex, Group, Text } from '@mantine/core'

interface ProgramsContentProps {
  program: {
    id: number
    name: string
    createdAt: string
    updatedAt: string | null
    description: string | null
    userId: string
    programType: string
    active: boolean
    author: string
  }
  onDelete: () => void
}

export function ProgramsContent({ onDelete, program }: ProgramsContentProps) {
  return (
    <Accordion.Item value={program.id.toString()}>
      <Accordion.Control>
        <Flex direction="column">
          <Group>
            <Text fw="500">{program.name}</Text>
            {program.active && <FontAwesomeIcon color="gold" icon={faStar} />}
          </Group>
          <Text size="sm">{program.author}</Text>
        </Flex>
      </Accordion.Control>
      <Accordion.Panel pt={11}>
        <Flex align="center" mb={8} gap={8}>
          <FontAwesomeIcon size="sm" fixedWidth icon={program.programType === 'Running' ? faPersonRunning : faDumbbell} />
          <Text size="sm">{program.programType}</Text>
        </Flex>
        <Text size="sm">{program.description}</Text>
        <Flex justify="center" mt={24}>
          <ActionIcon variant="transparent" onClick={onDelete}>
            <FontAwesomeIcon color="red" icon={faTrashCan} />
          </ActionIcon>
        </Flex>
      </Accordion.Panel>
    </Accordion.Item>
  )
}
