import React, { useEffect } from "react"
import { convertHierarchy } from "~/lib/utils"
import { useTreeGraph } from "~/hooks/useTreeGraph"
import { Message } from "~/lib/firebase/firestore"
import Clouds from "./Clouds"
import Land from "./Land"
import styles from "./message-tree.module.scss"
import { useDimention } from "~/hooks/useDimention"

type Props = {
  messages: Message[]
}

const MessageTree: React.FC<Props> = ({ messages }) => {
  const { width, height } = useDimention()

  useTreeGraph(convertHierarchy(messages), { width, height })
  useEffect(() => {
    document.body.style.setProperty("--w", `${width}px`)
  })

  if (!width) return null

  return (
    <div className={styles.container}>
      <svg className={styles.svg} width={width} height={height}>
        <Land width={width} height={height} />
      </svg>
      <Clouds />
    </div>
  )
}

export default MessageTree
