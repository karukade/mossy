import { GroupSummaryResponse } from "@line/bot-sdk"
import React from "react"
import styled from "styled-components"

export type HeaderProps = GroupSummaryResponse

const Header: React.FC<HeaderProps> = ({ groupName, pictureUrl }) => {
  return (
    <StyledHeader>
      <div className="avatar">
        <img src={pictureUrl} alt="" />
      </div>
      <span>{groupName}</span>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  padding: 8px 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 60px;
  background: #fff;
  box-shadow: 0 4px 13px 0px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  position: relative;
  z-index: 900;
  > .avatar {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    overflow: hidden;
    margin-right: 8px;
  }
`

export default Header
