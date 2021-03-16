import {
  ImageEventMessage,
  MessageEvent,
  TextEventMessage,
} from "@line/bot-sdk"
import { addMember, addPositiveWord } from "~/lib/firebase/firestore"
import { analyzeSentiment } from "~/lib/languageApi"
import lineClient, {
  getMemberProfile,
  sendTextMessage,
} from "~/lib/bot/lineClient"
import { extractGroupOrRoomId, isGroupeOrRoomEvent } from "../utils"
import { MESSAGES } from "../../constants"

type EventBase<Event extends MessageEvent["message"]> = {
  groupId: string
  userId: string
  type: "group" | "room"
  event: Event
}

const isAskUrl = (text: string) =>
  /^(mossy|モッシー|もっしー)/.test(text.toLowerCase().trim())

const hasHandlers = (type: string): type is keyof typeof handlers =>
  type in handlers

export const message = async (event: MessageEvent) => {
  if (!hasHandlers(event.message.type)) return
  if (!isGroupeOrRoomEvent(event)) return
  if (!event.source.userId) return

  switch (event.message.type) {
    case "text":
      await handlers[event.message.type]({
        event: event.message,
        groupId: extractGroupOrRoomId(event),
        userId: event.source.userId,
        type: event.source.type,
      })
  }
}

const handlers = {
  text: async ({
    groupId,
    userId,
    event,
    type,
  }: EventBase<TextEventMessage>) => {
    const { text } = event
    if (isAskUrl(text)) {
      await sendTextMessage(groupId, MESSAGES.url(groupId))
      return
    }

    const score = await analyzeSentiment(text)

    const positiveScore = score?.score ? score.score * 100 : 0
    const isPositive = positiveScore >= 0

    const userProfile = await getMemberProfile(type, groupId, userId)
    await addMember(groupId, userProfile)

    if (!isPositive) return
    const messageCount = await addPositiveWord(groupId, {
      text,
      user: userProfile.displayName,
      id: userProfile.userId,
    })

    // MENTION_GROWING_COUNTの倍数ごとに育ったよのメッセージを送る
    if (
      messageCount !== 0 &&
      messageCount % parseInt(process.env.MENTION_GROWING_COUNT as string) === 0
    ) {
      await sendTextMessage(groupId, MESSAGES.grow(groupId))
    }

    if (
      messageCount !== 0 &&
      messageCount % parseInt(process.env.MENTION_MOSS_COUNT as string) === 0
    ) {
      await sendTextMessage(groupId, MESSAGES.mossLink())
    }
  },
  image: async (event: ImageEventMessage, replyToken: string) => {
    return
    await lineClient.replyMessage(replyToken, {
      type: "text",
      text: "画像はまだ対応していません",
    })
  },
}
