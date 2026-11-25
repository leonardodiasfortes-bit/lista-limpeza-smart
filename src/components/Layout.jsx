import { useState } from 'react'
import { Home, ScanLine, ShoppingCart, History, RotateCcw, Sparkles, AlertTriangle, Flag } from 'lucide-react'
import { FooterAdBanner } from './AdBanner'
import Modal from './Modal'
import { useApp } from '../context/AppContext'

const TABS = [
  { id: 'inicio', label: 'Início', icon: Home },
  { id: 'ler-nota', label: 'Ler Nota', icon: ScanLine },
  { id: 'lista', label: 'Lista e Mercados', icon: ShoppingCart },
  { id: 'historico', label: 'Histórico', icon: History },
]

export default function Layout({ activeTab, setActiveTab, children, onEndPresentation }) {
  const { dispatch } = useApp()
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  function confirmReset() {
    dispatch({ type: 'RESET' })
    setActiveTab('inicio')
    setShowResetConfirm(false)
  }

  return (
    <div className="min-h-full flex flex-col bg-bg text-ink">
      <header className="sticky top-0 z-40 bg-white border-b-2 border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 pt-16 pb-2 flex items-center gap-3">
          <div className="bg-emerald text-white rounded-2xl p-2.5">
            <Sparkles size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold leading-tight">Lista de Limpeza Inteligente</h1>
            <p className="text-sm text-slate-500 -mt-0.5">Economia e menos desperdício em casa</p>
          </div>
        </div>
        <nav className="max-w-4xl mx-auto px-2 pb-2">
          <ul className="grid grid-cols-2 gap-2">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const active = activeTab === tab.id
              return (
                <li key={tab.id}>
                  <button
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    aria-current={active ? 'page' : undefined}
                    className={`w-full min-h-[48px] flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 font-semibold text-base transition-colors border-2 ${
                      active
                        ? 'bg-navy text-white border-navy'
                        : 'bg-slate-50 text-ink border-slate-200 hover:border-navy'
                    }`}
                  >
                    <Icon size={22} />
                    <span>{tab.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">{children}</main>

      <FooterAdBanner />

      <footer className="bg-white border-t border-slate-200 py-3 flex flex-col items-center gap-1">
        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 px-3 py-1.5 rounded-full"
        >
          <RotateCcw size={14} />
          Reiniciar Demonstração
        </button>
        <button
          type="button"
          onClick={onEndPresentation}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 px-3 py-1.5 rounded-full"
        >
          <Flag size={14} />
          Encerrar Demonstração
        </button>
      </footer>

      <Modal open={showResetConfirm} onClose={() => setShowResetConfirm(false)}>
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle size={32} className="text-amber shrink-0" />
          <h3 className="text-xl font-bold">Reiniciar demonstração?</h3>
        </div>
        <p className="text-ink mb-6">
          Todos os dados, incluindo o cadastro, voltarão ao estado inicial e você verá a tela de boas-vindas
          novamente.
        </p>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={confirmReset}
            className="min-h-[48px] flex-1 bg-navy text-white font-bold rounded-xl px-4 py-3 hover:bg-navy-dark transition-colors"
          >
            Sim, reiniciar
          </button>
          <button
            type="button"
            onClick={() => setShowResetConfirm(false)}
            className="min-h-[48px] flex-1 bg-slate-100 hover:bg-slate-200 text-ink font-semibold rounded-xl px-4 py-3"
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  )
}
