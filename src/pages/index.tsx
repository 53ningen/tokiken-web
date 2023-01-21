import { Box, Container, Stack, Typography } from '@mui/material'
import { GetStaticProps } from 'next'
import { ContentCollection } from '../components/Home/ContentCollection'
import Link from '../components/Link'
import { Meta } from '../components/Meta'
import { SiteName } from '../const'

interface HomeProps {}

export default function Home({}: HomeProps) {
  return (
    <>
      <Meta title={SiteName} />
      <Stack spacing={4} textAlign="center">
        <Container maxWidth="sm">
          <Stack p={{ xs: 1, sm: 2 }} spacing={3}>
            <Box py={4}>
              <Typography variant="caption">ときめく何かを研究していきます</Typography>
            </Box>
            <Stack spacing={2}>
              <Box>
                <Typography variant="h2">超ときめき♡データベース</Typography>
                <Typography variant="caption">
                  <Link href="https://toki-sen.com/" target="_blank">
                    「超ときめき♡宣伝部」
                  </Link>
                  に関するデータをまとめています
                </Typography>
              </Box>
              <ContentCollection />
            </Stack>
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
