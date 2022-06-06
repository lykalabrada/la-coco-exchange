import type { GetStaticProps, NextPage } from 'next'
import NextHead from 'next/head'
import Exchange from '../components/Exchange'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('../components/Header'), {
  ssr: false
})

const Main: NextPage = () => {
  return (
    <div>
      <NextHead>
        <title>Create Next App</title>
        <meta name='description' content='La Coco Crypto Exchange' />
        <link rel='icon' href='/crypto.svg' />
      </NextHead>
      <Header />
      <Exchange />
    </div>
  )
}

export default Main
