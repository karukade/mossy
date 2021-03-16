import * as firebase from "firebase-admin"
import { db } from "./app"
import { GroupSummaryResponse, Profile } from "@line/bot-sdk"
import lineClient from "../bot/lineClient"
import { FireStoreReadError, firestoreReadErrorMessage } from "../constants"

export type GroupInfo = {
  id: string
  messageCount: number
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
  const groupRef = getRef(groupId, "group")
  return db.runTransaction(async (t) => {
    const doc = await t.get(groupRef)
    const data = doc.data()
    if (!data)
      throw new FireStoreReadError(
        firestoreReadErrorMessage.noData(groupRef.path)
      )

    const newCount = ++data.messageCount

    await t.update(groupRef, {
      messageCount: newCount,
    })

    await db.collection(`group/${groupId}/messages`).add(message)

    return newCount
  })
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
      messageCount: 0,
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

export type GroupDate = {
  profile: GroupSummaryResponse | null
  messages: Message[]
  members: Profile[]
} | null

/**
 * グループデータの取得
 */
export const fetchGroupData = async (groupId: string): Promise<GroupDate> => {
  const ref = getRef(groupId, "group")
  const doc = await ref.get()

  if (!doc.exists)
    throw new FireStoreReadError(firestoreReadErrorMessage.noExists(ref.path))

  const groupData = doc.data()

  if (!groupData)
    throw new FireStoreReadError(firestoreReadErrorMessage.noData(ref.path))

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

/**
 * グループの削除
 */
export const removeGroup = async (groupId: string) => {
  await getRef(groupId, "group").delete()
}
