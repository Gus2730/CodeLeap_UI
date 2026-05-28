import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'h-9 w-full min-w-0 rounded-md border bg-slate-100 px-4 py-3 text-base',
        'font-serif text-slate-900 placeholder:italic placeholder:text-slate-400',
        'border-slate-300 transition-colors duration-150',
        'focus-visible:border-cyan-500 focus-visible:border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/30',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
