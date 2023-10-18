import { GraphQLResult } from '@aws-amplify/api-graphql'
import { Box, Button, Card, CardActionArea, Container, Grid, Stack, Typography } from '@mui/material'
import { API, graphqlOperation } from 'aws-amplify'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import {
  Album,
  AlbumItem,
  GetAlbumQuery,
  ListAlbumItemsQuery,
  ListAlbumItemsQueryVariables,
  ListAlbumsOrderByDateQuery,
  ListAlbumsOrderByDateQueryVariables,
  ModelSortDirection,
} from '../../../API'
import { Meta } from '../../../components/Meta'
import { NavBar } from '../../../components/NavBar'
import { AlbumItemEditDialog } from '../../../components/Photos/AlbumItemEditDialog'
import { getAlbumItemS3Key } from '../../../components/Photos/PhotoUtil'
import { PhotoViewer } from '../../../components/Photos/PhotoViewer'
import { S3Image } from '../../../components/S3Image'
import { RevalidatePost } from '../../../const'
import { useAuth } from '../../../context/AuthContext'
import { getAlbum, listAlbumItems, listAlbumsOrderByDate } from '../../../graphql/queries'
import theme from '../../../theme'

interface Props {
  album?: Album
  items?: AlbumItem[]
}

export default function AlbumPage({ album, items }: Props) {
  const title = album?.title || 'loading...'
  const description = album?.description || 'loading...'
  const { initialized, isLoggedIn } = useAuth()
  const [index, setIndex] = useState(0)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setIndex((i) => (i > 0 ? i - 1 : 0))
      }
      if (event.key === 'ArrowRight') {
        setIndex((i) => (i < items!.length - 1 ? i + 1 : i))
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })
  return (
    <>
      <Meta title={title} description={description} />
      <main>
        <Stack spacing={2}>
          <NavBar items={[{ path: '/photos', title: '写真館' }]} />
          <Stack textAlign="center" py={1}>
            <Typography variant="h3" color={theme.palette.primary.main}>
              {title}
            </Typography>
            <Typography variant="caption">{description}</Typography>
          </Stack>
        </Stack>
        <Stack pt={2}>
          <Container maxWidth="md">
            <Stack spacing={2}>
              {initialized && isLoggedIn() && (
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" onClick={() => setFormOpen(true)}>
                    写真を追加する
                  </Button>
                  <Button variant="contained">アルバム情報を更新する</Button>
                </Stack>
              )}
              <Grid container spacing={0.5}>
                {items &&
                  items.map((item, i) => {
                    return (
                      <Grid key={item.id} item xs={4} sm={4} md={3} lg={3}>
                        <AlbumImageCard
                          item={item}
                          onClick={() => {
                            setIndex(i)
                            setViewerOpen(true)
                          }}
                        />
                      </Grid>
                    )
                  })}
              </Grid>
            </Stack>
          </Container>
        </Stack>
        {album && (
          <AlbumItemEditDialog albumId={album.id} open={formOpen} order={1} handleClose={() => setFormOpen(false)} />
        )}
        {items && <PhotoViewer item={items[index]} open={viewerOpen} handleClose={() => setViewerOpen(false)} />}
      </main>
    </>
  )
}

interface AlbumItemCardProps {
  item: AlbumItem
  onClick?: () => void
}

const AlbumImageCard = ({ item, onClick }: AlbumItemCardProps) => {
  return (
    <Card variant="elevation" elevation={0} square>
      <CardActionArea onClick={onClick}>
        <Box>
          <S3Image
            imgKey={getAlbumItemS3Key(item, 300)}
            loading="lazy"
            style={{
              aspectRatio: 1,
              objectFit: 'cover',
              width: '100%',
              height: 'auto',
              maxWidth: '300px',
              maxHeight: '300px',
              display: 'block',
            }}
          />
        </Box>
      </CardActionArea>
    </Card>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = (await API.graphql(
    graphqlOperation(listAlbumsOrderByDate, {
      sortDirection: ModelSortDirection.DESC,
      type: 'album',
    } as ListAlbumsOrderByDateQueryVariables)
  )) as GraphQLResult<ListAlbumsOrderByDateQuery>
  if (!res.data?.listAlbumsOrderByDate?.items || res.errors) {
    console.error(res)
    throw new Error('unexpected error')
  }
  const items = res.data.listAlbumsOrderByDate.items as Album[]
  const albumIds = items.map((a) => a.id)
  const paths = albumIds.map((albumId) => {
    return {
      params: {
        albumId,
      },
    }
  })
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const albumId = params!.albumId as string
  const albumRes = (await API.graphql({
    query: getAlbum,
    variables: {
      id: albumId,
    } as GetAlbumQuery,
  })) as GraphQLResult<GetAlbumQuery>
  if (!albumRes.data?.getAlbum || albumRes.errors) {
    throw Error(`album not found: ${albumId}`)
  }
  const album = albumRes.data?.getAlbum as Album

  const itemsRes = (await API.graphql(
    graphqlOperation(listAlbumItems, {
      filter: {
        albumId: {
          eq: albumId,
        },
      },
    } as ListAlbumItemsQueryVariables)
  )) as GraphQLResult<ListAlbumItemsQuery>
  if (!itemsRes.data?.listAlbumItems?.items || albumRes.errors) {
    console.error(albumRes)
    throw new Error('unexpected error')
  }
  const items = itemsRes.data?.listAlbumItems.items as AlbumItem[]
  return { props: { album, items }, revalidate: RevalidatePost }
}
