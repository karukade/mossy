import { GetServerSideProps } from "next"
import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import Header from "~/components/Header"
import MessageTree from "~/components/MessageTree"
import { fetchGroupData, GroupDate } from "~/lib/firebase/firestore"

export default function Group({ data }: { data: GroupDate }) {
  const router = useRouter()
  if (data === null) {
    if (typeof window !== "undefined") router.push("/404")
    return null
  }
  return (
    <div>
      <Head>
        <title>Mossy | {data.profile.groupName}の木</title>
      </Head>
      <Header {...data.profile} />
      <MessageTree messages={data.messages} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { group } = context.params
  if (typeof group !== "string" || group === "")
    return {
      props: {
        data: null,
      },
    }
  const groupDate = await fetchGroupData(group)

  return {
    props: {
      data: groupDate,
    },
  }
}
