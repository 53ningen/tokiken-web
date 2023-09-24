import { GraphQLResult } from '@aws-amplify/api-graphql'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Fab, Stack, Tooltip } from '@mui/material'
import { API } from 'aws-amplify'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import { GetPostQuery, GetPostQueryVariables, ListPostCategoriesQuery, Post } from '../../../API'
import { Meta } from '../../../components/Meta'
import { NavBar } from '../../../components/NavBar'
import { PostEditor } from '../../../components/Post/PostEditor'
import { RevalidatePost } from '../../../const'
import { getPost, listPostCategories } from '../../../graphql/queries'
import theme from '../../../theme'

interface EditProps {
  slug?: string
  categories?: string[]
}

export default function PostEditPage({ slug, categories }: EditProps) {
  const [loaded, setLoaded] = useState(false)
  const [post, setPost] = useState<Post>()
  const [preview, setPreview] = useState(false)
  const fetchPost = async (slug: string) => {
    const res = (await API.graphql({
      query: getPost,
      variables: {
        slug,
      } as GetPostQueryVariables,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    })) as GraphQLResult<GetPostQuery>
    return res.data ? (res.data.getPost as Post) : undefined
  }
  useEffect(() => {
    ;(async () => {
      if (slug) {
        try {
          const a = await fetchPost(slug)
          if (a) {
            setPost(a)
          }
          setLoaded(true)
        } catch (e) {
          console.error(e)
        }
      }
    })()
  }, [slug])
  return (
    <>
      <Meta title={`edit: ${post?.title || slug || ''}`} noindex={true} />
      <main>
        <NavBar
          items={[
            { path: '/posts', title: '部誌' },
            { path: `/posts/${slug}`, title: post?.title || 'no title' },
            { path: `/posts/${slug}/edit`, title: '編集' },
          ]}
        />
        <Stack px={{ xs: 2, sm: 2, md: 4 }}>
          <PostEditor slug={slug} post={post} readyToEdit={loaded} preview={preview} categories={categories} />
        </Stack>
        <Tooltip title={preview ? 'edit' : 'preview'} arrow>
          <Fab
            color="secondary"
            onClick={() => setPreview(!preview)}
            sx={{
              position: 'fixed',
              bottom: { xs: theme.spacing(4), sm: theme.spacing(4), md: theme.spacing(8) },
              right: { xs: theme.spacing(4), sm: theme.spacing(4), md: theme.spacing(8) },
            }}>
            {preview ? <EditIcon /> : <VisibilityIcon />}
          </Fab>
        </Tooltip>
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

export const getStaticProps: GetStaticProps<EditProps> = async (context) => {
  const { slug } = context.params as { slug: string }
  const fetchCategories = async () => {
    const res = (await API.graphql({
      query: listPostCategories,
    })) as GraphQLResult<ListPostCategoriesQuery>
    const items = res.data!.listPostCategories!.items.map((i) => i!.id) as string[]
    return items
  }
  const categories: string[] = await fetchCategories()
  return {
    props: { slug, categories },
    revalidate: RevalidatePost,
  }
}
