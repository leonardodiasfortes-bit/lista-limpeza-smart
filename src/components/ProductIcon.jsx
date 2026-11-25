function BottleShape({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect x="9" y="2" width="6" height="3" rx="1" fill={color} />
      <path d="M8 6h8l1.5 3.5v11a1.5 1.5 0 0 1-1.5 1.5H8a1.5 1.5 0 0 1-1.5-1.5v-11L8 6Z" fill={color} />
      <rect x="7.3" y="11" width="9.4" height="2" fill="white" fillOpacity="0.35" />
    </svg>
  )
}

function JugShape({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M9 3h4v2.2c1.8.5 3 2 3 3.8v9c0 1.7-1.3 3-3 3h-4c-1.7 0-3-1.3-3-3V9c0-1.8 1.2-3.3 3-3.8V3Z" fill={color} />
      <path d="M14 7.5h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <rect x="7.3" y="12" width="9.4" height="2" fill="white" fillOpacity="0.35" />
    </svg>
  )
}

function SprayShape({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M9 9h6l1 10.5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 8 19.5L9 9Z" fill={color} />
      <rect x="10" y="6" width="4" height="3" fill={color} />
      <path d="M12 2.5v2M10 3.2l.9 1.6M14 3.2l-.9 1.6" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M8 6.5h5a1.5 1.5 0 0 1 1.5 1.5v.5H7v-.5A1.5 1.5 0 0 1 8 6.5Z" fill={color} />
      <rect x="7.6" y="12.5" width="8.8" height="2" fill="white" fillOpacity="0.35" />
    </svg>
  )
}

const SHAPES = {
  sabao: BottleShape,
  detergente: BottleShape,
  amaciante: BottleShape,
  aguaSanitaria: JugShape,
  desinfetante: SprayShape,
}

const COLORS = {
  sabao: { bg: '#DBEAFE', fg: '#1E40AF' },
  detergente: { bg: '#D1FAE5', fg: '#059669' },
  aguaSanitaria: { bg: '#CFFAFE', fg: '#0E7490' },
  amaciante: { bg: '#FCE7F3', fg: '#BE185D' },
  desinfetante: { bg: '#DCFCE7', fg: '#15803D' },
}

export default function ProductIcon({ productId, size = 56 }) {
  const Shape = SHAPES[productId] || BottleShape
  const colors = COLORS[productId] || { bg: '#E2E8F0', fg: '#475569' }

  return (
    <div
      className="rounded-2xl flex items-center justify-center shrink-0"
      style={{ width: size, height: size, backgroundColor: colors.bg, padding: size * 0.18 }}
    >
      <Shape color={colors.fg} />
    </div>
  )
}
