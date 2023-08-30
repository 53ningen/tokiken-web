import { Box, FormControlLabel, FormGroup, Stack, Switch, Typography } from '@mui/material'
import { GetStaticProps } from 'next'
import { useState } from 'react'
import CostumeCollection from '../../components/Costumes/CostumeCollection'
import { Meta } from '../../components/Meta'
import { NavBar } from '../../components/NavBar'
import { SiteName } from '../../const'
import { Costume, listCostumes } from '../../spreadsheets'
import theme from '../../theme'

interface CostumesPageProps {
  costumes: Costume[]
}

export default function CostumesPage({ costumes }: CostumesPageProps) {
  const title = '超ときめき♡衣装データベース'
  const description = '超ときめき♡宣伝部の衣装データ'
  const [showAll, setShowAll] = useState(false)
  return (
    <>
      <Meta title={`${title} - ${SiteName}`} description={description} />
      <main>
        <Stack spacing={2}>
          <NavBar items={[{ path: '/costumes', title: '衣装データベース' }]} />
          <Stack textAlign="center" py={1}>
            <Typography variant="h3" color={theme.palette.primary.main}>
              {title}
            </Typography>
            <Typography variant="caption">{description}</Typography>
          </Stack>
          <Box display="flex" justifyContent="center">
            <FormGroup>
              <FormControlLabel
                label="ときめき♡宣伝部衣装を表示（作成中）"
                control={<Switch checked={showAll} onChange={() => setShowAll(!showAll)} />}
              />
            </FormGroup>
          </Box>
          <CostumeCollection costumes={showAll ? costumes : costumes.filter((c) => c.costumeInfoReady)} />
        </Stack>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<CostumesPageProps> = async () => {
  const costumes = await listCostumes()
  return {
    props: {
      costumes,
    },
  }
}
