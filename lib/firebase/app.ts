import * as firebase from "firebase-admin"
import { getDecryptedSecret } from "../utils"
import { FIREBASE_CERT_ENCRYPTED } from "./constants"

class FirebaseApp {
  private static _instance: FirebaseApp
  private _db: FirebaseFirestore.Firestore
  private _storage: firebase.storage.Storage
  private constructor() {
    let db: FirebaseFirestore.Firestore | null = null

    if (firebase.apps.length === 0) {
      firebase.initializeApp({
        credential: firebase.credential.cert(
          getDecryptedSecret(FIREBASE_CERT_ENCRYPTED)
        ),
      })
      db = firebase.firestore()
      // if (process.env.NODE_ENV === "development")
      //   db.settings({
      //     host: "localhost:8080",
      //     ssl: false,
      //   })
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
