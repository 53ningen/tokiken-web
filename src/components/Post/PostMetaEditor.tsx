import { Box, Button, FormControl, InputLabel, MenuItem, Select, Skeleton, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { AddCategoryDialog } from './AddCategoryDialog'

type Props = {
  title?: string
  category?: string
  categories?: string[]
  thumbnailKey?: string
  disabled: boolean
  onChangeTitle: (title: string) => void
  onChangeCategory: (category: string) => void
}

export const PostMetaEditor = ({
  title,
  category,
  categories,
  thumbnailKey,
  disabled,
  onChangeTitle,
  onChangeCategory,
}: Props) => {
  const [categoryItems, setCategoryItems] = useState<string[]>([])
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  useEffect(() => {
    if (categories) {
      setCategoryItems((items) => (items.length === 0 ? categories : items))
    }
  }, [categories])
  return (
    <Stack spacing={2} pt={2}>
      <TextField
        fullWidth
        id="title"
        label="Title"
        variant="outlined"
        sx={{ background: 'white' }}
        value={title}
        disabled={disabled}
        onChange={(e) => onChangeTitle(e.target.value)}
      />
      <FormControl>
        <Stack direction="row" spacing={2}>
          {category && categories ? (
            <Box>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                id="category"
                label="category"
                size="small"
                sx={{ background: 'white' }}
                value={category}
                disabled={disabled}
                onChange={(e) => onChangeCategory(e.target.value)}>
                {categoryItems.map((c) => {
                  return (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  )
                })}
              </Select>
            </Box>
          ) : (
            <Skeleton width="10rem" component="span" />
          )}
          <Button
            size="small"
            variant="outlined"
            disabled={disabled}
            onClick={() => {
              setCategoryDialogOpen(true)
            }}>
            Add Category
          </Button>
          <AddCategoryDialog
            open={categoryDialogOpen}
            handleClose={(c) => {
              if (c && !categoryItems.includes(c)) {
                setCategoryItems([...categoryItems, c])
                onChangeCategory(c)
              }
              setCategoryDialogOpen(false)
            }}
          />
        </Stack>
      </FormControl>
      <TextField
        fullWidth
        id="description"
        label="Description"
        variant="outlined"
        size="small"
        sx={{ background: 'white' }}
        value={title}
        disabled={disabled}
        onChange={(e) => onChangeTitle(e.target.value)}
      />
    </Stack>
  )
}
