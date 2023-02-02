import { Box, Typography } from '@mui/material'
import theme from '../theme'

interface SectionHeaderProps {
  title: string
}

export const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <Box sx={{ backgroundColor: theme.palette.grey[300] }}>
      <Typography p={1} variant="h4">
        {title}
      </Typography>
    </Box>
  )
}
