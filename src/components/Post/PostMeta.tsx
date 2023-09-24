import CreateIcon from '@mui/icons-material/Create'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Box, Button, Stack } from '@mui/material'
import { Post } from '../../API'
import { useAuth } from '../../context/AuthContext'
import Link from '../Link'
import { DateTimeChip } from './DateTimeChip'

type Props = {
  meta?: Omit<Post, 'body'>
}

export const PostMeta = ({ meta }: Props) => {
  const { isLoggedIn, initialized } = useAuth()
  return (
    <Stack spacing={1}>
      <Box>
        <DateTimeChip icon={<CreateIcon />} ISO8601String={meta?.createdAt} />
        <DateTimeChip icon={<RefreshIcon />} ISO8601String={meta?.updatedAt} />
        {initialized && isLoggedIn() && meta && (
          <Button LinkComponent={Link} href={`/posts/${meta.slug}/edit`} size="small">
            edit
          </Button>
        )}
      </Box>
      <Box lineHeight={2.5}>{/* <CategoryChip category={meta?.category.id} /> */}</Box>
    </Stack>
  )
}
