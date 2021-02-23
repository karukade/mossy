import { Readable } from "stream"
import { storage } from "./app"

const bucketName = "nri-hackathon.appspot.com"

export const saveImage = async (fileName: string, imgStream: Readable) => {
  const bucket = storage.bucket(bucketName)
  const file = bucket.file(`hengao/${fileName}.jpg`)
  const ws = file.createWriteStream()
  return new Promise<string>((resolve, reject) => {
    imgStream
      .pipe(ws)
      .on("finish", async () => {
        await file.makePublic()
        resolve(file.publicUrl())
      })
      .on("error", (e) => reject(e))
  })
}
