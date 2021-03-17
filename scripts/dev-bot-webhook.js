const path = require("path")

require("dotenv").config({
  path: path.resolve(__dirname, "../.env.local"),
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
  }).then((d) => {
    if (d.status !== 200) {
      console.error(`Request failed with status ${d.status}`)
      process.exit(0)
    }
  })
  console.log(`forward http://localhost:${PORT} -> ${endpoint}`)
})()
