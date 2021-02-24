import * as firebase from "firebase-admin"

class FirebaseApp {
  private static _instance: FirebaseApp
  private _db: FirebaseFirestore.Firestore
  private _storage: firebase.storage.Storage
  private constructor() {
    let db: FirebaseFirestore.Firestore | null = null

    if (firebase.apps.length === 0) {
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
      db = firebase.firestore()
      if (process.env.NODE_ENV === "development")
        db.settings({
          host: "localhost:8080",
          ssl: false,
        })
    }
    this._db = db ?? firebase.firestore()
    this._storage = firebase.storage()
  }
  public get db() {
    return this._db
  }
  public get storage() {
    return this._storage
  }
  public static get instance() {
    if (!this._instance) {
      this._instance = new FirebaseApp()
    }
    return this._instance
  }
}

export const db = FirebaseApp.instance.db
export const storage = FirebaseApp.instance.storage
