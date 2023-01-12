import GameRepository from '../../lib/repositories/game'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '../../components/Layout'
import { Entry } from '../../lib/entry'
import { ContentList } from '../../components/ContentList'

type Props = {
  games: Entry[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const games = await GameRepository.list()

  return {
    props: { games },
  }
}

const Games: NextPage<Props> = ({ games }) => {
  return (
    <>
      <Head>
        <title>Games | junk0612</title>
      </Head>
      <Layout title="Games" description="ゲーム一覧">
        <h1 className="text-3xl mb-4">Games</h1>
        <ContentList entries={games} />
      </Layout>
    </>
  )
}

export default Games
