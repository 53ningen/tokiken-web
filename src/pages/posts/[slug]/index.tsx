import { GraphQLResult } from '@aws-amplify/api-graphql'
import { Container, Stack, Typography } from '@mui/material'
import { API } from 'aws-amplify'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import { GetPostQuery, Post } from '../../../API'
import { Meta } from '../../../components/Meta'
import { NavBar } from '../../../components/NavBar'
import { PostBody } from '../../../components/Post/PostBody'
import { PostMeta } from '../../../components/Post/PostMeta'
import { RevalidateNotFoundPost, RevalidatePost } from '../../../const'
import { useAuth } from '../../../context/AuthContext'
import { getPost } from '../../../graphql/queries'
import theme from '../../../theme'

interface PostProps {
  slug?: string
  givenPost?: Post
}

export default function PostPage({ slug, givenPost }: PostProps) {
  const title = givenPost?.title || 'no title'
  const description = givenPost?.description || undefined
  const { initialized, isLoggedIn } = useAuth()
  const [post, setPost] = useState<Post | undefined>(givenPost)
  const [latest, setLatest] = useState(false)
  useEffect(() => {
    ;(async () => {
      if (!latest && slug && initialized && isLoggedIn()) {
        const res = (await API.graphql({
          query: getPost,
          variables: { slug },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        })) as GraphQLResult<GetPostQuery>
        if (res.data?.getPost) {
          setPost(res.data.getPost as Post)
        }
        setLatest(true)
      }
    })()
  }, [slug, givenPost, initialized, isLoggedIn, latest])
  return (
    <>
      <Meta title={title} description={description} />
      <main>
        <Stack spacing={2}>
          <NavBar
            items={[
              { path: '/posts', title: '部誌' },
              { path: `/posts/${slug}`, title: post?.title || '' },
            ]}
          />
        </Stack>
        <Stack>
          <Container maxWidth="md">
            <Stack mt={4} p={{ xs: 1, sm: 2 }} spacing={2}>
              <>
                <Typography variant="h3" color={theme.palette.primary.main}>
                  {title}
                </Typography>
                <PostMeta meta={post} />
              </>
              <PostBody body={post?.body || 'Post has no body.'} />
            </Stack>
          </Container>
        </Stack>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
  const { slug } = context.params as { slug: string }
  const res = (await API.graphql({
    query: getPost,
    variables: { slug },
  })) as GraphQLResult<GetPostQuery>
  if (res.data?.getPost) {
    const givenPost = res.data.getPost as Post
    return {
      props: {
        slug,
        givenPost,
      },
      revalidate: RevalidatePost,
    }
  } else {
    return {
      notFound: true,
      revalidate: RevalidateNotFoundPost,
    }
  }
}
