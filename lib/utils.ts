import { DataModel } from "~/hooks/useTreeGraph"

export const convertHierarchy = (messages: DataModel[]) => {
  if (messages.length === 0 || messages.length === 1) return messages[0]
  const copy = messages.slice(0)
  const [root, ...rest] = copy
  let index = 5
  root.children = rest.splice(0, index)

  let children = root.children

  while (rest.length !== 0) {
    index = index === 2 ? 2 : index - 1
    let chache: DataModel[] = []

    for (const child of children) {
      if (rest.length === 0) break
      child.children = rest.splice(0, index)
      chache = [...chache, ...child.children]
    }
    children = chache
  }
  return copy[0]
}
