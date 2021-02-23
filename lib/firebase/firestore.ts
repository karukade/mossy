import * as firebase from "firebase-admin"
import { db } from "./app"
import { GroupSummaryResponse, Profile } from "@line/bot-sdk"

export type GroupInfo = GroupSummaryResponse

if (process.env.NODE_ENV === "development") {
  db.settings({
    host: "localhost:8080",
    ssl: false,
  })
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

type Message = {
  text: string
  user: string
  id: string
}

export const addPositiveWord = async (groupId: string, message: Message) => {
  await db.collection(`group/${groupId}/messages`).add(message)
}

/**
 * グループの作成
 */
export const addGroup = async (groupSummary: GroupSummaryResponse) => {
  const ref = getRef(groupSummary.groupId, "group")
  const doc = await ref.get()
  if (!doc.exists) await ref.set(groupSummary)
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
export const fetchGroupData = async (groupId: string) => {
  const ref = getRef(groupId, "group")
  const doc = await ref.get()
  if (!doc.exists) return null
  const profile = doc.data()
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
 *
 */
export const fetchGroupIds = async () => {
  const snapShots = await db
    .collection("/group")
    .withConverter(createConverter<GroupInfo>())
    .get()
  const groups = snapShots.docs.map((doc) => doc.data().groupId)
  return groups
}
