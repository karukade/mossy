export type LandProps = {
  width: number
  height: number
}

export default function Land({ width, height }: LandProps) {
  return (
    <>
      <defs>
        <linearGradient id="grand-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#728367" />
          <stop offset="20%" stopColor="#464b3b" />
        </linearGradient>
      </defs>
      <ellipse
        fill="url(#grand-gradient)"
        cx={width / 2}
        cy={height + (width / 2) * 0.5 * 0.4}
        rx={width / 2}
        ry={(width / 2) * 0.5}
      />
    </>
  )
}
