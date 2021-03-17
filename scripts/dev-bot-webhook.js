const path = require("path")
const fs = require("fs").promises
const envPath = path.resolve(__dirname, "../.env.local")

require("dotenv").config({
  path: envPath,
})

const ngrok = require("ngrok")
const fetch = require("node-fetch")
const PORT = 3000

;(async () => {
  const onLogEvent = (data) => {
    console.log(`\n\nngrok:`, data)
  }
  const endpoint = await ngrok.connect({
    addr: PORT,
    onLogEvent,
  })
  await fetch("https://api.line.me/v2/bot/channel/webhook/endpoint", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      endpoint: `${endpoint}/api/bot`,
    }),
  }).then(async (d) => {
    if (d.status !== 200) {
      console.error(`Request failed with status ${d.status}`)
      process.exit(0)
    }
    const env = await fs.readFile(envPath, { encoding: "utf-8" })
    return fs.writeFile(
      envPath,
      env.replace(/^(MOSSY_DOMAIN=).+$/m, `$1${endpoint}`)
    )
  })
  console.log(`forward http://localhost:${PORT} -> ${endpoint}`)
})()
