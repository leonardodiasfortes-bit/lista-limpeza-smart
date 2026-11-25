const TONE_STYLES = {
  alert: 'bg-alert-light text-alert border border-red-300',
  amber: 'bg-amber-light text-amber border border-amber-300',
  navy: 'bg-navy-light text-navy border border-blue-300',
  emerald: 'bg-emerald-light text-emerald-dark border border-emerald-300',
}

export default function StatusTag({ label, tone }) {
  return (
    <span
      className={`inline-block rounded-full px-4 py-1.5 text-base font-semibold whitespace-nowrap ${TONE_STYLES[tone] || TONE_STYLES.navy}`}
    >
      {label}
    </span>
  )
}
