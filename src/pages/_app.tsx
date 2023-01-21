import { CacheProvider, EmotionCache } from '@emotion/react'
import { Container, Stack } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import createEmotionCache from '../createEmotionCache'
import theme from '../theme'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth={false} disableGutters>
          <Header />
          <Stack spacing={2}>
            <Container maxWidth="lg" sx={{ width: '100%' }} disableGutters>
              <Stack spacing={2}>
                <Component {...pageProps} />
              </Stack>
            </Container>
            <Footer />
          </Stack>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  )
}
