import * as line from "@line/bot-sdk"
const config = {
  channelSecret: process.env.LINE_SEC,
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
}

class Client {
  private static _instance: line.Client
  static get instance() {
    if (!this._instance) this._instance = new line.Client(config)
    return this._instance
  }
}

export type LineEventObject = {
  events: line.WebhookEvent[]
}

export const middleWare = line.middleware(config)

export default Client.instance
