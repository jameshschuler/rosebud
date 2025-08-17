import { Card, Input } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks';
import { useState } from 'react'
import { ProgramsList } from './ProgramsList'

export function ProgramsContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [debounced] = useDebouncedValue(searchQuery, 300)

  return (
    <>
      <Card.Section p={24}>
        <Input 
          name="search" 
          placeholder="Search by name, author, or program type..." 
          size="md" 
          value={searchQuery} 
          onChange={e => setSearchQuery(e.target.value)} 
          autoComplete="off"
        />
      </Card.Section>
      <Card.Section px={24} pb={24} mih={250}>
        <ProgramsList searchQuery={debounced} />
      </Card.Section>
    </>
  )
}
