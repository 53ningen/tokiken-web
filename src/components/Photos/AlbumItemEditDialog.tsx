import { GraphQLResult } from '@aws-amplify/api-graphql'
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { API, Storage } from 'aws-amplify'
import { useState } from 'react'
import {
  AlbumItem,
  CreateAlbumItemMutation,
  CreateAlbumItemMutationVariables,
  UpdateAlbumItemMutation,
  UpdateAlbumItemMutationVariables,
} from '../../API'
import { TokisenRegimes } from '../../const'
import { createAlbumItem, updateAlbumItem } from '../../graphql/mutations'

interface Props {
  id?: string
  albumId: string
  order: number
  open: boolean
  handleClose: () => void
}

export const AlbumItemEditDialog = ({ id, albumId, order, open, handleClose }: Props) => {
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const handleMemberChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    if (event.target.checked) {
      tags.push(name)
      setTags([...tags])
    } else {
      setTags(tags.filter((tag) => tag !== name))
    }
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Album Item</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          value={description}
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <Box pb={2}>
          {[...TokisenRegimes[5].members, { name: 'パブりん', no: 0 }].map((member) => {
            return (
              <FormControlLabel
                key={member.no}
                control={
                  <Checkbox
                    size="small"
                    checked={tags.includes(member.name)}
                    onChange={(e) => handleMemberChange(e, member.name)}
                  />
                }
                label={member.name}
              />
            )
          })}
        </Box>
        <Stack direction="row" spacing={2} display="flex">
          <Button variant="contained" component="label">
            Choose File
            <input
              type="file"
              hidden
              multiple={false}
              onChange={(e) => {
                e.target.files && setFile(e.target.files[0])
              }}
            />
          </Button>
          <Typography variant="caption" display="flex" alignItems="center" justifyContent="center">
            {file ? `${file.name} (${Math.round(file.size / 1000).toLocaleString()} KB)` : '...'}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          disabled={!description || !file}
          onClick={async () => {
            if (file) {
              try {
                uploadFile(file, albumId)
                const imageKey = file.name
                const item = await createItem(albumId, order, imageKey, description, tags)
                console.log(item)
                handleClose()
              } catch (e) {
                console.error(e)
              }
            }
          }}
          variant="contained">
          {id ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const uploadFile = async (file: File, albumId: string) => {
  const key = `uploads/photos/${albumId}/${file.name}`
  const res = await Storage.put(key, file)
  console.log(res)
}

const createItem = async (albumId: string, order: number, imageKey: string, description: string, tags: string[]) => {
  const res = (await API.graphql({
    query: createAlbumItem,
    variables: {
      input: {
        albumId,
        order,
        imageKey,
        description,
        tags,
        albumItemsId: albumId,
        exif: undefined,
      },
    } as CreateAlbumItemMutationVariables,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })) as GraphQLResult<CreateAlbumItemMutation>
  if (!res.data?.createAlbumItem || res.errors) {
    console.error(res)
    throw new Error('unexpected error')
  }
  return res.data.createAlbumItem as AlbumItem
}

const updateItem = async (
  id: string,
  albumId: string,
  order: number,
  imageKey: string,
  description: string,
  tags: string[]
) => {
  const res = (await API.graphql({
    query: updateAlbumItem,
    variables: {
      input: {
        id,
        albumId,
        order,
        imageKey,
        description,
        tags,
        albumItemsId: albumId,
        exif: undefined,
      },
    } as UpdateAlbumItemMutationVariables,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })) as GraphQLResult<UpdateAlbumItemMutation>
  if (!res.data?.updateAlbumItem || res.errors) {
    console.error(res)
    throw new Error('unexpected error')
  }
  return res.data.updateAlbumItem as AlbumItem
}
