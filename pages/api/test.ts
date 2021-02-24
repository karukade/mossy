import type { NextApiRequest, NextApiResponse } from "next"
import { analyzeSentiment } from "~/lib/languageApi"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { text },
  } = req
  try {
    const result = await analyzeSentiment(text)
    res.json(result)
    res.end()
  } catch (e) {
    res.send(JSON.stringify(e))
  }
}
