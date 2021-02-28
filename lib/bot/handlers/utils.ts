import { Group, Room, WebhookEvent } from "@line/bot-sdk"

type GroupEvent = WebhookEvent & { source: Group }
type RoomEvent = WebhookEvent & { source: Room }

export const isGroupeOrRoomEvent = (
  event: WebhookEvent
): event is GroupEvent | RoomEvent =>
  event.source.type === "group" || event.source.type === "room"

export const extractGroupOrRoomId = (event: GroupEvent | RoomEvent) => {
  return event.source.type === "group"
    ? event.source.groupId
    : event.source.roomId
}
