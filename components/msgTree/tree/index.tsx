import { useMemo } from "react"
import { Message } from "~/lib/firebase/firestore"
import leafs from "../leafs"
import styles from "./tree.module.scss"
import { useLoopAnim } from "./useTreeAnim"

type TreeProps = {
  messages: Message[]
}

const splitMessage = (messages: Message[]) => {
  return messages.reduce<{ left: Message[]; right: Message[] }>(
    (res, msg, i) => {
      const dir = i % 2 === 0 ? "left" : "right"
      res[dir].push(msg)
      return res
    },
    { left: [], right: [] }
  )
}

const Tree = ({ messages }: TreeProps) => {
  //const { anim, onAnimEnd } = useLoopAnim()
  const { left, right } = useMemo(() => {
    return splitMessage(messages)
  }, [messages])

  return (
    <div className={`${styles.container}`}>
      <TopOfTree />
      <div className={`${styles.col} ${styles.colLeft}`}>
        {leafs({
          messages: left,
          dir: "left",
        })}
      </div>
      <div className={`${styles.col} ${styles.colRight}`}>
        {leafs({
          messages: right,
          dir: "right",
        })}
      </div>
      <div className={styles.rootOfTree}></div>
    </div>
  )
}

const TopOfTree = () => (
  <div className={styles.topOfTree}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 71 69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.1 7.6C32.5 14.5 36.4 22 32.7 26.5C29 31 21.1 29.4 12.7 22.5C5.2 16.2 4.2 8.4 0 0.599996C5.1 -1.1 15.7 0.699996 24.1 7.6Z"
        fill="#63C79D"
      />
      <path
        d="M53.0998 16.1C47.0998 21.1 44.2998 26.4 46.8998 29.6C49.4998 32.8 55.1998 31.7 61.1998 26.7C66.5998 22.3 67.2998 16.7 70.2998 11C66.6998 9.8 59.0998 11.1 53.0998 16.1Z"
        fill="#63C79D"
      />
      <path
        d="M35.5998 48.6C36.0998 48 36.5998 47.2 36.9998 46.4L38.1998 43.9C38.9998 42.3 39.8998 40.5 40.7998 38.9C41.6998 37.2 42.6998 35.6 43.6998 34C45.7998 30.8 47.9998 27.7 50.7998 25.1C47.3998 27 44.3998 29.6 41.5998 32.3C40.1998 33.6 38.8998 35.1 37.4998 36.5C37.3998 36.2 37.2998 35.8 37.2998 35.5C36.5998 32.8 35.0998 30.4 33.2998 28.4C31.4998 26.5 29.2998 25 27.0998 23.8C24.8998 22.6 22.5998 21.7 20.2998 20.7C22.3998 22.1 24.3998 23.4 26.2998 24.9C28.1998 26.4 29.8998 28.1 31.0998 30C32.2998 31.9 33.0998 34 33.1998 36.2C33.3998 38.3 32.9998 40.8 32.1998 42.2C31.7998 42.9 31.2998 43.3 30.5998 43.8C30.1998 44.1 29.7998 44.4 29.1998 44.8C28.5998 45.2 27.9998 45.8 27.2998 46.5C26.5998 47.2 25.9998 48.2 25.6998 49.2C25.2998 50.2 25.0998 51.1 24.8998 52C24.7998 52.9 24.7998 53.7 24.7998 54.6C24.8998 55.5 24.9998 56.4 25.1998 57.3C25.5998 59.1 26.3998 60.7 27.0998 61.9C27.7998 63.2 28.4998 64.2 28.8998 65.1C29.7998 66.9 30.2 67.6 30 69H42C41.9 67.2 41.0998 65.6 40.4998 63.8C39.7998 62.1 38.8998 60.6 37.9998 59.4C37.0998 58.2 36.2998 57.3 35.6998 56.5C35.0998 55.7 34.6998 55.1 34.3998 54.5C34.2998 54.2 34.0998 53.9 34.0998 53.6C33.9998 53.3 33.9998 52.9 33.8998 52.5C33.7998 52.2 33.7998 51.9 33.7998 51.7C33.7998 51.5 33.7998 51.3 33.7998 51.1C33.7998 50.7 34.5998 49.8 35.5998 48.6Z"
        fill="#5F544A"
      />
    </svg>
  </div>
)

export default Tree