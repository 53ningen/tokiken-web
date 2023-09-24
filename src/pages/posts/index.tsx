import { GraphQLResult } from '@aws-amplify/api-graphql'
import { Container, List, ListItemButton, Stack, Typography } from '@mui/material'
import { API, graphqlOperation } from 'aws-amplify'
import { GetStaticProps } from 'next'
import { ListPostMetadataQuery, ListPostMetadataQueryVariables, ModelSortDirection, Post } from '../../API'
import { Meta } from '../../components/Meta'
import { NavBar } from '../../components/NavBar'
import { ISO8601toDateTimeString, RevalidatePost } from '../../const'
import { listPostMetadata } from '../../graphql/custom-queries'
import theme from '../../theme'

interface PostsProps {
  posts: Omit<Post, 'body'>[]
}

export default function Posts({ posts }: PostsProps) {
  const title = '超ときめき♡研究部誌'
  const description = '超ときめき♡研究部に関するメモなど'
  return (
    <>
      <Meta title={title} description={description} />
      <main>
        <Stack spacing={2}>
          <NavBar items={[{ path: '/posts', title: '部誌' }]} />
          <Stack textAlign="center" py={1}>
            <Typography variant="h3" color={theme.palette.primary.main}>
              {title}
            </Typography>
            <Typography variant="caption">{description}</Typography>
          </Stack>
        </Stack>
        <Stack>
          <Container maxWidth="md">
            <List>
              {posts.map((p) => {
                return (
                  <ListItemButton key={p.slug} href={`/posts/${p.slug}`}>
                    <Stack>
                      <Stack direction="row" spacing={2}>
                        <Typography variant="caption">{ISO8601toDateTimeString(p.createdAt)}</Typography>
                        <Typography variant="caption" color={theme.palette.primary.main}>
                          {p.category.id.toUpperCase()}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle1">{p.title}</Typography>
                    </Stack>
                  </ListItemButton>
                )
              })}
            </List>
          </Container>
        </Stack>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<PostsProps> = async () => {
  const list = async (nextToken?: string) => {
    const res = (await API.graphql(
      graphqlOperation(listPostMetadata, {
        nextToken,
        sortDirection: ModelSortDirection.DESC,
      } as ListPostMetadataQueryVariables)
    )) as GraphQLResult<ListPostMetadataQuery>
    if (!res.data?.listPostsOrderByCreatedAt?.items || res.errors) {
      console.error(res)
      throw new Error('unexpected error')
    }
    const items = res.data.listPostsOrderByCreatedAt.items as Omit<Post, 'body'>[]
    const token = res.data?.listPostsOrderByCreatedAt?.nextToken as string | undefined
    return { items, token }
  }
  var nextToken: string | undefined = undefined
  var posts: Omit<Post, 'body'>[] = []
  for (;;) {
    const { items, token }: { items: Omit<Post, 'body'>[]; token: string | undefined } = await list(nextToken)
    posts = posts.concat(items)
    if (token) {
      nextToken = token
    } else {
      break
    }
  }
  return { props: { posts }, revalidate: RevalidatePost }
}
