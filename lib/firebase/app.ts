import * as firebase from "firebase-admin"

if (!firebase.apps.length) {
  firebase.initializeApp({
    // @ts-ignore
    credential: firebase.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(
        /\\n/g,
        "\n"
      ),
    }),
  })
}

export const db = firebase.firestore()
export const storage = firebase.storage()
