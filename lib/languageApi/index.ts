import language from "@google-cloud/language"

const client = new language.LanguageServiceClient({
  projectId: "nri-hackathon-305314",
  credentials: {
    client_email: "test-701@nri-hackathon-305314.iam.gserviceaccount.com",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCYvdFheGFoYrH7\nh41WLOApRcxO2o2Un/jJ+Q6YhKFXqR0pxPYvyhjP2wnGBsfGrzC9l8NjGK37DkcM\nX6Ib1cEG5wQuw1zf0N3PwrNtb0g4dFOfNb4+pYKu9kToKJBTv0UMQKWXMccsT9mM\nz0DfgrKN/0wkgn978WHylU7gVheQb6BUKAL4Ed5be8joD46tC9a1LE94i1LZAYPg\noQ71Ql3oPwDlIcbYT91PAy7YBCl0O2yaLYX/D5Du/Kp4jR1tbFylZ+eTgI0Guc/b\n0g0J4M1Afn21s87E7GBkSBy04SFvq1ScXZmZgQMY2GBC/digKHc9lMgS1u3bW3Mt\neTj0WebbAgMBAAECggEAA5M92Wg173mP7PFJT6ERRiYKGDZpZfcwnZmky9Ee7axZ\nsGaZ1JiIaCUaX3Y9Ktti6q0ot6MWP3AgHZwHcVtZf03c/TM5c0uyRXCrPn6CVD/0\nzR826sR5AJtnFYANkMhDV3wT5CwYG2NrFi6ruA+ZGlXFdH1Repc10bXI+NtLBeht\nso0MDXrh7gDeYKcaId3H4BLyCxvlHsjxjC5e1reydCIhZLgO/BKKF/bZJK/vZEoA\nHQaV2yu4G9D91htuU1rNiSxyhVH3rhzyeHlsCc8cJjASpJqynuVNyo15EjGmzIHd\nGND0xfzEUh09UI52UazLdeLvs4zltWFkGo819zOhoQKBgQDUO3+PC2/zs7F2aNZ/\nGus9fMyV92f/wuDpe13nnSjkk5HN4z5Rjs/SOGjKHYhfQVzN052t5MjkriPnysS3\n0H1zwbNHz1idyornQkhDu8frcFiw84SKtwhFecfpVjVMkp+T+PhEE1UMxJPyasDK\nyxzs9xETm4Hd7VOa3mSYzyhr2QKBgQC4PZT+WZ5X+8RAODeYQQlHIzWmeHhlqfnU\nngQ8MKAe6HAy3ZlpP+Z7e+lPx1IOP/ztCjM+RrzybA2NwplDcAUfoZ9QXkZ5Zs0E\nZifoI9nOkl0REWXMohi50EGD3Qx1YRuBcVJgtvqDXa+p9PrSZgxaGWO7ZOAIimJh\n1F5M99470wKBgH3DABSQr3dW7PsAptJM7kbSVB0trSfmoAZa/0tHWrsQIx9A4GXN\n3aJxoM7b7zqa7dZd5prr7otsEYTCKA3QcvaMOqN738QpCGR/Z3kTpiUCvtukgc79\nJN6einLfjdfhLsStjNgyKHzXY+ALmFDTSUG2Kh1XUf5jKt6jmDLg1tAJAoGBAJtb\nmmrMaUBp1bgNb5vco5Uv9IqWpXec2EVYpduXaT4G5K2PvVBKCPFxsHCMc/3+KSo8\n4q8N+UA2q0sxoAmEyV097VhY1vaCIDkoZ1hR+tU9CGtfD0d6HH17RfOKj3nfU9FY\nHI3fXekuM/WN1X9be+jx5e5cBqpM/t7dtFMU5HnvAoGANHthWYkO3I5ZIzLo5SE8\n0UG1yWENhKJ2IHKT/eTpbjhgW/BlD7rDrHIPE9WLCSeooDaDISG9ZRSAl6fgGWft\n1g2KTL6LAyoxtwWR9UGbHfNA92ag6jNueMeF5tBmbdcI43CGfzranTndxul+AMhG\nVw+U2Za2Yq1A8lFgxsAVnAA=\n-----END PRIVATE KEY-----\n",
  },
})

export const analyzeSentiment = async (text: string) => {
  console.log("private_key", process.env.GCP_PRIVATE_KEY)
  const [result] = await client.analyzeSentiment({
    document: {
      content: text,
      type: "PLAIN_TEXT",
      language: "ja",
    },
  })
  return result.documentSentiment
}
