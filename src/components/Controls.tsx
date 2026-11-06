import type { CSSProperties, InputHTMLAttributes } from 'react'

export function Switch({ checked, label, onChange, className }: {
  checked: boolean
  label: string
  onChange: (checked: boolean) => void
  className?: string
}) {
  return <button type="button" className={className} role="switch" aria-label={label} aria-checked={checked} onClick={() => onChange(!checked)}><span className="signal-switch" aria-hidden="true"><span /></span></button>
}

type RangeProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'min' | 'max' | 'onChange'> & {
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}

export function Range({ value, min, max, onChange, className, style, ...props }: RangeProps) {
  const position = max > min ? (value - min) / (max - min) * 100 : 0
  return <input {...props} type="range" className={['range', className].filter(Boolean).join(' ')} min={min} max={max} value={value} style={{ ...style, '--seek-position': `${position}%` } as CSSProperties} onChange={event => onChange(Number(event.target.value))} />
}
