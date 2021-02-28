import * as d3 from "d3"
import { useEffect } from "react"
import { Message } from "~/lib/firebase/firestore"

const count = 0

export type DataModel = Message & {
  children?: DataModel[]
}

type D3SelectionElm = d3.Selection<SVGGElement, unknown, HTMLElement, any>

export const useTreeGraph = (
  data: DataModel,
  { width, height }: { width: number; height: number }
) => {
  useEffect(() => {
    if (!data || !width) return
    const linkVertical = d3
      .linkVertical()
      // @ts-ignore
      .x((d) => d.x)
      // @ts-ignore
      .y((d) => height - d.y)

    const createPath = (
      g: D3SelectionElm,
      links: d3.HierarchyLink<DataModel>[]
    ) => {
      return (
        g
          .attr("fill", "none")
          .selectAll("path")
          .data(links)
          .join("path")
          .attr("stroke", (d) => {
            return "#934606"
          })
          .attr("id", (d, i) => `path-${i}`)
          .attr("stroke-opacity", 1)
          .attr("stroke-width", () => Math.floor(Math.random() * (11 - 4) + 4))
          .attr("stroke-dasharray", "400 400")
          .attr("stroke-dashoffset", "400")
          //@ts-ignore
          .attr("d", linkVertical)
      )
    }

    const createNode = (
      g: D3SelectionElm,
      descendants: d3.HierarchyNode<DataModel>[]
    ) => {
      const node = g
        .selectAll(".node")
        .data(descendants)
        .enter()
        .append("g")
        .attr("class", "node")
        //@ts-ignore
        .attr("transform", (d) => `translate(${d.x},${height - d.y})`)

      node
        .append("circle")
        .attr("r", 8)
        .attr("fill", (d) => "#443025")

      node
        .append("text")
        .attr("y", -12)
        .attr("fill", "#55B73D")
        .attr("style", "writing-mode: tb; glyph-orientation-vertical: 0")
        .attr("transform", (d) => `translate(0, -${d.data.text.length * 10})`)
        .style("text-anchor", "bottom")
        .attr("font-size", "80%")
        .style("font-weight", "bold")
        .text((d) => d.data.text)

      return node
    }

    const createShiftedLinks = (
      root: d3.HierarchyNode<DataModel>,
      shift: number
    ) => {
      return root.links().map((d) => {
        const { source, target } = d
        const newTarget = {
          ...target,
          // @ts-ignore
          x: target.x + shift,
        }
        const newSource =
          source.depth > 0
            ? {
                // @ts-ignore
                ...source,
                // @ts-ignore
                x: source.x + shift,
              }
            : source
        return { source: newSource, target: newTarget }
      })
    }

    const createShiftedDescendants = (
      root: d3.HierarchyNode<DataModel>,
      shift: number
    ) => {
      return root.descendants().map((d) => {
        return d.depth > 0
          ? {
              ...d,
              //@ts-ignore
              x: d.x + shift,
            }
          : d
      })
    }

    const render = async () => {
      const root = d3.hierarchy(data)

      const tree = d3.tree().size([width, height - 12 - 16 - 16 - 30 - 300])

      tree(root)

      const g = d3
        .select("svg")
        .append("g")
        .attr("transform", `translate(0, ${-8 - 30})`)

      const links = root.links()

      const path = createPath(g, links)

      const descendants = root.descendants()

      const node = createNode(g, descendants)

      await path.transition().duration(2000).attr("stroke-dashoffset", 0).end()

      const pathPosition = {
        a: createShiftedLinks(root, 20),
        b: createShiftedLinks(root, -20),
      }

      const nodePositions = {
        a: createShiftedDescendants(root, 20),
        b: createShiftedDescendants(root, -20),
      }

      let posRef: "a" | "b" = "a"

      const animatePath = () =>
        path
          .data(pathPosition[posRef])
          .transition()
          .duration(4000)
          //@ts-ignore
          .attr("d", linkVertical)
          .end()

      const animateNodes = () => {
        return (
          node
            .data(nodePositions[posRef])
            .transition()
            .duration(4000)
            //@ts-ignore
            .attr("transform", (d) => `translate(${d.x},${height - d.y})`)
            .end()
        )
      }

      const loop = async (n: number) => {
        await Promise.all([animatePath(), animateNodes()])
        posRef = posRef === "a" ? "b" : "a"
        console.log("loop", n)
        loop(n)
      }

      loop(count + 1)
    }
    render()
    return () => {
      d3.select("svg").select("g").remove()
    }
  }, [width, height])
}
