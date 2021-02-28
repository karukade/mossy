import { GetServerSideProps } from "next"
import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import { useRef } from "react"
import Header from "~/components/header"
import Tree from "~/components/msgTree"
import { useGlobalCssVars } from "~/hooks/useGlobalCssVars"
import { fetchGroupData, GroupDate } from "~/lib/firebase/firestore"

const Title = ({ profile }: { profile: NonNullable<GroupDate>["profile"] }) => {
  return <title>Mossy{profile && ` | ${profile.groupName}の木`}</title>
}

export default function Group({ data }: { data: GroupDate }) {
  const headerRef = useRef<HTMLElement | null>(null)
  useGlobalCssVars(headerRef)

  const router = useRouter()

  if (data === null) {
    if (typeof window !== "undefined") router.push("/404")
    return null
  }

  return (
    <div>
      <Head>
        <Title profile={data.profile} />
      </Head>
      <Header ref={headerRef} {...data.profile} />
      <Tree messages={data.messages} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const group = context.params?.group
  if (typeof group !== "string" || group === "")
    return {
      props: {
        data: null,
      },
    }
  const groupDate: GroupDate = {
    profile: null,
    messages: [
      {
        text: "ありがとう",
        id: "ほげ",
        user: "hoge",
      },
      {
        text: "ありがとう",
        id: "ほげ",
        user: "hoge",
      },
      {
        text: "ありがとう",
        id: "ほげ",
        user: "hoge",
      },
      {
        text: "ありがとう",
        id: "ほげ",
        user: "hoge",
      },
    ],
    members: [],
  }
  // await fetchGroupData(group)

  return {
    props: {
      data: groupDate,
    },
  }
}
