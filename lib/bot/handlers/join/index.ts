import { JoinEvent } from "@line/bot-sdk"
import { addGroup } from "~/lib/firebase/firestore"
import lineClient from "~/lib/bot/lineClient"

export const join = async (message: JoinEvent) => {
  if (message.source.type !== "group") return

  const { groupId } = message.source

  await lineClient.replyMessage(message.replyToken, {
    type: "text",
    text: `はじめまして、緑大好きMOSSY（モッシー）だよ。🌲\nみんなのポジティブな言葉で木を育てるよ。\n木の様子が見たい時は、“mossy”って投稿してね。`,
  })

  const groupSummary = await lineClient.getGroupSummary(groupId)

  await addGroup(groupSummary)
}
