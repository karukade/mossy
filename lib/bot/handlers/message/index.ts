import {
  Group,
  ImageEventMessage,
  MessageEvent,
  TextEventMessage,
  WebhookEvent,
} from "@line/bot-sdk"
import { addMember, addPositiveWord } from "~/lib/firebase/firestore"
import { analyzeSentiment } from "~/lib/languageApi"
import lineClient from "~/lib/bot/lineClient"

export const message = async (event: MessageEvent) => {
  if (!hasHandlers(event.message.type)) return
  if (!isGroupeEvent(event)) return
  if (!event.source.userId) return

  switch (event.message.type) {
    case "text":
      await lineClient.replyMessage(event.replyToken, {
        type: "text",
        text: event.message.text,
      })
      return
      handlers[event.message.type]({
        event: event.message,
        groupId: event.source.groupId,
        userId: event.source.userId,
      })
  }
}

const hasHandlers = (type: string): type is keyof typeof handlers =>
  type in handlers

type EventBase<Event extends MessageEvent["message"]> = {
  groupId: string
  userId: string
  event: Event
}

const baseUrl = "https://nri-hackthon-2.vercel.app"

const handlers = {
  text: async ({ groupId, userId, event }: EventBase<TextEventMessage>) => {
    const { text } = event
    console.log("text", text)
    if (isAskUrl(text)) {
      await lineClient.pushMessage(groupId, {
        type: "text",
        text: `${baseUrl}/?gid=${groupId}\nだよ！`,
      })
      return
    }
    const score = await analyzeSentiment(text)
    await lineClient.pushMessage(groupId, {
      type: "text",
      text: `${JSON.stringify(score)}`,
    })
    console.log("score", score)
    const positiveScore = score?.score ? score.score * 100 : 0
    const isPositive = positiveScore >= 0
    const userProfile = await lineClient.getGroupMemberProfile(groupId, userId)
    await addMember(groupId, userProfile)

    if (!isPositive) return
    await addPositiveWord(groupId, {
      text,
      user: userProfile.displayName,
      id: userProfile.userId,
    })
  },
  image: async (event: ImageEventMessage, replyToken: string) => {
    await lineClient.replyMessage(replyToken, {
      type: "text",
      text: "画像はまだ対応していません",
    })
  },
}

const isAskUrl = (text: string) =>
  /^(Mossy|mossy|mossy|MOSSY|モッシー|もっしー)/.test(text.trim())

const isGroupeEvent = (
  event: WebhookEvent
): event is WebhookEvent & { source: Group } => event.source.type === "group"
