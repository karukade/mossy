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

type EventBase<Event extends MessageEvent["message"]> = {
  groupId: string
  userId: string
  event: Event
}

const TREE_URL = "https://mossy.vercel.app"

const isAskUrl = (text: string) =>
  /^(mossy|モッシー|もっしー)/.test(text.toLowerCase().trim())

const isGroupeEvent = (
  event: WebhookEvent
): event is WebhookEvent & { source: Group } => event.source.type === "group"

const hasHandlers = (type: string): type is keyof typeof handlers =>
  type in handlers

export const message = async (event: MessageEvent) => {
  if (!hasHandlers(event.message.type)) return
  if (!isGroupeEvent(event)) return
  if (!event.source.userId) return

  switch (event.message.type) {
    case "text":
      await handlers[event.message.type]({
        event: event.message,
        groupId: event.source.groupId,
        userId: event.source.userId,
      })
  }
}

const handlers = {
  text: async ({ groupId, userId, event }: EventBase<TextEventMessage>) => {
    const { text } = event
    if (isAskUrl(text)) {
      await lineClient.pushMessage(groupId, {
        type: "text",
        text: `${TREE_URL}/?gid=${groupId}\nだよ！`,
      })
      return
    }

    const score = await analyzeSentiment(text)

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
