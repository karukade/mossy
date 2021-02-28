import type { Message } from "~/lib/firebase/firestore"
import Tree from "./tree"
import styles from "./msg-tree.module.scss"
import Background from "./background"
import GroundLeafs from "./groundLeaf"

type MsgTreeProps = {
  messages: Message[]
}

const MsgTree = ({ messages }: MsgTreeProps) => {
  return (
    <div className={styles.container}>
      <Tree messages={messages} />
      <GroundLeafs />
      <Background />
    </div>
  )
}

export default MsgTree
