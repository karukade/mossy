import type { NextApiRequest, NextApiResponse } from "next"
import { webhookHandler } from "~/lib/bot/handlers"
import { LineEventObject } from "~/lib/bot/lineClient"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.end()
    return
  }

  const body = req.body as LineEventObject
  try {
    await Promise.all(body.events.map((event) => webhookHandler(event)))
    res.json({ result: "OK" })
  } catch (e) {
    res.json(e)
  }

  res.end()
}
