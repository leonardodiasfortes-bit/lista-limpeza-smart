import { DatabaseZap, Megaphone, Handshake, Coins, RotateCcw } from 'lucide-react'
import SlideShell from '../components/SlideShell'

const REVENUE_STREAMS = [
  {
    icon: DatabaseZap,
    tone: 'navy',
    title: 'Comercialização de Dados de Consumo',
    description:
      'Venda de dados agregados e anonimizados de consumo para empresas do setor de limpeza, gerando insights de mercado.',
  },
  {
    icon: Megaphone,
    tone: 'emerald',
    title: 'Anúncios no App',
    description: 'Banners e cards patrocinados exibidos de forma transparente e não invasiva.',
  },
  {
    icon: Handshake,
    tone: 'amber',
    title: 'Comissão de Vendas de Parceiros',
    description: 'Percentual sobre vendas feitas via indicação de mercados parceiros no comparador de preços.',
  },
]

const TONE_STYLES = {
  navy: 'bg-navy text-white',
  emerald: 'bg-emerald text-white',
  amber: 'bg-amber text-white',
}

export default function FontesReceita({ onRestart }) {
  return (
    <SlideShell step={3} totalSteps={3}>
      <div className="flex flex-col h-full items-center justify-center gap-6">
        <div className="text-center shrink-0">
          <div className="bg-emerald text-white rounded-2xl p-2.5 inline-flex mb-3">
            <Coins size={26} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink leading-tight">Fontes de Receita</h1>
          <p className="text-slate-600 mt-2 max-w-xl mx-auto">
            Como este projeto se sustenta financeiramente, sem comprometer a experiência do usuário.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5 w-full max-w-5xl">
          {REVENUE_STREAMS.map((stream) => {
            const Icon = stream.icon
            return (
              <div
                key={stream.title}
                className="bg-white rounded-3xl border-2 border-slate-200 p-5 shadow-sm flex flex-col items-center text-center gap-3"
              >
                <div className={`rounded-2xl p-3 shrink-0 ${TONE_STYLES[stream.tone]}`}>
                  <Icon size={26} />
                </div>
                <p className="font-bold text-lg leading-tight">{stream.title}</p>
                <p className="text-slate-600 text-sm">{stream.description}</p>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          onClick={onRestart}
          className="min-h-[52px] flex items-center gap-2 bg-navy text-white font-bold text-lg rounded-2xl px-8 py-3 shadow-md hover:bg-navy-dark transition-colors"
        >
          <RotateCcw size={22} />
          Reiniciar Demonstração
        </button>
      </div>
    </SlideShell>
  )
}
