import type { NextApiRequest, NextApiResponse } from "next"
import { webhookHandler } from "~/lib/bot/handlers"
import { LineEventObject } from "~/lib/bot/lineClient"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.end()
    return
  }

  console.log("body", req.body)

  const body = req.body as LineEventObject

  await Promise.all(body.events.map((event) => webhookHandler(event)))

  res.end()
}
