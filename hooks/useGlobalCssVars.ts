import { MutableRefObject, useEffect } from "react"

const setCssVars = (headerRef?: MutableRefObject<HTMLElement | null>) => {
  if (typeof headerRef !== "undefined" && !headerRef.current) return
  const headerHeight = headerRef?.current ? headerRef.current.clientHeight : 0
  const ch = window.innerHeight - headerHeight
  const ww = window.innerWidth
  document.documentElement.style.setProperty("--ch", `${ch}px`)
  document.documentElement.style.setProperty("--ww", `${ww}px`)
}

export const useGlobalCssVars = (
  headerRef?: MutableRefObject<HTMLElement | null>
) => {
  useEffect(() => {
    setCssVars(headerRef)
    const resizeObserver = new ResizeObserver(() => {
      setCssVars(headerRef)
    })
    resizeObserver.observe(document.documentElement)
    return () => {
      resizeObserver.disconnect()
    }
  }, [])
}
