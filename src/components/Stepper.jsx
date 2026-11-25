import { Minus, Plus } from 'lucide-react'

export default function Stepper({ label, value, onChange, min = 1, max = 20 }) {
  return (
    <div>
      <p className="font-semibold text-lg mb-2">{label}</p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={`Diminuir ${label}`}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-ink border-2 border-slate-200"
        >
          <Minus size={22} />
        </button>
        <span className="w-12 text-center text-2xl font-bold">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label={`Aumentar ${label}`}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-ink border-2 border-slate-200"
        >
          <Plus size={22} />
        </button>
      </div>
    </div>
  )
}
