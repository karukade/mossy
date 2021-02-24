import Image from "next/image"
import styled, { keyframes } from "styled-components"

type CloudProps = {
  top: string
  width: string
  speed: string
  offset: string
}

export default function Clouds() {
  return (
    <>
      <StyledClouds offset="-200%" width="24%" top="13%" speed="18s">
        <div className="inner">
          <Image layout="fill" src="/cloud@2x.png" />
        </div>
      </StyledClouds>
      <StyledClouds offset="-600%" width="15%" top="20%" speed="20s">
        <div className="inner">
          <Image layout="fill" src="/cloud@2x.png" />
        </div>
      </StyledClouds>
      <StyledClouds offset="-900%" width="10%" top="24%" speed="40s">
        <div className="inner">
          <Image layout="fill" src="/cloud@2x.png" />
        </div>
      </StyledClouds>
      <StyledClouds offset="-200%" width="18%" top="40%" speed="28s">
        <div className="inner">
          <Image layout="fill" src="/cloud@2x.png" />
        </div>
      </StyledClouds>
      <StyledClouds offset="-300%" width="20%" top="32%" speed="35s">
        <div className="inner">
          <Image layout="fill" src="/cloud@2x.png" />
        </div>
      </StyledClouds>
    </>
  )
}

const cloudAnimation = keyframes`
to {
  transform: translateX(var(--w))
}
`

const StyledClouds = styled.div<CloudProps>`
  position: absolute;
  left: 0;
  top: ${({ top }) => top};
  width: ${({ width }) => width};
  z-index: 0;
  transform: translateX(${({ offset }) => offset});
  animation: ${cloudAnimation} 10s linear infinite forwards;
  animation-duration: ${({ speed }) => speed};
  > .inner {
    padding-top: 58.15%;
  }
`
