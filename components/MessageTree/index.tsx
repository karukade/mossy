import React, { useEffect } from "react"
import styled from "styled-components"
import { convertHierarchy } from "~/lib/utils"
import { useTreeGraph } from "~/hooks/useTreeGraph"
import { Message } from "~/lib/firebase/firestore"
import Clouds from "./Clouds"
import Land from "./Land"

type Props = {
  messages: Message[]
}

const headerHeight = 60

const MessageTree: React.FC<Props> = ({ messages }) => {
  const width = typeof window !== "undefined" ? window.innerWidth : null
  const height =
    typeof window !== "undefined" ? window.innerHeight - headerHeight : null

  useTreeGraph(convertHierarchy(messages))
  useEffect(() => {
    document.body.style.setProperty("--w", `${width}px`)
  })

  if (!width) return null
  return (
    <StyledContainer>
      <StyledSvg width={width} height={height}>
        <Land width={width} height={height} />
      </StyledSvg>
      <Clouds />
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  overflow: hidden;
  position: relative;
`

const StyledSvg = styled.svg`
  overflow: visible;
  position: relative;
  z-index: 2;
`

export default MessageTree
