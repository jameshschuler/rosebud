import { Input, Select, Textarea } from '@mantine/core'

export function CreateEditProgram() {
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input.Wrapper label="Name" required>
        <Input size="md" placeholder="Enter a name..." />
      </Input.Wrapper>
      <Select
        required
        label="Program Type"
        placeholder="Select program type"
        data={['Strength Training', 'Running']}
      />
      <Select
        defaultValue="No"
        label="Set as Current Program"
        data={['Yes', 'No']}
      />
      <Input.Wrapper label="Author">
        <Input size="md" placeholder="Enter an author..." />
      </Input.Wrapper>
      <Textarea
        label="Description"
        placeholder="Enter a description..."
        rows={5}
        maxLength={500}
        // key={form.key('notes')}
        size="md"
        // {...form.getInputProps('notes')}
      />
    </form>
  )
}
