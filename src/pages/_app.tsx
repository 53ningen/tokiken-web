import { CacheProvider, EmotionCache } from '@emotion/react'
import { Container, Stack } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Amplify } from 'aws-amplify'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import awsExports from '../aws-exports'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { AuthProvider } from '../context/AuthContext'
import createEmotionCache from '../createEmotionCache'
import * as gtag from '../lib/gtag'
import '../styles/global.css'
import theme from '../theme'

Amplify.configure({ ...awsExports })

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Google Analytics
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <AuthProvider>
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
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
