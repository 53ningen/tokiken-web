import { Box, Container, Stack, Typography } from '@mui/material'
import { GetStaticProps } from 'next'
import { ContentCollection } from '../components/Home/ContentCollection'
import { Meta } from '../components/Meta'
import { SiteName } from '../const'
import { useAuth } from '../context/AuthContext'

interface HomeProps {}

export default function Home({}: HomeProps) {
  const { initialized, isLoggedIn } = useAuth()
  return (
    <>
      <Meta title={SiteName} />
      <Stack spacing={4} textAlign="center">
        <Container maxWidth="sm">
          <Stack p={{ xs: 1, sm: 2 }} spacing={4}>
            <Box py={4}>
              <Typography variant="caption">ときめく何かを研究していきます</Typography>
            </Box>
            <ContentCollection
              collectionTitle="超ときめき♡データベース"
              collectionDescription="「超ときめき♡宣伝部」に関するデータをまとめています"
              items={[
                { icon: '🎼', title: '楽曲', href: '/songs' },
                { icon: '💿', title: 'レコード', href: '/records' },
                { icon: '🎤', title: 'アーティスト', href: '/artists' },
                { icon: '🎬', title: 'YouTube', href: '/youtube' },
                { icon: '👗', title: '衣装', href: '/costumes' },
                {
                  icon: '🏟',
                  description: 'under construction',
                  title: 'イベント',
                  href: initialized && isLoggedIn() ? '/events' : undefined,
                },
              ]}
            />
            <ContentCollection
              collectionTitle="超ときめき♡ツール"
              collectionDescription="「超ときめき♡宣伝部」に関する便利ツール"
              items={[
                { icon: '⌛️', title: 'カウントダウン', href: '/countdown' },
                { icon: '🌥', title: '超ときめき♡API', href: '/tokimekiapi' },
                { icon: '🐤', title: '先日の宣伝部', href: '/tweets' },
              ]}
            />
            <ContentCollection
              collectionTitle="超ときめき♡研究部室"
              collectionDescription="「超ときめき♡宣伝部」に関する記事や写真など"
              items={[
                { icon: '📙', description: 'under construction', title: '部誌', href: '/posts' },
                {
                  icon: '📷',
                  description: 'under construction',
                  title: '写真館',
                  href: initialized && isLoggedIn() ? '/photos' : undefined,
                },
              ]}
            />
          </Stack>
        </Container>
      </Stack>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {},
  }
}
