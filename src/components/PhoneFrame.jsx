import { useEffect, useRef } from 'react'

export const PHONE_OVERLAY_ID = 'phone-frame-overlay-root'

export default function PhoneFrame({ children, scrollKey }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [scrollKey])

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div
        className="relative bg-bg overflow-hidden rounded-[56px] border-[14px] border-slate-950 shadow-2xl"
        style={{ width: 'min(390px, 100%)', height: 'min(844px, 100vh - 32px)' }}
      >
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 w-[120px] h-[32px] bg-black rounded-full" />

        <div
          ref={scrollRef}
          className="absolute inset-0 overflow-y-auto overflow-x-hidden rounded-[42px]"
          style={{ zoom: 0.8 }}
        >
          {children}
        </div>

        <div
          id={PHONE_OVERLAY_ID}
          className="absolute inset-0 z-[60] rounded-[42px] overflow-hidden pointer-events-none"
          style={{ zoom: 0.8 }}
        />

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50 w-32 h-1 bg-white/70 rounded-full pointer-events-none" />

        <div className="absolute -left-[14px] top-[110px] w-[3px] h-8 bg-slate-950 rounded-l" />
        <div className="absolute -left-[14px] top-[150px] w-[3px] h-12 bg-slate-950 rounded-l" />
        <div className="absolute -left-[14px] top-[210px] w-[3px] h-12 bg-slate-950 rounded-l" />
        <div className="absolute -right-[14px] top-[160px] w-[3px] h-16 bg-slate-950 rounded-r" />
      </div>
    </div>
  )
}
