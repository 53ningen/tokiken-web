import { Box, Card, Skeleton, Stack } from '@mui/material'
import { Markdown } from './Markdown'

type Props = {
  body?: string
}

export const PostBody = ({ body }: Props) => {
  return (
    <Stack spacing={1} maxWidth="100%">
      <Card variant="elevation">
        <Box>
          {body ? (
            <Markdown body={body} />
          ) : (
            <Stack spacing={2}>
              {[...Array(20)].map((_, i) => {
                return (
                  <Stack key={i.toString()}>
                    <Skeleton width="90%" />
                    <Skeleton width="95%" />
                    <Skeleton width="65%" />
                  </Stack>
                )
              })}
            </Stack>
          )}
        </Box>
      </Card>
    </Stack>
  )
}
