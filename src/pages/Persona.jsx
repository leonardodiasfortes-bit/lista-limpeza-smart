import { Ear, MessageCircle, Frown, ArrowRight, UserRound } from 'lucide-react'
import SlideShell from '../components/SlideShell'

const HEARS = [
  'Filhos: "Anota a lista, mãe!"',
  'Netos: "Tem um app que faz isso"',
  'Amigas: "Eu também esqueço sempre"',
  '"Tecnologia é difícil nessa idade"',
  'Dicas de uso do celular em família',
  'Ajuda: familiares e amigas que já usam',
]

const SAYS_AND_DOES = [
  'Usa papel, anotações ou tenta memorizar',
  'Costuma comprar sempre os mesmos itens',
  'Ao esquecer: "Ah, de novo!" e volta à loja',
  'Pode ter dificuldade com ferramentas digitais',
  'Prefere soluções simples e rápidas',
  'Pede ajuda só quando precisa',
]

const PAINS = [
  'Esquecer produtos importantes na hora da compra',
  'Chegar em casa e notar que faltaram itens',
  'Ter de voltar ao mercado por produtos esquecidos',
  'Dificuldade em manter a lista atualizada',
  'Não saber o que está acabando em casa',
  'Aplicativos complexos e difíceis de usar',
  'Frustração e perda de tempo com compras incompletas',
]

const TONE_STYLES = {
  navy: { chip: 'bg-navy-light text-navy', dot: 'bg-navy' },
  emerald: { chip: 'bg-emerald-light text-emerald-dark', dot: 'bg-emerald' },
  alert: { chip: 'bg-alert-light text-alert', dot: 'bg-alert' },
}

function PersonaColumn({ icon: Icon, title, items, tone }) {
  const styles = TONE_STYLES[tone]
  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 flex flex-col min-h-0">
      <div className={`inline-flex items-center gap-1.5 self-start ${styles.chip} rounded-full px-3 py-1 mb-3 font-bold text-sm`}>
        <Icon size={16} />
        {title}
      </div>
      <ul className="flex flex-col gap-1.5 overflow-y-auto min-h-0">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm leading-snug">
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${styles.dot} shrink-0`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Persona({ onContinue }) {
  return (
    <SlideShell step={2} totalSteps={3}>
      <div className="flex flex-col h-full gap-4">
        <div className="text-center shrink-0">
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink leading-tight">Para quem é este sistema?</h1>
        </div>

        <div className="flex items-center gap-4 bg-navy text-white rounded-2xl p-4 shadow-md shrink-0">
          <div className="bg-white/20 rounded-full p-3 shrink-0">
            <UserRound size={30} />
          </div>
          <div>
            <p className="text-xl font-extrabold leading-tight">Dona Maria, 68 anos</p>
            <p className="text-sm opacity-90">Nossa persona principal</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
          <PersonaColumn icon={Ear} title="Escuta" items={HEARS} tone="navy" />
          <PersonaColumn icon={MessageCircle} title="Diz e Faz" items={SAYS_AND_DOES} tone="emerald" />
          <PersonaColumn icon={Frown} title="Dores" items={PAINS} tone="alert" />
        </div>

        <div className="flex justify-center shrink-0">
          <button
            type="button"
            onClick={onContinue}
            className="min-h-[52px] flex items-center gap-2 bg-navy text-white font-bold text-lg rounded-2xl px-8 py-3 shadow-md hover:bg-navy-dark transition-colors"
          >
            Continuar
            <ArrowRight size={22} />
          </button>
        </div>
      </div>
    </SlideShell>
  )
}
