import { JoinEvent } from "@line/bot-sdk"
import { addGroup } from "~/lib/firebase/firestore"
import lineClient from "~/lib/bot/lineClient"
import { extractGroupOrRoomId, isGroupeOrRoomEvent } from "../utils"

export const join = async (message: JoinEvent) => {
  if (!isGroupeOrRoomEvent(message)) return

  const id = extractGroupOrRoomId(message)

  await lineClient.replyMessage(message.replyToken, {
    type: "text",
    text: `はじめまして、緑大好きMOSSY（モッシー）だよ。🌲\nみんなのポジティブな言葉で木を育てるよ。\n木の様子が見たい時は、“mossy”って投稿してね。`,
  })

  await addGroup(id, message.source.type)
}
