import { useEffect, useState } from "react"

export default function Index() {
  const [res, setRes] = useState<string | null>(null)
  useEffect(() => {
    ;(async () => {
      const res = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          text: "ハッピー",
        }),
      }).then((r) => r.json())
      setRes(JSON.stringify(res))
    })()
  }, [])
  if (res === null) return "loading"
  return (
    <div>
      <code>{res}</code>
    </div>
  )
}
