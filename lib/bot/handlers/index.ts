import { WebhookEvent } from "@line/bot-sdk"
import { message } from "./message"
import { join } from "./join"

const handlers = {
  join,
  message,
} as const

export const webhookHandler = async (event: WebhookEvent) => {
  if (!(event.type in handlers)) return
  await handlers[(event.type as any) as keyof typeof handlers](event as any)
}
