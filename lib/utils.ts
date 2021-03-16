import crypto from "crypto"
const algorithm = "aes-128-cbc"

export const getDecryptedSecret = (encrypted: string) => {
  console.log("ENCRYPTION_KEY", process.env.ENCRYPTION_KEY)
  console.log("ENCRYPTION_IV", process.env.ENCRYPTION_IV)

  const decipher = crypto.createDecipheriv(
    algorithm,
    process.env.ENCRYPTION_KEY as string,
    process.env.ENCRYPTION_IV as string
  )

  let decrypted = decipher.update(encrypted, "base64", "utf8")

  decrypted += decipher.final("utf8")

  return JSON.parse(decrypted)
}
