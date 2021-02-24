import { WebhookEvent } from "@line/bot-sdk"
import { message } from "./message"
import { join } from "./join"
import lineClient from "../lineClient"

const handlers = {
  join,
  message,
} as const

export const webhookHandler = async (event: WebhookEvent) => {
  if (!(event.type in handlers)) return
  if (
    event.type === "message" &&
    event.message.type === "text" &&
    event.source.type === "group"
  ) {
    const { text } = event.message
    await lineClient.pushMessage(event.source.groupId, {
      type: "text",
      text,
    })
  }
  return
  await handlers[(event.type as any) as keyof typeof handlers](event as any)
}
