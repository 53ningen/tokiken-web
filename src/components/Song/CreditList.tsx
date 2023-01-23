import { Box, Card, CardActionArea, Chip, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { CreditArtist } from '../../spreadsheets'
import theme from '../../theme'
import Link from '../Link'
import { SongArtistSourceAnnotation } from './SongArtistSourceLink'

interface CreditListProps {
  label: string
  credits: CreditArtist[]
}

export const CreditList = ({ label, credits }: CreditListProps) => {
  return (
    <>
      {credits.length > 0 && (
        <Grid container spacing={1}>
          <Grid xs={12}>
            <Box sx={{ backgroundColor: theme.palette.grey[300] }}>
              <Typography p={1} variant="h4">
                {label}
              </Typography>
            </Box>
          </Grid>
          {credits.map((a) => {
            return (
              <Grid key={`${a.creditTitle}${a.creditName}`} xs={12} sm={6} md={4} lg={3}>
                <CreditListItem credit={a} />
              </Grid>
            )
          })}
        </Grid>
      )}
    </>
  )
}

interface CreditListItemProps {
  credit: CreditArtist
}

export const CreditListItem = ({ credit }: CreditListItemProps) => {
  return (
    <Card>
      <CardActionArea LinkComponent={Link} href={`/artists/${credit.artistId}`}>
        <Box height="100%" pt={1} px={1} whiteSpace="nowrap" width="100%">
          <Stack>
            {credit.creditTitle !== '' && (
              <Typography variant="caption" textOverflow="ellipsis" overflow="hidden">
                {credit.creditTitle}
              </Typography>
            )}
            <Typography variant="subtitle2" textOverflow="ellipsis" overflow="hidden">
              {credit.creditName}
            </Typography>
            <Stack direction="row" spacing={1} pt={1} height="2em" textOverflow="ellipsis" overflow="hidden">
              <CreditTypeChip count={credit.artistLyricsCount} type="作詞" />
              <CreditTypeChip count={credit.artistMusicCount} type="作曲" />
              <CreditTypeChip count={credit.artistArrangementCount} type="編曲" />
              <CreditTypeChip count={credit.artistProduceCount} type="制作" />
              <CreditTypeChip count={credit.artistDanceCount} type="ダンス" />
            </Stack>
          </Stack>
        </Box>
      </CardActionArea>
      <Box pb={1} px={1}>
        <SongArtistSourceAnnotation source={credit.creditSource} sourceUrl={credit.creditSourceUrl} />
      </Box>
    </Card>
  )
}

interface CreditTypeChipProps {
  count: string
  type: string
}

const CreditTypeChip = ({ count, type }: CreditTypeChipProps) => {
  return (
    <>{count && count !== '0' && <Chip color="info" label={`${type}: ${count}`} size="small" sx={{ height: 20 }} />}</>
  )
}
