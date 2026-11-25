export const PRODUCTS = {
  sabao: { id: 'sabao', name: 'Sabão Líquido Lava-Roupas 3L', avgDurationDays: 32 },
  detergente: { id: 'detergente', name: 'Detergente Neutro 500ml', avgDurationDays: 18 },
  aguaSanitaria: { id: 'aguaSanitaria', name: 'Água Sanitária 2L', avgDurationDays: 90 },
  amaciante: { id: 'amaciante', name: 'Amaciante Concentrado 1L', avgDurationDays: 45 },
  desinfetante: { id: 'desinfetante', name: 'Desinfetante Pinho 2L', avgDurationDays: 60 },
}

export const MARKETS = [
  { id: 'verde', name: 'Supermercado Verde' },
  { id: 'familia', name: 'Mercado Família' },
  { id: 'atacadao', name: 'Atacadão do Bairro' },
]

export const MARKET_PRICES = {
  sabao: { verde: 24.9, familia: 26.5, atacadao: 23.9 },
  detergente: { verde: 3.5, familia: 3.2, atacadao: 3.8 },
  aguaSanitaria: { verde: 6.9, familia: 7.5, atacadao: 6.5 },
  amaciante: { verde: 12.9, familia: 13.5, atacadao: 12.5 },
  desinfetante: { verde: 9.9, familia: 10.5, atacadao: 9.5 },
}

export function avgPrice(productId) {
  const prices = Object.values(MARKET_PRICES[productId])
  return prices.reduce((a, b) => a + b, 0) / prices.length
}

export const CONSUMPTION_LEVELS = [
  { id: 'leve', label: 'Leve', description: 'Limpeza básica semanal, pouca sujeira' },
  { id: 'moderado', label: 'Moderado', description: 'Limpeza regular da casa e roupas' },
  { id: 'intenso', label: 'Intenso', description: 'Limpeza frequente, pets ou casa grande' },
]

export const INCOME_RANGES = [
  { id: 'ate-2k', label: 'Até R$ 2.000' },
  { id: '2k-4k', label: 'R$ 2.001 a R$ 4.000' },
  { id: '4k-8k', label: 'R$ 4.001 a R$ 8.000' },
  { id: 'acima-8k', label: 'Acima de R$ 8.000' },
]

export const EXAMPLE_PROFILE = {
  name: 'Maria Aparecida Silva',
  email: 'maria.silva@email.com',
  phone: '(11) 98765-4321',
  people: 3,
  rooms: 6,
  bathrooms: 2,
  consumption: 'moderado',
  income: '2k-4k',
}

const PROFILE_BASELINE = { people: 2, bathrooms: 2, rooms: 5 }
const CONSUMPTION_FACTORS = { leve: 1.3, moderado: 1, intenso: 0.7 }
const LAUNDRY_PRODUCTS = ['sabao', 'detergente', 'amaciante']

export function computeDuration(productId, profile) {
  const base = PRODUCTS[productId].avgDurationDays
  if (!profile) return base

  const consumptionFactor = CONSUMPTION_FACTORS[profile.consumption] ?? 1

  let demandFactor
  if (LAUNDRY_PRODUCTS.includes(productId)) {
    demandFactor = PROFILE_BASELINE.people / profile.people
  } else {
    const bathroomFactor = PROFILE_BASELINE.bathrooms / profile.bathrooms
    const roomsFactor = PROFILE_BASELINE.rooms / profile.rooms
    demandFactor = bathroomFactor * 0.7 + roomsFactor * 0.3
  }

  return Math.max(5, Math.round(base * consumptionFactor * demandFactor))
}

export function getStatus(percent) {
  if (percent < 15) return { label: 'Acabando', tone: 'alert' }
  if (percent < 30) return { label: 'Comprar em breve', tone: 'amber' }
  if (percent < 70) return { label: 'Uso moderado', tone: 'navy' }
  return { label: 'Estoque cheio - Não precisa comprar', tone: 'emerald' }
}

export const INITIAL_PANTRY = {
  sabao: 15,
  detergente: 10,
  aguaSanitaria: 85,
  amaciante: 70,
  desinfetante: 50,
}

export const INITIAL_SHOPPING_LIST = [
  { productId: 'sabao', qty: 1, checked: false },
  { productId: 'detergente', qty: 1, checked: false },
]

export const INITIAL_HISTORY = [
  {
    id: 'h1',
    date: '2026-11-05',
    market: 'Mercado Bom Preço',
    total: 48.7,
    items: ['Sabão Líquido Lava-Roupas 3L', 'Detergente Neutro 500ml'],
  },
  {
    id: 'h2',
    date: '2026-10-22',
    market: 'Supermercado Verde',
    total: 32.4,
    items: ['Desinfetante Pinho 2L', 'Água Sanitária 2L'],
  },
  {
    id: 'h3',
    date: '2026-10-08',
    market: 'Atacadão do Bairro',
    total: 55.2,
    items: ['Amaciante Concentrado 1L', 'Sabão Líquido Lava-Roupas 3L'],
  },
]

export const INITIAL_IMPACT = {
  savings: 74.5,
  packagesAvoided: 4,
}

export const NOTA_EXAMPLES = [
  {
    id: 'bomPreco',
    title: 'Nota Fiscal - Mercado Bom Preço',
    subtitle: 'Compra de reposição: Sabão Líquido + Detergente',
    market: 'Mercado Bom Preço',
    items: [
      { productId: 'sabao', label: 'Sabão Líquido Lava-Roupas 3L', price: 24.9 },
      { productId: 'detergente', label: 'Detergente Neutro 500ml', price: 3.5 },
    ],
  },
  {
    id: 'verdeExtra',
    title: 'Nota Fiscal - Supermercado Verde',
    subtitle: 'Compra extra de Desinfetante e Água Sanitária',
    market: 'Supermercado Verde',
    items: [
      { productId: 'desinfetante', label: 'Desinfetante Pinho 2L', price: 9.9 },
      { productId: 'aguaSanitaria', label: 'Água Sanitária 2L', price: 6.9 },
    ],
  },
]
