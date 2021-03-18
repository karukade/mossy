import * as line from "@line/bot-sdk"
import { getDecryptedSecret } from "~/lib/utils"
import { LINE_CONFIG_ENCRYPTED } from "./constants"

export const config = getDecryptedSecret(LINE_CONFIG_ENCRYPTED)

class Client {
  private static _instance: line.Client
  static get instance() {
    if (!this._instance) this._instance = new line.Client(config)
    return this._instance
  }
}

export type LineEventObject = {
  events: line.WebhookEvent[]
}

export const middleWare = line.middleware(config)

export const getMemberProfile = (
  type: "group" | "room",
  gid: string,
  uid: string
) => {
  if (type === "group") return Client.instance.getGroupMemberProfile(gid, uid)
  return Client.instance.getRoomMemberProfile(gid, uid)
}

export const sendTextMessage = (
  id: string,
  text: string,
  type: "push" | "reply" = "push"
) => {
  const msg = {
    type: "text",
    text,
  } as const
  if (type === "push") {
    return Client.instance.pushMessage(id, msg)
  } else {
    return Client.instance.replyMessage(id, msg)
  }
}

export default Client.instance
