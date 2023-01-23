import { Button, Stack, Typography } from '@mui/material'
import { FaAmazon } from 'react-icons/fa'
import { AmazonProductUrl } from '../const'

interface AmazonButtonProps {
  asin?: string
}

export const AmazonButton = ({ asin }: AmazonButtonProps) => {
  const url = AmazonProductUrl(asin)
  return (
    <>
      {url && (
        <Button
          color="amazon"
          variant="contained"
          fullWidth
          href={url}
          target="_blank"
          onClick={() => console.log('hello')}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FaAmazon fontSize={16} />
            <Typography fontSize={16} fontWeight={700}>
              Amazon 商品ページ
            </Typography>
          </Stack>
        </Button>
      )}
    </>
  )
}
