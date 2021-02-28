import { useEffect, useState } from "react"

const HEADER_HEIGHT = 60

type Dimention = {
  width: number
  height: number
}

export const useDimention = (): Dimention | null => {
  const [dimention, setDimention] = useState<Dimention | null>(null)

  useEffect(() => {
    setDimention({
      width: window.innerWidth,
      height: window.innerHeight - HEADER_HEIGHT,
    })
  }, [])
  return dimention
}
