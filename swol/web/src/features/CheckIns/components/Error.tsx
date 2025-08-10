import { Button } from '@mantine/core'

interface ErrorProps {
  message?: string
  onRetry: () => void
}

export function Error({
  message = 'An unexpected error occurred. Please try again later.',
  onRetry,
}: ErrorProps) {
  return (
    <div>
      <div>Oops! Something went wrong.</div>
      <p>{message}</p>
      <Button
        onClick={onRetry}
      >
        Retry
      </Button>
    </div>
  )
}
