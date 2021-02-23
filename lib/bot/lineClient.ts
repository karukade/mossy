import * as line from "@line/bot-sdk"
const config = {
  channelSecret: process.env.LINE_SEC,
  channelAccessToken:
    "OnVtwdcF5RfclZR/lfRpiBUCUmHkr7HNfl8ZqmzxUwC1cIJ3sBtaJNsV43MA5zDSi7ZW7RW4yWT85qbDrTE1tCikqOWyZdbixLWoy9wxO7UUNWJ4dOtwQ6JUoSFTnIEn62JciOOGTAO+RWCWTTx+uQdB04t89/1O/w1cDnyilFU=",
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
