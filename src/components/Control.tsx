import type { ReactNode } from 'react';

export function Control({ ariaLabel, label, value, min, max, step, onChange, children }: { ariaLabel: string; label: ReactNode; value: number; min: number; max: number; step: number; onChange: (value: number) => void; children?: ReactNode }) {
  return <div className="control">
    <div className="control-head"><label>{label}</label><input aria-label={`${ariaLabel} numeric value`} type="number" min={min} max={max} step={step} value={value} onChange={event => onChange(Number(event.target.value))} /></div>
    <input aria-label={`${ariaLabel} slider`} type="range" min={min} max={max} step={step} value={value} onChange={event => onChange(Number(event.target.value))} />
    {children}
  </div>;
}
