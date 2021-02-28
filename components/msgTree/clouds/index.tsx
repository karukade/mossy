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
  return (
    <>
      <Cloud delay={0} left="-105%" size="m" top="13%" speed="20s" />
      <Cloud delay={0.8} left="-200%" size="l" top="20%" speed="30s" />
      <Cloud delay={2} left="-300%" size="m" top="36%" speed="40s" />
      <Cloud delay={3} left="-180%" size="s" top="50%" speed="50s" />
    </>
  )
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
