import { Receipt, CalendarDays, Clock } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { PRODUCTS, computeDuration } from '../data/initialData'
import { formatBRL, formatDateBR } from '../utils/format'
import ProductIcon from '../components/ProductIcon'

export default function Historico() {
  const { state } = useApp()
  const lastThree = state.history.slice(0, 3)

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <Receipt size={26} className="text-navy" />
          Últimas Notas Registradas
        </h2>
        <div className="flex flex-col gap-3">
          {lastThree.map((entry) => (
            <div key={entry.id} className="bg-white rounded-2xl border-2 border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <p className="font-bold text-lg">{entry.market}</p>
                <span className="font-extrabold text-xl text-navy">{formatBRL(entry.total)}</span>
              </div>
              <p className="flex items-center gap-1.5 text-slate-500 mb-2">
                <CalendarDays size={18} />
                {formatDateBR(entry.date)}
              </p>
              <p className="text-ink">{entry.items.join(' + ')}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <Clock size={26} className="text-navy" />
          Duração Média dos Produtos
        </h2>
        <ul className="flex flex-col gap-3">
          {Object.values(PRODUCTS).map((product) => (
            <li
              key={product.id}
              className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm flex items-center gap-3"
            >
              <ProductIcon productId={product.id} size={40} />
              <p>
                <span className="font-semibold">{product.name}</span>
                <span className="text-slate-600">
                  {' '}
                  costuma durar{' '}
                  <strong className="text-ink">{computeDuration(product.id, state.profile)} dias</strong>
                </span>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
