import language from "@google-cloud/language"

const client = new language.LanguageServiceClient({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: (process.env.GCP_PRIVATE_KEY as string).replace(/\\n/g, "\n"),
  },
})

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
