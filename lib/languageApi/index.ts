import language from "@google-cloud/language"

const client = new language.LanguageServiceClient({
  projectId: "nri-hackathon-305314",
  credentials: {
    client_email: "test-701@nri-hackathon-305314.iam.gserviceaccount.com",
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
