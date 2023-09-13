import EmailIcon from '@mui/icons-material/Email'
import {
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CostumeCollection from '../../components/Costumes/CostumeCollection'
import { ErrorBanner } from '../../components/ErrorBanner'
import { Meta } from '../../components/Meta'
import { NavBar } from '../../components/NavBar'
import { SiteName } from '../../const'
import { useAuth } from '../../context/AuthContext'
import { Costume, listCostumes } from '../../spreadsheets'
import theme from '../../theme'

interface CostumesPageProps {
  costumes: Costume[]
}

export default function CostumesPage({ costumes }: CostumesPageProps) {
  const title = '超ときめき♡衣装データベース'
  const description = '超ときめき♡宣伝部の衣装データ'
  const designers = Array.from(
    new Set(costumes.map(({ costumeDesigner }) => (costumeDesigner === '' ? '確認中' : costumeDesigner)))
  )
  const [selectedDesigners, setSelectedDesigners] = useState<string[]>(designers)
  const handleChange = (event: SelectChangeEvent<typeof selectedDesigners>) => {
    const {
      target: { value },
    } = event
    setSelectedDesigners(typeof value === 'string' ? value.split(',') : value)
  }

  const { isLoggedIn, initialized } = useAuth()
  const router = useRouter()
  const query = router.query
  const [showAll, setShowAll] = useState(false)
  useEffect(() => {
    ;(() => {
      setShowAll(query.showAll?.toString() === 'true')
    })()
  }, [query])
  const itemsOptionOnChange = (newValue: boolean) => {
    router.push({
      query: { showAll: newValue },
    })
  }
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
          <Stack>
            <Box display="flex" justifyContent="center">
              <FormControl sx={{ m: 1, minWidth: '250px' }}>
                <InputLabel>Designers</InputLabel>
                <Select
                  multiple
                  size="small"
                  value={selectedDesigners}
                  onChange={handleChange}
                  input={<OutlinedInput label="Designers" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', overflow: 'clip', gap: theme.spacing(0.5) }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5 + theme.spacing(2),
                        width: 250,
                      },
                    },
                  }}>
                  {designers.map((d) => (
                    <MenuItem
                      key={d}
                      value={d}
                      style={{
                        fontWeight:
                          selectedDesigners.indexOf(d) === -1
                            ? theme.typography.fontWeightRegular
                            : theme.typography.fontWeightMedium,
                      }}>
                      {d}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="center">
              <FormGroup>
                <FormControlLabel
                  label={<Typography variant="caption">ときめき♡宣伝部衣装を含む（作成中）</Typography>}
                  control={<Switch checked={showAll} onChange={() => itemsOptionOnChange(!showAll)} />}
                />
              </FormGroup>
            </Box>
          </Stack>
          <Box px={{ xs: 1, sm: 4, md: 8 }}>
            <ErrorBanner
              severity={showAll ? 'warning' : 'info'}
              errorMessage={
                showAll
                  ? 'ときめき♡宣伝部衣装データは作成中です。衣装展やイベントなどで撮影した写真や情報を募集しています。'
                  : '写真や情報を募集しています'
              }
              actionName={<EmailIcon />}
              action={() => {
                window.open('https://docs.google.com/forms/d/1E3EOsHMNFk6R0BUHmUFy_e1NQdtucLMQ0TmKV7L0PKY/viewform')
              }}
            />
          </Box>
          <CostumeCollection
            costumes={
              showAll
                ? costumes.filter((c) =>
                    selectedDesigners.map((d) => (d === '確認中' ? '' : d)).includes(c.costumeDesigner)
                  )
                : costumes.filter(
                    (c) =>
                      c.costumeInfoReady &&
                      selectedDesigners.map((d) => (d === '確認中' ? '' : d)).includes(c.costumeDesigner)
                  )
            }
          />
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
