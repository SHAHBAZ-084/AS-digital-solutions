import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  once?: boolean
  rootMargin?: string
  threshold?: number
}

export function useInView<T extends HTMLElement>({
  once = true, rootMargin = '80px 0px 80px 0px', threshold = 0.01,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      }, { rootMargin, threshold }, )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once, rootMargin, threshold])

  return { ref, inView }
}
