import React from 'react'
import SlideRepository from '../../lib/repositories/slide'
import { GetStaticProps, NextPage } from 'next'
import { Layout } from '../../components/Layout'
import { Entry } from '../../lib/entry'
import { ContentList } from '../../components/ContentList'
import { SEO } from '../../components/SEO'

type Props = {
  slides: Entry[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const slides = await SlideRepository.list()

  return {
    props: { slides },
  }
}

const Slides: NextPage<Props> = ({ slides }) => {
  return (
    <>
      <SEO
        title="Slides"
        description="スライド一覧"
        url="https://junk0612.net/slides"
      />
      <Layout>
        <h1 className="text-3xl mb-4">Slides</h1>
        <ContentList entries={slides} />
      </Layout>
    </>
  )
}

export default Slides
