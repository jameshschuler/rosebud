import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Checkbox, Divider, Flex, Input, Table, Text, Title, Tooltip } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import dayjs from 'dayjs'
import { useState } from 'react'
import { ResponsiveButton } from '@/components/ui/ResponsiveButton'
import { SWOL_GREEN } from '@/theme'
import { useGetPrograms } from '../hooks/useGetPrograms'
import { NoData } from './NoData'
import { TableLoader } from './TableLoader'

interface Program {
  id: number
  description: string | null
  name: string
  createdAt: string
  programType: string
  active: boolean
  author: string
}

function renderTableRows(isLoading: boolean, programs: Program[], setSelectedRow: React.Dispatch<React.SetStateAction<number | undefined>>, searchQuery?: string, selectedRow?: number) {
  if (isLoading) {
    return (
      <TableLoader rowCount={5} colCount={7} />
    ) 
  }

  if (programs.length === 0) {
    return (
      <Table.Tr>
        <Table.Td colSpan={7}>
          <NoData searchQuery={searchQuery} />
        </Table.Td>
      </Table.Tr>
    )
  }

  return (
    <>
      {(programs.map(program => (
        <Table.Tr key={program.id} bg={selectedRow === program.id ? 'var(--mantine-color-blue-light)' : undefined}>
          <Table.Td>
            <Checkbox
              aria-label="Select row"
              checked={selectedRow === program.id}
              disabled={selectedRow !== undefined && selectedRow !== program.id}
              onChange={(event) => {
                setSelectedRow(event.currentTarget.checked ? program.id : undefined)
              }}
            />
          </Table.Td>
          <Table.Td>{program.name}</Table.Td>
          <Table.Td>{program.programType}</Table.Td>
          <Table.Td>{program.author}</Table.Td>
          <Table.Td maw={200}>
            <Tooltip multiline w={200} label={program.description} withArrow>
              <Text truncate="end" size="sm">{program.description?.substring(0, 50)}</Text>
            </Tooltip>
          </Table.Td>
          <Table.Td>{program.active ? 'Yes' : 'No'}</Table.Td>
          <Table.Td>{dayjs(program.createdAt).format('MM/DD/YYYY')}</Table.Td>
        </Table.Tr>
      ))
      )}
    </>
  )
}

export function ProgramsTable() {
  const [selectedRow, setSelectedRow] = useState<number>()
  const [searchQuery, setSearchQuery] = useState('')
  const [debounced] = useDebouncedValue(searchQuery, 300)
  const { data, isLoading } = useGetPrograms(debounced)
  
  return (
    <Flex direction="column">
      <Flex justify="space-between">
        <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} variant="unstyled" size="md" w="50%" placeholder="Search by name, author, or program type..." />
        <ResponsiveButton
          icon={<FontAwesomeIcon icon={faPlus} size="lg" />}
          onClick={() => { }}
          label="Add Program"
          color={SWOL_GREEN}
        />
      </Flex>
      <Divider my={24} />
      <Title size={24}>Programs</Title>
      <Table mt={24} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>Name</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Author</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Current</Table.Th>
            <Table.Th>Created</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{renderTableRows(isLoading, data?.programs ?? [], setSelectedRow, debounced, selectedRow)}</Table.Tbody>
      </Table>
    </Flex>
  )
}
