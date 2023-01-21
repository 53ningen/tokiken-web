import Head from 'next/head'
import { SiteDescription, SiteUrl } from '../const'

interface MetaProps {
  title: string
  description?: string
}

export const Meta = ({ title, description = SiteDescription }: MetaProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${SiteUrl}/300x300.png`} />
      <meta name="twitter:card" content="summary" />
    </Head>
  )
}
