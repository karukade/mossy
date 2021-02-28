import type { NextApiRequest, NextApiResponse } from "next"
import { webhookHandler } from "~/lib/bot/handlers"
import lineClient, { LineEventObject } from "~/lib/bot/lineClient"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.end()
    return
  }

  const body = req.body as LineEventObject
  try {
    await Promise.all(body.events.map((event) => webhookHandler(event)))
  } catch (e) {
    console.log("ERROR", e)
    await lineClient.pushMessage("U97c820c6e12abbbbccfb8a862040396b", {
      type: "text",
      text: `エラーが発生しました。\n${JSON.stringify(e)}`,
    })
    res.json(e)
  }

  res.end()
}
