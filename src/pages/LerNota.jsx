import { useEffect, useRef, useState } from 'react'
import { QrCode, ScanLine, CheckCircle2, Receipt, ArrowLeft } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { NOTA_EXAMPLES } from '../data/initialData'
import { formatBRL } from '../utils/format'
import ProductIcon from '../components/ProductIcon'

export default function LerNota() {
  const { dispatch } = useApp()
  const [phase, setPhase] = useState('idle')
  const [selectedNota, setSelectedNota] = useState(null)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  function handlePickNota(nota) {
    setSelectedNota(nota)
    setPhase('scanning')
    timeoutRef.current = setTimeout(() => {
      dispatch({ type: 'SCAN_NOTA', notaId: nota.id })
      setPhase('done')
    }, 1500)
  }

  function handleRestart() {
    setPhase('idle')
    setSelectedNota(null)
  }

  if (phase === 'idle') {
    return (
      <div className="flex flex-col items-center gap-6 py-10 text-center">
        <div className="bg-navy-light text-navy rounded-full p-8">
          <QrCode size={64} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Ler sua Nota Fiscal</h2>
          <p className="text-slate-600 max-w-md">
            Escaneie o QR Code da nota fiscal para atualizar sua despensa automaticamente.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPhase('choosing')}
          className="min-h-[56px] flex items-center gap-3 bg-navy text-white font-bold text-xl rounded-2xl px-8 py-4 shadow-md hover:bg-navy-dark transition-colors"
        >
          <QrCode size={28} />
          Escanear Nota Fiscal (QR Code)
        </button>
      </div>
    )
  }

  if (phase === 'choosing') {
    return (
      <div className="flex flex-col gap-5">
        <button
          type="button"
          onClick={handleRestart}
          className="flex items-center gap-1.5 text-navy font-semibold self-start"
        >
          <ArrowLeft size={20} /> Voltar
        </button>
        <div className="bg-slate-900 rounded-3xl p-6 text-white text-center">
          <ScanLine size={40} className="mx-auto mb-2 text-emerald" />
          <p className="font-semibold">Simulador de câmera — toque em uma nota de exemplo abaixo</p>
        </div>
        <div className="grid gap-4">
          {NOTA_EXAMPLES.map((nota) => (
            <button
              key={nota.id}
              type="button"
              onClick={() => handlePickNota(nota)}
              className="text-left bg-white border-2 border-slate-200 hover:border-navy rounded-2xl p-5 shadow-sm transition-colors flex items-start gap-4"
            >
              <Receipt size={32} className="text-navy shrink-0 mt-1" />
              <div>
                <p className="font-bold text-lg">{nota.title}</p>
                <p className="text-slate-600">{nota.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (phase === 'scanning') {
    return (
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <div className="relative bg-slate-900 rounded-3xl p-10">
          <ScanLine size={64} className="text-emerald animate-pulse" />
          <div className="absolute inset-x-6 top-1/2 h-1 bg-emerald/80 rounded animate-pulse" />
        </div>
        <p className="text-xl font-semibold">Lendo nota fiscal...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-emerald-light border-2 border-emerald rounded-3xl p-6 flex items-start gap-4">
        <CheckCircle2 size={36} className="text-emerald-dark shrink-0" />
        <div>
          <p className="font-bold text-lg text-emerald-dark">Nota processada com sucesso!</p>
          <p className="text-ink">Sua despensa foi atualizada automaticamente. Obrigado por manter o controle!</p>
        </div>
      </div>

      <div className="bg-white border-2 border-slate-200 rounded-2xl p-5">
        <p className="font-bold text-lg mb-3">Itens identificados — {selectedNota.market}</p>
        <ul className="flex flex-col gap-2">
          {selectedNota.items.map((item) => (
            <li key={item.productId} className="flex items-center gap-3 border-b border-slate-100 pb-2">
              <ProductIcon productId={item.productId} size={36} />
              <span className="flex-1">{item.label}</span>
              <span className="font-semibold">{formatBRL(item.price)}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={handleRestart}
        className="min-h-[48px] self-start flex items-center gap-2 bg-navy text-white font-bold rounded-xl px-6 py-3 shadow-sm hover:bg-navy-dark transition-colors"
      >
        <QrCode size={22} />
        Escanear outra nota
      </button>
    </div>
  )
}
