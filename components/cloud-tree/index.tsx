import { useDimention } from "~/hooks/useDimention"
import { Message } from "~/lib/firebase/firestore"
import Tree from "./tree"

type CloudTreeProps = {
  messages: Message[]
}

const CloudTree = ({ messages }: CloudTreeProps) => {
  const dimention = useDimention()
  if (!dimention) return null
  return <Tree dimention={dimention} messages={messages} />
}

export default CloudTree
