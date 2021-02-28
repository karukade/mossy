import Image from "next/image"
import { Message } from "~/lib/firebase/firestore"
import styles from "./leaf.module.scss"

const randRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const Leaf: React.FC<{ dir?: "left" | "right"; delay?: string }> = ({
  children,
  dir = "left",
  delay = "0s",
}) => {
  return (
    <div
      className={`${styles.container} ${
        dir === "left" ? styles.left : styles.right
      }`}
    >
      <div
        style={{
          animationDelay: delay,
        }}
        className={styles.leaf}
      >
        {children}
      </div>
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
  return messages.map(({ text }, i) => {
    return (
      <Leaf key={i} dir={dir}>
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
