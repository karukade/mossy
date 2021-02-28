import Image from "next/image"
import { message } from "~/lib/bot/handlers/message"
import { Message } from "~/lib/firebase/firestore"
import styles from "./leaf.module.scss"

const Leaf: React.FC<{ dir?: "left" | "right"; delay?: string }> = ({
  children,
  dir = "left",
  delay = "0s",
}) => {
  return (
    <div
      style={{
        animationDelay: delay,
      }}
      className={`${styles.container} ${
        dir === "left" ? styles.left : styles.right
      }`}
    >
      <div className={styles.leaf}>{children}</div>
      <div className={styles.branch} />
    </div>
  )
}

const leafs = ({
  messages,
  dir,
}: {
  messages: Message[]
  dir: "left" | "right"
}) => {
  let total = messages.length * 0.3
  return messages.map(({ text }, i) => {
    return (
      <Leaf delay={`${(total -= 0.3)}s`} key={i} dir={dir}>
        {messages.length > 4 && i % 4 === 0 && dir === "left" ? <Bird /> : null}
        {text}
      </Leaf>
    )
  })
}

const Bird = () => {
  return (
    <div className={styles.bird}>
      <Image src="/bird-pink.png" layout="fixed" width={47} height={43} />
    </div>
  )
}

export default leafs
