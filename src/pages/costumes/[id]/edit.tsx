import { Box, Paper, Stack } from '@mui/material'
import { GetStaticPaths, GetStaticProps } from 'next'
import CostumeEditor from '../../../components/Costumes/CostumeEditor'
import { Meta } from '../../../components/Meta'
import { NavBar } from '../../../components/NavBar'
import { SiteName } from '../../../const'
import { useAuth } from '../../../context/AuthContext'
import { Costume, getCostume, listCostumes } from '../../../spreadsheets'

interface CostumeEditPageProps {
  costume: Costume
}

export default function CostumeEditPage({ costume }: CostumeEditPageProps) {
  const title = `超ときめき♡衣装データベース: ${costume.costumeName}`
  const description = `超ときめき♡宣伝部の衣装: ${costume.costumeName} のデータ`
  const { isLoggedIn, initialized } = useAuth()

  return (
    <>
      <Meta title={`${title} - ${SiteName}`} description={description} />
      <main>
        <Stack spacing={2}>
          <NavBar
            items={[
              { path: '/costumes', title: '衣装データベース' },
              { path: `/costumes/${costume.costumeId}`, title: costume.costumeName },
              { path: `/costumes/${costume.costumeId}/edit`, title: '編集' },
            ]}
          />
          <Paper elevation={0}>
            <Box px={{ xs: 1, sm: 4, md: 8 }}>
              <CostumeEditor costume={costume} />
            </Box>
          </Paper>
        </Stack>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const costumes = await listCostumes()
  const ids = costumes.map((a) => a.costumeId)
  const paths = ids.map((id) => {
    return {
      params: {
        id,
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<CostumeEditPageProps> = async ({ params }) => {
  const id = params!.id as string
  const costume = await getCostume(id)
  if (!costume) {
    throw Error(`${id} not found`)
  }
  return {
    props: {
      costume,
    },
  }
}
