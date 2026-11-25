import { useState } from 'react'
import { Sparkles, Wand2, Feather, SprayCan, Flame, CheckCircle2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CONSUMPTION_LEVELS, INCOME_RANGES, EXAMPLE_PROFILE } from '../data/initialData'
import Stepper from '../components/Stepper'

const CONSUMPTION_ICONS = { leve: Feather, moderado: SprayCan, intenso: Flame }

const BLANK_FORM = {
  name: '',
  email: '',
  phone: '',
  people: 2,
  rooms: 5,
  bathrooms: 2,
  consumption: 'moderado',
  income: '2k-4k',
}

export default function Onboarding() {
  const { dispatch } = useApp()
  const [form, setForm] = useState(BLANK_FORM)

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function fillExample() {
    setForm({ ...EXAMPLE_PROFILE })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({
      type: 'SET_PROFILE',
      profile: { ...form, name: form.name.trim() || 'Visitante' },
    })
  }

  return (
    <div className="min-h-full bg-bg text-ink flex flex-col items-center px-4 pt-16 pb-8">
      <div className="w-full max-w-2xl">
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={fillExample}
            className="min-h-[44px] flex items-center gap-2 text-navy font-semibold bg-navy-light rounded-full px-4 py-2 hover:bg-blue-200 transition-colors"
          >
            <Wand2 size={18} />
            Preencher exemplo rápido
          </button>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="bg-emerald text-white rounded-2xl p-2.5">
            <Sparkles size={28} />
          </div>
          <span className="font-bold text-lg text-emerald-dark">Lista de Limpeza Inteligente</span>
        </div>
        <h1 className="text-3xl font-extrabold mb-2 leading-tight">
          Bem-vindo! Vamos preparar sua despensa inteligente
        </h1>
        <p className="text-slate-600 text-lg mb-8">
          São só alguns dados rápidos para calcular o consumo de produtos de limpeza da sua casa.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <section className="bg-white rounded-3xl border-2 border-slate-200 p-6 flex flex-col gap-5">
            <h2 className="text-xl font-bold">Seus dados</h2>
            <div>
              <label htmlFor="name" className="block font-semibold text-lg mb-2">
                Nome completo
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Ex.: Maria da Silva"
                required
                className="w-full min-h-[48px] rounded-xl border-2 border-slate-300 px-4 text-lg"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-semibold text-lg mb-2">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="Ex.: maria@email.com"
                required
                className="w-full min-h-[48px] rounded-xl border-2 border-slate-300 px-4 text-lg"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block font-semibold text-lg mb-2">
                Telefone / WhatsApp
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="Ex.: (11) 98765-4321"
                required
                className="w-full min-h-[48px] rounded-xl border-2 border-slate-300 px-4 text-lg"
              />
            </div>
          </section>

          <section className="bg-white rounded-3xl border-2 border-slate-200 p-6 flex flex-col gap-6">
            <h2 className="text-xl font-bold">Perfil da casa</h2>
            <div className="grid gap-6">
              <Stepper label="Pessoas na casa" value={form.people} onChange={(v) => update('people', v)} min={1} />
              <Stepper label="Cômodos" value={form.rooms} onChange={(v) => update('rooms', v)} min={1} />
              <Stepper label="Banheiros" value={form.bathrooms} onChange={(v) => update('bathrooms', v)} min={1} />
            </div>
          </section>

          <section className="bg-white rounded-3xl border-2 border-slate-200 p-6 flex flex-col gap-4">
            <h2 className="text-xl font-bold">Faixa de Renda Mensal</h2>
            <div className="grid gap-3">
              {INCOME_RANGES.map((range) => {
                const active = form.income === range.id
                return (
                  <button
                    key={range.id}
                    type="button"
                    onClick={() => update('income', range.id)}
                    aria-pressed={active}
                    className={`min-h-[48px] text-left rounded-xl border-2 px-5 py-3 font-semibold text-lg transition-colors flex items-center justify-between gap-2 ${
                      active ? 'border-navy bg-navy-light text-navy' : 'border-slate-200 bg-slate-50 hover:border-navy'
                    }`}
                  >
                    {range.label}
                    {active && <CheckCircle2 size={22} className="text-navy shrink-0" />}
                  </button>
                )
              })}
            </div>
          </section>

          <section className="bg-white rounded-3xl border-2 border-slate-200 p-6 flex flex-col gap-4">
            <h2 className="text-xl font-bold">Nível de consumo de produtos de limpeza</h2>
            <div className="grid gap-4">
              {CONSUMPTION_LEVELS.map((level) => {
                const Icon = CONSUMPTION_ICONS[level.id]
                const active = form.consumption === level.id
                return (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => update('consumption', level.id)}
                    aria-pressed={active}
                    className={`text-left rounded-2xl border-2 p-5 min-h-[48px] transition-colors flex flex-col gap-2 ${
                      active ? 'border-navy bg-navy-light' : 'border-slate-200 bg-slate-50 hover:border-navy'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon size={28} className={active ? 'text-navy' : 'text-slate-500'} />
                      {active && <CheckCircle2 size={22} className="text-navy" />}
                    </div>
                    <p className="font-bold text-lg">{level.label}</p>
                    <p className="text-slate-600">{level.description}</p>
                  </button>
                )
              })}
            </div>
          </section>

          <button
            type="submit"
            className="min-h-[56px] w-full bg-emerald text-white font-bold text-xl rounded-2xl px-8 py-4 shadow-md hover:bg-emerald-dark transition-colors"
          >
            Concluir e Ver Minha Despensa
          </button>
        </form>
      </div>
    </div>
  )
}
