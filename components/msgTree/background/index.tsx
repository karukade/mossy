import Clouds from "../clouds"
import styles from "./background.module.scss"

const Background = () => {
  return (
    <>
      <Clouds />
      <div className={styles.mountain} />
      <div className={styles.sun} />
    </>
  )
}

export default Background
