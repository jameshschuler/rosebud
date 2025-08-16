import { Card, Input } from '@mantine/core'
import { useState } from 'react'
import { ProgramsList } from './ProgramsList'

export function ProgramsContent() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <Card.Section p={24}>
        <Input 
            name="search" 
            placeholder="Search by name, author, or program type..." 
            size="md" 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
        />
      </Card.Section>
      <Card.Section px={24} pb={24} mih={250}>
        <ProgramsList />
      </Card.Section>
    </>
  )
}
