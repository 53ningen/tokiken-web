import { Box, Container, Stack, Typography } from '@mui/material'
import { GetStaticProps } from 'next'
import { ContentCollection } from '../components/Home/ContentCollection'
import { Meta } from '../components/Meta'
import { SiteName } from '../const'

interface HomeProps {}

export default function Home({}: HomeProps) {
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
                { icon: '🏟', description: 'under construction', title: 'イベント' },
                { icon: '👗', description: 'under construction', title: '衣装' },
                { icon: '🗓', description: 'under construction', title: '年表' },
              ]}
            />
            <ContentCollection
              collectionTitle="超ときめき♡ツール"
              collectionDescription="「超ときめき♡宣伝部」に関する便利ツール"
              items={[
                { icon: '⌛️', title: 'カウントダウン', href: '/countdown' },
                { icon: '🌥', title: '超ときめき♡API', href: 'tokimekiapi' },
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
