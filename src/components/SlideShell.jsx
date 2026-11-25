import { useEffect } from 'react'

export default function SlideShell({ step, totalSteps, children }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex flex-col">
      <div className="flex-1 min-h-0 flex flex-col justify-center px-6 md:px-16 py-6 max-w-6xl mx-auto w-full">
        {children}
      </div>
      <div className="flex items-center justify-center gap-2 pb-6 shrink-0">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i + 1 === step ? 'w-8 bg-navy' : 'w-1.5 bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
