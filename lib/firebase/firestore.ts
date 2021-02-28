import * as firebase from "firebase-admin"
import { db } from "./app"
import { GroupSummaryResponse, Profile } from "@line/bot-sdk"
import lineClient from "../bot/lineClient"

export type GroupInfo = {
  id: string
  type: "group" | "room"
}

export type Message = {
  text: string
  user: string
  id: string
}

/**
 * ユーザー、グループのDocumentReferenceを返す
 */

const getRef = <RefType extends "user" | "group", Model = GroupInfo>(
  id: string,
  type: RefType
) => {
  return db.doc(`${type}/${id}`).withConverter(createConverter<Model>())
}

/**
 * firestoreのデータに型をつけるためのutil
 */
const createConverter = <T extends Record<string, any>>() => {
  return {
    toFirestore(data: T): firebase.firestore.DocumentData {
      return data
    },
    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot): T {
      return snapshot.data() as T
    },
  }
}

export const addPositiveWord = async (groupId: string, message: Message) => {
  await db.collection(`group/${groupId}/messages`).add(message)
}

/**
 * グループの作成
 */
export const addGroup = async (id: string, type: GroupInfo["type"]) => {
  const ref = getRef(id, "group")
  const doc = await ref.get()
  if (!doc.exists)
    await ref.set({
      id,
      type,
    })
}

/**
 * グループにメンバーを追加
 */
export const addMember = async (groupId: string, memberProfile: Profile) => {
  const memberRef = db.doc(`group/${groupId}/members/${memberProfile.userId}`)
  const data = await memberRef.get()
  if (data.exists) return
  memberRef.set(memberProfile)
}

/**
 * グループデータの取得
 */
export type GroupDate = {
  profile: GroupSummaryResponse | null
  messages: Message[]
  members: Profile[]
} | null

export const fetchGroupData = async (groupId: string): Promise<GroupDate> => {
  console.log("fetch group data")
  const ref = getRef(groupId, "group")
  const doc = await ref.get()
  if (!doc.exists) return null
  const groupData = doc.data()
  if (!groupData) return null

  const profile =
    groupData.type === "group"
      ? await lineClient.getGroupSummary(groupData.id)
      : null
  const messagesSnapShots = await db
    .collection(`group/${groupId}/messages`)
    .withConverter(createConverter<Message>())
    .get()
  const memberSnapShots = await db
    .collection(`group/${groupId}/members`)
    .withConverter(createConverter<Profile>())
    .get()
  const messages = messagesSnapShots.docs.map((doc) => doc.data())
  const members = memberSnapShots.docs.map((doc) => doc.data())
  return {
    profile,
    messages,
    members,
  }
}
