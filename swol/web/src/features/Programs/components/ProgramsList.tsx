import { faAt, faDumbbell, faPersonRunning, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Accordion, Flex, Group, ScrollArea, Text } from '@mantine/core'
import { useGetPrograms } from '../hooks/useGetPrograms'
import { ListError } from './ListError'
import { ListSkeleton } from './ListSkeleton'
import { NoData } from './NoData'

export function ProgramsList() {
  const { data, isLoading, error } = useGetPrograms()

  if (isLoading) {
    return <ListSkeleton />
  }

  if (error) {
    return <ListError />
  }

  if (!isLoading && data?.programs.length === 0) {
    return <NoData />
  }

  if (!isLoading && data && data?.programs.length > 0) {
    return (
      <ScrollArea h={300}>
        <Accordion radius="md">
          {data.programs.map(program => (
            <Accordion.Item key={program.id} value={program.id.toString()}>
              <Accordion.Control>
                <Group>
                  <Text>{program.name}</Text>
                  {program.active && <FontAwesomeIcon color="gold" icon={faStar} />}
                </Group>
              </Accordion.Control>
              <Accordion.Panel pt={11}>
                <Flex align="center" mb={8} gap={4}>
                  <FontAwesomeIcon size="sm" fixedWidth icon={program.programType === 'Running' ? faPersonRunning : faDumbbell} />
                  <Text>{program.programType}</Text>
                </Flex>
                <Flex align="center" mb={8} gap={4}>
                  <FontAwesomeIcon size="sm" fixedWidth icon={faAt} />
                  <Text>{program.author}</Text>
                </Flex>
                <Text size="sm">{program.description}</Text>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </ScrollArea>
    )
  }

  return null
}
