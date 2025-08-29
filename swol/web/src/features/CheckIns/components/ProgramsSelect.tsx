import type { ComboboxItem, SelectProps } from '@mantine/core'
import { faCheck, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group, Select } from '@mantine/core'
import { useGetPrograms } from '@/features/Programs/hooks/useGetPrograms'

interface ExtendedComboboxItem extends ComboboxItem {
  isCurrent?: boolean
}

const renderSelectOption: SelectProps['renderOption'] = ({ option, checked = false }: { option: ExtendedComboboxItem, checked?: boolean }) => (
  <Group flex="1" gap="xs">
    {option.label}
    {option.isCurrent && <FontAwesomeIcon color="gold" icon={faStar} />}
    {checked && <FontAwesomeIcon style={{ marginInlineStart: 'auto' }} icon={faCheck} />}
  </Group>
)

interface ProgramsSelectProps {
  formKey: React.Key
  inputProps: any
}

export function ProgramsSelect({ formKey, inputProps }: ProgramsSelectProps) {
  const { data: programsData, isLoading: loadingPrograms } = useGetPrograms()

  return (
    <Select
      size="md"
      label="Program"
      placeholder="Select program"
      disabled={loadingPrograms}
      data={programsData?.programs.map(program => ({
        label: program.name,
        value: program.id.toString(),
        isCurrent: programsData.currentPrograms?.[program.programType]?.id === program.id,
      }))}
      renderOption={renderSelectOption}
      nothingFoundMessage="No programs created yet"
      key={formKey}
      {...inputProps}
    />
  )
}
