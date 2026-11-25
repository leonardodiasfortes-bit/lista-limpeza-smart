import { useMemo, useState } from 'react'
import { Minus, Plus, Trash2, PlusCircle, BadgeCheck, AlertTriangle, ShoppingBag } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { MARKETS, MARKET_PRICES, getStatus } from '../data/initialData'
import { formatBRL } from '../utils/format'
import Modal from '../components/Modal'
import ProductIcon from '../components/ProductIcon'
import { SponsoredMarketCard } from '../components/AdBanner'

export default function ListaMercados() {
  const { state, dispatch, products } = useApp()
  const [showPicker, setShowPicker] = useState(false)
  const [warningProduct, setWarningProduct] = useState(null)

  const listProductIds = state.shoppingList.map((item) => item.productId)
  const availableToAdd = Object.keys(products).filter((id) => !listProductIds.includes(id))

  const totals = useMemo(() => {
    return MARKETS.map((market) => {
      const total = state.shoppingList.reduce((sum, item) => {
        const price = MARKET_PRICES[item.productId][market.id]
        return sum + price * item.qty
      }, 0)
      return { ...market, total }
    })
  }, [state.shoppingList])

  const cheapest = totals.reduce((min, m) => (m.total < min.total ? m : min), totals[0] || { total: 0 })
  const priciest = totals.reduce((max, m) => (m.total > max.total ? m : max), totals[0] || { total: 0 })
  const savings = priciest.total - cheapest.total

  function handleAddClick(productId) {
    const percent = state.pantry[productId]
    if (percent >= 70) {
      setWarningProduct(productId)
    } else {
      dispatch({ type: 'ADD_ITEM', productId })
    }
    setShowPicker(false)
  }

  function confirmAddAnyway() {
    dispatch({ type: 'ADD_ITEM', productId: warningProduct })
    setWarningProduct(null)
  }

  function declineAdd() {
    dispatch({ type: 'DECLINE_ADD_SAVE', productId: warningProduct })
    setWarningProduct(null)
  }

  const warningPercent = warningProduct ? state.pantry[warningProduct] : 0

  return (
    <div className="flex flex-col gap-8">
      <section>
        <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingBag size={26} className="text-navy" />
            Lista Inteligente
          </h2>
          <button
            type="button"
            onClick={() => setShowPicker(true)}
            className="min-h-[48px] flex items-center gap-2 bg-white border-2 border-navy text-navy font-bold rounded-xl px-4 py-2.5 hover:bg-navy-light transition-colors"
          >
            <PlusCircle size={22} />
            Adicionar item da despensa
          </button>
        </div>

        {state.shoppingList.length === 0 && (
          <p className="text-slate-500 bg-white rounded-2xl border-2 border-slate-200 p-5">
            Sua lista está vazia. Adicione itens da despensa acima.
          </p>
        )}

        <ul className="flex flex-col gap-3">
          {state.shoppingList.map((item) => {
            const product = products[item.productId]
            return (
              <li
                key={item.productId}
                className={`bg-white rounded-2xl border-2 p-4 shadow-sm flex items-center gap-4 flex-wrap ${
                  item.checked ? 'border-emerald-300 bg-emerald-light/40' : 'border-slate-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => dispatch({ type: 'TOGGLE_CHECK', productId: item.productId })}
                  className="w-7 h-7 accent-emerald shrink-0"
                  aria-label={`Marcar ${product.name} como colocado no carrinho`}
                />
                <ProductIcon productId={item.productId} size={44} />
                <span className={`flex-1 font-semibold text-lg ${item.checked ? 'line-through text-slate-400' : ''}`}>
                  {product.name}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'CHANGE_QTY', productId: item.productId, delta: -1 })}
                    aria-label="Diminuir quantidade"
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-ink"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-8 text-center font-bold text-lg">{item.qty}</span>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'CHANGE_QTY', productId: item.productId, delta: 1 })}
                    aria-label="Aumentar quantidade"
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-ink"
                  >
                    <Plus size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', productId: item.productId })}
                    aria-label={`Remover ${product.name} da lista`}
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-alert-light hover:bg-red-200 text-alert ml-1"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3">Comparador de Mercados Parceiros</h2>
        <div className="grid grid-cols-1 gap-4 mb-4">
          {totals.map((market) => {
            const isCheapest = market.id === cheapest.id && state.shoppingList.length > 0
            return (
              <div
                key={market.id}
                className={`rounded-2xl p-5 border-2 shadow-sm relative ${
                  isCheapest ? 'border-emerald bg-emerald-light' : 'border-slate-200 bg-white'
                }`}
              >
                {isCheapest && (
                  <span className="absolute -top-3 right-4 bg-emerald text-white text-xs font-bold rounded-full px-3 py-1 flex items-center gap-1 shadow">
                    <BadgeCheck size={14} /> Mais barato
                  </span>
                )}
                <p className="font-bold text-lg mb-1">{market.name}</p>
                <p className="text-3xl font-extrabold text-ink">{formatBRL(market.total)}</p>
                {isCheapest && savings > 0 && (
                  <p className="text-emerald-dark font-semibold mt-2">
                    Economize {formatBRL(savings)} em relação ao mais caro
                  </p>
                )}
              </div>
            )
          })}
        </div>
        <SponsoredMarketCard />
      </section>

      <Modal open={showPicker} onClose={() => setShowPicker(false)}>
        <h3 className="text-xl font-bold mb-4">Adicionar item da despensa</h3>
        {availableToAdd.length === 0 ? (
          <p className="text-slate-500">Todos os itens já estão na sua lista.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {availableToAdd.map((id) => {
              const product = products[id]
              const status = getStatus(state.pantry[id])
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => handleAddClick(id)}
                    className="w-full text-left flex items-center gap-3 bg-slate-50 hover:bg-slate-100 rounded-xl px-4 py-3 border border-slate-200"
                  >
                    <ProductIcon productId={id} size={40} />
                    <span className="font-semibold flex-1">{product.name}</span>
                    <span className="text-sm text-slate-500">{status.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
        <button
          type="button"
          onClick={() => setShowPicker(false)}
          className="mt-5 min-h-[48px] w-full bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold"
        >
          Fechar
        </button>
      </Modal>

      <Modal open={!!warningProduct} onClose={() => setWarningProduct(null)}>
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle size={32} className="text-amber shrink-0" />
          <h3 className="text-xl font-bold">Atenção: possível desperdício</h3>
        </div>
        {warningProduct && (
          <p className="text-ink mb-6">
            Você comprou <strong>{products[warningProduct].name}</strong> recentemente e ainda tem cerca de{' '}
            <strong>{warningPercent}%</strong> em casa. Evite desperdício! Deseja adicionar mesmo assim?
          </p>
        )}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={declineAdd}
            className="min-h-[48px] flex-1 bg-emerald text-white font-bold rounded-xl px-4 py-3 hover:bg-emerald-dark transition-colors"
          >
            Não, obrigado — economizar
          </button>
          <button
            type="button"
            onClick={confirmAddAnyway}
            className="min-h-[48px] flex-1 bg-slate-100 hover:bg-slate-200 text-ink font-semibold rounded-xl px-4 py-3"
          >
            Adicionar mesmo assim
          </button>
        </div>
      </Modal>
    </div>
  )
}
