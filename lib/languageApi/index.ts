import language from "@google-cloud/language"
import { getDecryptedSecret } from "../utils"
import { GOOGLE_SERVICE_ACCOUNT_ENCRYPTED } from "./constants"

const client = new language.LanguageServiceClient(
  getDecryptedSecret(GOOGLE_SERVICE_ACCOUNT_ENCRYPTED)
)

export const analyzeSentiment = async (text: string) => {
  const [result] = await client.analyzeSentiment({
    document: {
      content: text,
      type: "PLAIN_TEXT",
      language: "ja",
    },
  })
  return result.documentSentiment
}
