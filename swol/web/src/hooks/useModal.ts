import { useDisclosure } from '@mantine/hooks'

export function useModal(initialState: boolean = false) {
  const [opened, { open, close, toggle }] = useDisclosure(initialState)
  return { opened, open, close, toggle }
}
