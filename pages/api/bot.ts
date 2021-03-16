import { SignatureValidationFailed } from "@line/bot-sdk"
import { IncomingMessage, ServerResponse } from "http"
import { webhookHandler } from "~/lib/bot/handlers"
import lineClient, { LineEventObject, middleWare } from "~/lib/bot/lineClient"

/**
 * line middleware を使うのでbodyParserはfalse
 */
export const config = {
  api: {
    bodyParser: false,
  },
}

const runMiddleware = <Req, Res>(
  req: Req,
  res: Res,
  fn: (req: Req, res: Res, next: (result: any) => void) => void
) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export default async (
  req: IncomingMessage & { body: any },
  res: ServerResponse
) => {
  console.log("NODE_ENV", process.env)
  if (req.method !== "POST") {
    res.end()
    return
  }

  try {
    await runMiddleware(req, res, middleWare)
  } catch (e) {
    if (!(e instanceof SignatureValidationFailed)) {
      console.log("ERROR", e)
      await lineClient.pushMessage("U97c820c6e12abbbbccfb8a862040396b", {
        type: "text",
        text: `エラーが発生しました。\n${JSON.stringify(e)}`,
      })
    } else {
      console.log("signature error")
    }
    res.end()
    return
  }

  const body = req.body as LineEventObject
  try {
    await Promise.all(body.events.map((event) => webhookHandler(event)))
  } catch (e) {
    // TODO: next.jsでエラーログとれるようにしたい
    console.log("ERROR", e)
    await lineClient.pushMessage("U97c820c6e12abbbbccfb8a862040396b", {
      type: "text",
      text: `エラーが発生しました。\n${JSON.stringify(e)}`,
    })
  }

  res.end()
}
