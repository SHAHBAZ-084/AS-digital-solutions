import { useEffect, useState } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const footer = document.getElementById('site-footer')
    if (!footer || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(Boolean(entry?.isIntersecting))
      },
      {
        root: null,
        // Start showing a bit before the footer fully enters view
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.05,
      },
    )

    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed right-4 bottom-[5.75rem] z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-[#121826] text-white shadow-[0_8px_20px_rgba(0,0,0,0.28)] transition hover:border-accent/50 hover:bg-[#1a2233] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:right-6 sm:bottom-[6.25rem]"
      aria-label="Scroll to top"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 14.5 12 8.5l6 6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
