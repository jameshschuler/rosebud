import { Accordion, ScrollArea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import { ConfirmModal } from '@/components/ConfirmModal'
import { useGetPrograms } from '../hooks/useGetPrograms'
import { useRemoveProgram } from '../hooks/useRemoveProgram'
import { ListError } from './ListError'
import { ListSkeleton } from './ListSkeleton'
import { NoData } from './NoData'
import { ProgramsContent } from './ProgramContent'

interface ProgramListProps {
  searchQuery?: string
}

export function ProgramsList({ searchQuery }: ProgramListProps) {
  const { data, isLoading, error } = useGetPrograms(searchQuery)
  const [opened, { open, close }] = useDisclosure(false)
  const { mutateAsync: removeProgram, isPending } = useRemoveProgram()

  const [selectedId, setSelectedId] = useState<number | null>(null)

  async function handleRemoveProgram() {
    await removeProgram({
      id: selectedId!,
    })

    close()
  }

  if (isLoading) {
    return <ListSkeleton />
  }

  if (error) {
    return <ListError />
  }

  if (!isLoading && data?.programs.length === 0) {
    return <NoData searchQuery={searchQuery} />
  }

  if (!isLoading && data && data?.programs.length > 0) {
    return (
      <>
        <ScrollArea h={300}>
          <Accordion radius="md">
            {data.programs.map(program => (
              <ProgramsContent 
                key={program.id} 
                program={program} 
                onDelete={() => {
                  setSelectedId(program.id)
                  open()
                }} 
              />
            ))}
          </Accordion>
        </ScrollArea>
        <ConfirmModal opened={opened} close={close} onConfirm={handleRemoveProgram} isPending={isPending} entityName="program" />
      </>
    )
  }

  return null
}
