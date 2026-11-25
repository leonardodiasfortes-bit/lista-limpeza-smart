import { createPortal } from 'react-dom'
import { PHONE_OVERLAY_ID } from './PhoneFrame'

export default function Modal({ open, onClose, children }) {
  if (!open) return null

  const overlayRoot = typeof document !== 'undefined' ? document.getElementById(PHONE_OVERLAY_ID) : null
  if (!overlayRoot) return null

  return createPortal(
    <div
      className="absolute inset-0 flex items-center justify-center bg-black/50 p-4 pointer-events-auto"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 max-h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    overlayRoot
  )
}
