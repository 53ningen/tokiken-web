import { GraphQLResult } from '@aws-amplify/api-graphql'
import { Button, Card, CardActionArea, Container, Grid, Stack, Typography } from '@mui/material'
import { API, graphqlOperation } from 'aws-amplify'
import { GetStaticProps } from 'next'
import { useState } from 'react'
import { Album, ListAlbumsOrderByDateQuery, ListAlbumsOrderByDateQueryVariables, ModelSortDirection } from '../../API'
import Link from '../../components/Link'
import { Meta } from '../../components/Meta'
import { NavBar } from '../../components/NavBar'
import { AlbumEditDialog } from '../../components/Photos/AlbumEditDialog'
import { S3Image } from '../../components/S3Image'
import { RevalidatePost } from '../../const'
import { useAuth } from '../../context/AuthContext'
import { listAlbumsOrderByDate } from '../../graphql/queries'
import theme from '../../theme'

interface Props {
  albums?: Album[]
}

export default function AlbumsPage({ albums }: Props) {
  const title = '超ときめき♡写真館'
  const description = 'ロックオンフリータイムで撮影した写真など'
  const { initialized, isLoggedIn } = useAuth()
  const [formOpen, setFormOpen] = useState(false)
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
        <Stack>
          <Container maxWidth="md">
            <Stack spacing={2}>
              {initialized && isLoggedIn() && (
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" onClick={() => setFormOpen(true)}>
                    アルバムを追加する
                  </Button>
                </Stack>
              )}
              <Grid container spacing={2}>
                {albums &&
                  albums.map((album) => {
                    return (
                      <Grid key={album.id} item xs={6} sm={4} md={4} lg={4}>
                        <AlbumCard album={album} />
                      </Grid>
                    )
                  })}
              </Grid>
            </Stack>
          </Container>
        </Stack>
        <AlbumEditDialog open={formOpen} handleClose={() => setFormOpen(false)} />
      </main>
    </>
  )
}

interface AlbumCardProps {
  album: Album
}

const AlbumCard = ({ album }: AlbumCardProps) => {
  return (
    <Card>
      <CardActionArea href={`/photos/${album.id}`} LinkComponent={Link} title={album.description}>
        <Stack
          p={1}
          position="absolute"
          style={{
            backgroundColor: 'white',
            opacity: 0.75,
            bottom: 0,
            width: '100%',
          }}>
          <Typography variant="caption">{album.date}</Typography>
          <Typography variant="subtitle2" style={{ height: '3rem', textOverflow: 'ellipsis' }}>
            {album.title}
          </Typography>
        </Stack>
        <S3Image
          imgKey={album.imageKey || 'blank.png'}
          loading="lazy"
          style={{
            aspectRatio: 2 / 3,
            objectFit: 'cover',
            width: '100%',
            height: 'auto',
            maxWidth: '300px',
            maxHeight: '300px',
            display: 'block',
          }}
        />
      </CardActionArea>
    </Card>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const list = async (nextToken?: string) => {
    const res = (await API.graphql(
      graphqlOperation(listAlbumsOrderByDate, {
        nextToken,
        sortDirection: ModelSortDirection.DESC,
        type: 'album',
      } as ListAlbumsOrderByDateQueryVariables)
    )) as GraphQLResult<ListAlbumsOrderByDateQuery>
    if (!res.data?.listAlbumsOrderByDate?.items || res.errors) {
      console.error(res)
      throw new Error('unexpected error')
    }
    const items = res.data.listAlbumsOrderByDate.items as Album[]
    const token = res.data?.listAlbumsOrderByDate?.nextToken as string | undefined
    return { items, token }
  }
  var nextToken: string | undefined = undefined
  var albums: Album[] = []
  for (;;) {
    const { items, token }: { items: Album[]; token: string | undefined } = await list(nextToken)
    albums = albums.concat(items)
    if (token) {
      nextToken = token
    } else {
      break
    }
  }
  return { props: { albums }, revalidate: RevalidatePost }
}
