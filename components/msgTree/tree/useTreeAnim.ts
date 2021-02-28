import { useCallback, useEffect, useState } from "react"

export const useLoopAnim = (interval = 5000) => {
  const [anim, setAnim] = useState(false)
  useEffect(() => {
    const timer = setInterval(() => {
      setAnim(true)
    }, interval)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const onAnimEnd = useCallback(() => {
    if (anim) {
      setAnim(false)
    }
  }, [anim])

  return {
    anim,
    onAnimEnd,
  }
}
