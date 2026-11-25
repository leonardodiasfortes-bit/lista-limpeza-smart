import { PiggyBank, Recycle, Box } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getStatus, computeDuration, CONSUMPTION_LEVELS } from '../data/initialData'
import ProgressBar from '../components/ProgressBar'
import StatusTag from '../components/StatusTag'
import ProductIcon from '../components/ProductIcon'
import { formatBRL } from '../utils/format'

export default function Home() {
  const { state, products } = useApp()
  const { profile } = state
  const firstName = profile?.name?.trim().split(' ')[0] || 'Visitante'
  const consumptionLabel = CONSUMPTION_LEVELS.find((l) => l.id === profile?.consumption)?.label

  return (
    <div className="flex flex-col gap-6">
      {profile && (
        <section>
          <h2 className="text-2xl font-bold leading-tight">Olá, {firstName}!</h2>
          <p className="text-slate-600">
            Casa com {profile.people} pessoas • {profile.rooms} cômodos • {profile.bathrooms} banheiros • Consumo{' '}
            {consumptionLabel}
          </p>
        </section>
      )}

      <section className="grid grid-cols-1 gap-4">
        <div className="rounded-3xl bg-emerald text-white p-6 shadow-md flex items-start gap-4">
          <PiggyBank size={40} className="shrink-0" />
          <div>
            <p className="text-base font-medium opacity-90">Economia no mês</p>
            <p className="text-3xl font-extrabold leading-tight">{formatBRL(state.impact.savings)}</p>
          </div>
        </div>
        <div className="rounded-3xl bg-navy text-white p-6 shadow-md flex items-start gap-4">
          <Recycle size={40} className="shrink-0" />
          <div>
            <p className="text-base font-medium opacity-90">Sustentabilidade</p>
            <p className="text-3xl font-extrabold leading-tight">
              {state.impact.packagesAvoided} embalagens plásticas evitadas
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <Box size={26} className="text-navy" />
          Minha Despensa
        </h2>
        <div className="flex flex-col gap-3">
          {Object.entries(state.pantry).map(([productId, percent]) => {
            const product = products[productId]
            const status = getStatus(percent)
            return (
              <div key={productId} className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm flex gap-3">
                <ProductIcon productId={productId} size={52} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
                    <p className="font-bold text-lg">{product.name}</p>
                    <StatusTag label={status.label} tone={status.tone} />
                  </div>
                  <div className="flex items-center gap-3">
                    <ProgressBar percent={percent} tone={status.tone} />
                    <span className="font-semibold text-slate-600 w-16 text-right">{percent}%</span>
                  </div>
                  <p className="text-slate-500 mt-2">
                    Dura em média <strong className="text-ink">{computeDuration(productId, profile)} dias</strong> com
                    seu perfil
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
