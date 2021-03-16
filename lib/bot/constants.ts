export const TREE_URL = process.env.VERCEL_URL as string
const MOSS_URL = "https://search.rakuten.co.jp/search/mall/%E8%8B%94/"
export const MESSAGES = {
  url: (groupId: string) => `${TREE_URL}/tree/${groupId}\nだよ！`,
  grow: (groupId: string) =>
    `みんなの言葉のおかげで木が育ってきたよ🌲\n${TREE_URL}/tree/${groupId}`,
  mossLink: () =>
    `みんなならきっとリアルでも植物を育てられるんじゃないかな🌲\n${MOSS_URL}`,
}
