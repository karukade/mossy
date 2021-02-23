import { GetServerSideProps } from "next"
import Head from "next/head"

export default function Group({ group }: { group: string }) {
  return <div>{group}</div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { group } = context.params
  return {
    props: { group }, // will be passed to the page component as props
  }
}
