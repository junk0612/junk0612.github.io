import { ReactElement } from 'react'
import SlideRepository from '../../lib/repositories/slide'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '../../components/Layout'
import { Entry } from '../../lib/entry'
import { ContentList } from '../../components/ContentList'
import { TicTacToe } from '../../src/Game'
import { TicTacToeBoard } from '../../src/Board'
import { Client } from 'boardgame.io/react'

type Props = {
  slides: Entry[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const slides = await SlideRepository.list()

  return {
    props: { slides },
  }
}

export default Client({game: TicTacToe, board: TicTacToeBoard})
