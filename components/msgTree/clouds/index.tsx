import styles from "./clouds.module.scss"
import CloudS from "./CloudS.svg"
import CloudM from "./CloudM.svg"
import CloudL from "./CloudL.svg"

type CloudProps = {
  size: "s" | "m" | "l"
  top: string
  speed: string
  left: string
  delay: number
}

const cloudMap = {
  s: <CloudS />,
  m: <CloudM />,
  l: <CloudL />,
}

export default function Clouds() {
  return <div className={styles.cloud}></div>
}

const Cloud = ({ left, size, top, speed, delay }: CloudProps) => {
  return (
    <div
      className={styles.cloud}
      style={{
        top,
        transform: `translateX(${left})`,
        animationDuration: speed,
        animationDelay: `${delay}s`,
      }}
    >
      <div>{cloudMap[size]}</div>
    </div>
  )
}
