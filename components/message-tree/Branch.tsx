import type * as d3 from "d3"
import { DataModel } from "~/hooks/useTreeGraph"
type BranchProps = {
  stroke?: string
  link: d3.HierarchyLink<DataModel>
  pathGenerator: d3.Link<any, d3.DefaultLinkObject, [number, number]>
}
const Branch = ({ stroke, link, pathGenerator }: BranchProps) => {
  return <path stroke={} />
}
