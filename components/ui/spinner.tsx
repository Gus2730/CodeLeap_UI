import { Loader2Icon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface SpinnerProps extends React.ComponentProps<'svg'> {
  showPulse?: boolean
}

function Spinner({ className, showPulse = true, ...props }: SpinnerProps) {
  return (
    <div className="relative inline-flex items-center justify-center">
      {showPulse && (
        <div className={cn('absolute animate-spinner-pulse rounded-full', className)} />
      )}
      <Loader2Icon
        role="status"
        aria-label="Loading"
        className={cn('size-4 animate-spin text-cyan-500', className)}
        {...props}
      />
    </div>
  )
}

export { Spinner }
