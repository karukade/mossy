export class FireStoreReadError extends Error {
  constructor(public message: string) {
    super(message)
  }
}

export const firestoreReadErrorMessage = {
  noExists: (docPath?: string) => `${docPath} is not exists`,
  noData: (docPath?: string) => `${docPath} hasn't data`,
}

export const FIREBASE_CERT_ENCRYPTED =
  "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"
