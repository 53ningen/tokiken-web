import { GraphQLResult } from '@aws-amplify/api-graphql'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import {
  Album,
  CreateAlbumMutation,
  CreateAlbumMutationVariables,
  UpdateAlbumItemMutationVariables,
  UpdateAlbumMutation,
} from '../../API'
import { createAlbum, updateAlbum } from '../../graphql/mutations'

interface Props {
  id?: string
  open: boolean
  handleClose: () => void
}

export const AlbumEditDialog = ({ id, open, handleClose }: Props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  useEffect(() => {
    setDate(new Date().toISOString().split('T')[0])
  }, [])
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit New Album</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          value={title}
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
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
        <TextField
          autoFocus
          margin="dense"
          id="date"
          value={date}
          type="date"
          fullWidth
          variant="standard"
          required
          onChange={(e) => setDate(e.target.value)}
          sx={{ pt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          disabled={!title || !description || !date}
          onClick={async () => {
            const res = id
              ? await UpdateAlbum(id, title, description, date)
              : await CreateAlbum(title, description, date)
            handleClose()
          }}
          variant="contained">
          {id ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const CreateAlbum = async (title: string, description: string, date: string) => {
  const res = (await API.graphql({
    query: createAlbum,
    variables: {
      input: {
        title,
        description,
        date,
        type: 'album',
      },
    } as CreateAlbumMutationVariables,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })) as GraphQLResult<CreateAlbumMutation>
  if (!res.data?.createAlbum || res.errors) {
    console.error(res)
    throw new Error('unexpected error')
  }
  const item = res.data.createAlbum as Album
  console.log(item)
  return item
}

const UpdateAlbum = async (id: string, title: string, description: string, date: string) => {
  const res = (await API.graphql({
    query: updateAlbum,
    variables: {
      input: {
        id: id,
        title,
        description,
        date,
        type: 'album',
      },
    } as UpdateAlbumItemMutationVariables,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })) as GraphQLResult<UpdateAlbumMutation>
  if (!res.data?.updateAlbum || res.errors) {
    console.error(res)
    throw new Error('unexpected error')
  }
  const item = res.data.updateAlbum as Album
  console.log(item)
  return item
}
