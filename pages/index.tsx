import { WebhookEvent } from "@line/bot-sdk"
import { useEffect, useState } from "react"

export default function Index() {
  const [res, setRes] = useState<string | null>(null)
  useEffect(() => {
    ;(async () => {
      const body: { events: WebhookEvent[] } = {
        events: [
          {
            replyToken: "hogehoge",
            mode: "active",
            timestamp: 12345678,
            type: "message",
            message: {
              id: "hogehoge",
              type: "text",
              text: "ハッピー",
            },
            source: {
              type: "group",
              groupId: "C882112f547e3b9c230d86bf2663e0e2a",
              userId: "U97c820c6e12abbbbccfb8a862040396b",
            },
          },
        ],
      }
      const res = await fetch("/api/bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body),
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
