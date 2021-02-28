import styles from "./ground-leaf.module.scss"
import Leaf from "./Leaf.svg"
const GroundLeafs = () => {
  return (
    <>
      <GroundLeaf bottom="8px" right="24%" />
      <GroundLeaf bottom="-2px" left="19%" />
      <GroundLeaf bottom="21px" left="27%" />
    </>
  )
}

type GroundLeafProps = {
  bottom: string
  left?: string
  right?: string
}

const GroundLeaf = (props: GroundLeafProps) => {
  return (
    <div
      style={{
        ...props,
      }}
      className={styles.leaf}
    >
      <Leaf />
    </div>
  )
}

export default GroundLeafs
