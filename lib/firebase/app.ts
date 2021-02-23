import * as firebase from "firebase-admin"

if (!firebase.apps.length) {
  firebase.initializeApp({
    // @ts-ignore
    credential: firebase.credential.cert({
      projectId: "nri-hackathon",
      clientEmail:
        "firebase-adminsdk-qjug7@nri-hackathon.iam.gserviceaccount.com",
      privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(
        /\\n/g,
        "\n"
      ),
    }),
  })
}

export const db = firebase.firestore()
export const storage = firebase.storage()
