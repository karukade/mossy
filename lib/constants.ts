export class FireStoreReadError extends Error {
  constructor(public message: string) {
    super(message)
  }
}

export const firestoreReadErrorMessage = {
  noExists: (docPath?: string) => `${docPath} is not exists`,
  noData: (docPath?: string) => `${docPath} hasn't data`,
}
