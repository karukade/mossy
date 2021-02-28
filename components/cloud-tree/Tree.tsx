import { schemeCategory10 } from "d3"
import cloud from "d3-cloud"
import { useEffect, useState } from "react"
import { Message } from "~/lib/firebase/firestore"

type TreeProps = {
  messages: Message[]
  dimention: { width: number; height: number }
}

const randRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const Tree = ({ messages, dimention }: TreeProps) => {
  const [words, setWords] = useState<cloud.Word[] | null>(null)
  useEffect(() => {
    const msg = messages.map(({ text }) => ({
      text,
    }))
    const layout = cloud()
      .size([dimention.width, dimention.height])
      .words(msg)
      .rotate(0)
      .fontSize((d) => randRange(16, 40))
      .on("end", (words) => {
        setWords(words)
        console.log(layout.size())
      })
    layout.start()
  }, [dimention])

  return (
    <div>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimention.width} ${dimention.height} `}
      >
        <g
          transform={`translate(${dimention.width / 2}, ${
            dimention.height / 2
          })`}
        >
          {words &&
            words.map((w, i) => (
              <Text
                key={i}
                size={w.size}
                x={w.x}
                y={w.y}
                fill={schemeCategory10[i % 10]}
              >
                {w.text}
              </Text>
            ))}
        </g>
      </svg>
    </div>
  )
}

type TextProps = {
  size?: number
  fill: string
  x?: number
  y?: number
}

const Text: React.FC<TextProps> = ({ size, fill, x, y, children }) => {
  return (
    <text
      fontSize={`${size}px`}
      fill={fill}
      textAnchor="middle"
      transform={`translate(${x}, ${y})`}
    >
      {children}
    </text>
  )
}

export default Tree
