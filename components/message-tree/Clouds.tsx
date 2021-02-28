import Image from "next/image"
import styles from "./clouds.module.scss"

type CloudProps = {
  top: string
  width: string
  speed: string
  offset: string
}

export default function Clouds() {
  return (
    <>
      <Cloud offset="-200%" width="24%" top="13%" speed="18s" />
      <Cloud offset="-600%" width="15%" top="20%" speed="20s" />
      <Cloud offset="-900%" width="10%" top="24%" speed="40s" />
      <Cloud offset="-200%" width="18%" top="40%" speed="28s" />
      <Cloud offset="-300%" width="20%" top="32%" speed="35s" />
    </>
  )
}

const Cloud = ({ offset, width, top, speed }: CloudProps) => {
  return (
    <div
      className={styles.cloud}
      style={{
        width,
        transform: `translateX(${offset})`,
        top,
        animationDuration: speed,
      }}
    >
      <div className={styles.inner}>
        <Image layout="fill" src="/cloud@2x.png" />
      </div>
    </div>
  )
}
