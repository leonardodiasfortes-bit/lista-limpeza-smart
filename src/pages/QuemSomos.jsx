import { Sparkles, ArrowRight } from 'lucide-react'
import SlideShell from '../components/SlideShell'

const MEMBERS = ['Leonardo Dias', 'Leonardo Ceccon', 'Léa Mooz', 'Leticia Pacheco', 'Keven Armani']

function initialsOf(name) {
  return name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function QuemSomos({ onContinue }) {
  return (
    <SlideShell step={1} totalSteps={3}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="flex items-center gap-3">
          <div className="bg-emerald text-white rounded-2xl p-2.5">
            <Sparkles size={26} />
          </div>
          <span className="text-xl font-bold text-ink">Lista de Limpeza Inteligente</span>
        </div>

        <div>
          <p className="uppercase tracking-[0.2em] text-xs font-bold text-navy mb-2">
            Projeto de Inovação Corporativa
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-ink leading-none">Grupo 05</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full max-w-3xl mt-2">
          {MEMBERS.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 bg-white/80 backdrop-blur rounded-2xl p-4 border-2 border-slate-200 shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-light text-emerald-dark flex items-center justify-center font-bold text-base">
                {initialsOf(name)}
              </div>
              <span className="font-semibold text-ink text-sm text-center leading-tight">{name}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="mt-2 min-h-[52px] flex items-center gap-2 bg-navy text-white font-bold text-lg rounded-2xl px-8 py-3 shadow-md hover:bg-navy-dark transition-colors"
        >
          Continuar
          <ArrowRight size={22} />
        </button>
      </div>
    </SlideShell>
  )
}
