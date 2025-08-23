import { Skeleton, Table } from '@mantine/core'

export function TableLoader({ rowCount, colCount }: { rowCount: number, colCount: number }) {
  return (
    [...Array.from({ length: rowCount })].map((_, index) => (
      <Table.Tr key={index}>
        <Table.Td colSpan={colCount}>
          <Skeleton height={30} radius="sm" />
        </Table.Td>
      </Table.Tr>
    ))
  ) 
}
