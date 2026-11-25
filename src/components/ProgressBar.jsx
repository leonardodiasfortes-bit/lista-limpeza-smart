const TONE_BAR = {
  alert: 'bg-alert',
  amber: 'bg-amber',
  navy: 'bg-navy',
  emerald: 'bg-emerald',
}

export default function ProgressBar({ percent, tone }) {
  return (
    <div
      className="h-4 w-full rounded-full bg-slate-200 overflow-hidden"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full transition-all duration-500 ${TONE_BAR[tone] || TONE_BAR.navy}`}
        style={{ width: `${Math.max(4, percent)}%` }}
      />
    </div>
  )
}
