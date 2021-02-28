import { LeaveEvent } from "@line/bot-sdk"
import { removeGroup } from "~/lib/firebase/firestore"
import { extractGroupOrRoomId } from "../utils"

export const leave = async (message: LeaveEvent) => {
  if (message.source.type === "group" || message.source.type === "room") {
    await removeGroup(extractGroupOrRoomId(message as any))
  }
}
