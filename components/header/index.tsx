import { GroupSummaryResponse } from "@line/bot-sdk"
import React from "react"
import styles from "./header.module.scss"

export type HeaderProps = Partial<GroupSummaryResponse>

const Header = React.forwardRef<HTMLElement, HeaderProps>(function Header(
  { groupName, pictureUrl },
  ref
) {
  return (
    <header ref={ref} className={styles.header}>
      {groupName && (
        <>
          <div className={styles.avatar}>
            <img src={pictureUrl} alt="" />
          </div>
          <span>{groupName}</span>
        </>
      )}
    </header>
  )
})

export default Header
