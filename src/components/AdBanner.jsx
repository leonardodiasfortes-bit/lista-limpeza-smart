import { Tag } from 'lucide-react'
import ProductIcon from './ProductIcon'

export function FooterAdBanner() {
  return (
    <div className="w-full bg-white border-t-2 border-slate-200 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <ProductIcon productId="detergente" size={48} />
        <div className="flex-1 min-w-0">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-0.5">
            <Tag size={10} /> Patrocinado
          </span>
          <p className="font-bold text-ink leading-tight truncate">Refil Econômico BioLimpo</p>
          <p className="text-emerald-dark text-sm font-semibold">20% OFF no Supermercado Verde</p>
        </div>
        <button
          type="button"
          className="shrink-0 bg-emerald text-white font-bold text-sm rounded-xl px-4 py-2.5 hover:bg-emerald-dark transition-colors"
        >
          Ver Oferta
        </button>
      </div>
    </div>
  )
}

export function SponsoredMarketCard() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-emerald-400 bg-emerald-light/60 p-4 flex items-center gap-4">
      <ProductIcon productId="detergente" size={48} />
      <div className="flex-1">
        <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-emerald-dark bg-white rounded-full px-2 py-0.5 w-fit mb-2">
          <Tag size={14} /> Anúncio / Oferta Patrocinada
        </span>
        <p className="font-semibold text-ink">
          BioLimpo paga para aparecer aqui: leve o refil concentrado e economize ainda mais no Supermercado Verde.
        </p>
      </div>
    </div>
  )
}
