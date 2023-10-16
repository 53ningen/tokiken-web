import { Box, Button, Stack, Typography } from '@mui/material'
import { API, Storage } from 'aws-amplify'
import { useRouter } from 'next/router'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { CreatePostMutationVariables, DeletePostMutationVariables, Post, UpdatePostMutationVariables } from '../../API'
import { useAuth } from '../../context/AuthContext'
import { createPost, deletePost, updatePost } from '../../graphql/mutations'
import theme from '../../theme'
import { ErrorBanner } from '../ErrorBanner'
import { PostBodyEditor } from './PostBodyEditor'
import { PostMetaEditor } from './PostMetaEditor'

type Props = {
  slug?: string
  readyToEdit: boolean
  post?: Post
  preview: boolean
  categories?: string[]
}

const Errors = {
  Unauthenticated: 'Unauthenticated: You must sign in first.',
}

export const PostEditor = ({ slug, readyToEdit, post, preview, categories }: Props) => {
  const router = useRouter()
  const { isLoggedIn, initialized } = useAuth()
  const [errors, setErrors] = useState<string[]>([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [bodyPos, setBodyPos] = useState(0)
  const [thumbnailKey, setThumbnailKey] = useState<string>()
  const [category, setCategory] = useState<string>()
  const [disabled, setDisabled] = useState(true)
  const [startPosition, setStartPosition] = useState<number>()
  const [isNewPage, setIsNewPage] = useState(true)
  useEffect(() => {
    if (readyToEdit) {
      if (post) {
        setTitle(post.title)
        setBody(post.body)
        setCategory(post.category.id)
        setThumbnailKey(post.thumbnailKey || undefined)
        setIsNewPage(false)
        try {
          const h = extractHash(router.asPath)
          if (h) {
            const n = parseInt(h)
            setStartPosition(n)
          }
        } catch (e) {
          setErrors((es) => [...es, JSON.stringify(e)])
        }
      } else {
        setCategory(categories?.at(0))
      }
      setDisabled(false)
    }
  }, [categories, post, readyToEdit, router.asPath])
  useEffect(() => {
    if (initialized && !isLoggedIn()) {
      setDisabled(true)
      setErrors((errors) => (errors.includes(Errors.Unauthenticated) ? errors : [Errors.Unauthenticated, ...errors]))
    } else {
      setDisabled(false)
      setErrors((errors) => errors.filter((e) => e !== Errors.Unauthenticated))
    }
  }, [initialized, isLoggedIn])
  const onDrop = useCallback(
    async (f: File[]) => {
      try {
        const key = await uploadFile(f)
        const newBody = body.slice(0, bodyPos) + `![](${key})\n` + body.slice(bodyPos, body.length)
        setBody(newBody)
      } catch (e) {
        console.error(e)
        setErrors((es) => [...es, JSON.stringify(e)])
      } finally {
      }
    },
    [bodyPos, body]
  )
  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  const onClickSave = async () => {
    try {
      setDisabled(true)
      await savePost(isNewPage, slug!, title, body, category!, thumbnailKey)
      setIsNewPage(false)
    } catch (e) {
      console.error(e)
      setErrors([JSON.stringify(e), ...errors])
    } finally {
      setDisabled(false)
    }
  }
  const onClickDelete = async () => {
    const isOk = window.confirm(`Are you sure you want to delete this post?`)
    if (isOk) {
      try {
        setDisabled(true)
        await delPost(slug!)
        router.push('/')
      } catch (e) {
        console.error(e)
        setErrors([JSON.stringify(e), ...errors])
      } finally {
        setDisabled(false)
      }
    }
  }
  const onSelectBody = (e: SyntheticEvent<HTMLDivElement>) => {
    const elem = e.target as any
    setBodyPos(elem.selectionStart)
  }
  return (
    <Stack spacing={2}>
      <PostMetaEditor
        title={title}
        category={category}
        categories={categories || []}
        thumbnailKey={thumbnailKey}
        disabled={disabled}
        onChangeTitle={(t) => setTitle(t)}
        onChangeCategory={(c) => setCategory(c)}
      />
      {errors.length > 0 && (
        <Stack spacing={1}>
          {errors.map((e) => (
            <ErrorBanner key={e} errorMessage={e} />
          ))}
        </Stack>
      )}
      <PostBodyEditor
        body={body}
        defaultPosition={startPosition}
        preview={preview}
        disabled={disabled}
        onChangeBody={(newBody) => setBody(newBody)}
        onSelectBody={onSelectBody}
      />
      <Box
        width="100%"
        {...getRootProps()}
        border={1}
        borderRadius={2}
        borderColor="gray"
        bgcolor="lightgray"
        textAlign="center">
        <input {...getInputProps()} />
        <Typography p={4} variant="h1">
          Drop the files here
        </Typography>
      </Box>
      <Box pt={2} display="flex" justifyContent="right">
        {!isNewPage && (
          <Button
            disabled={disabled}
            variant="contained"
            color="error"
            sx={{ mr: theme.spacing(2) }}
            onClick={onClickDelete}>
            Delete
          </Button>
        )}
        <Button disabled={disabled} variant="contained" color="secondary" onClick={onClickSave}>
          Save
        </Button>
      </Box>
    </Stack>
  )
}

const savePost = async (
  isNew: boolean,
  slug: string,
  title: string,
  body: string,
  category: string,
  thumbnailKey?: string
) => {
  if (isNew) {
    await API.graphql({
      query: createPost,
      variables: {
        input: {
          slug,
          title,
          body,
          thumbnailKey,
          type: 'Post',
          postCategoryPostsId: category,
        },
      } as CreatePostMutationVariables,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    })
  } else {
    await API.graphql({
      query: updatePost,
      variables: {
        input: {
          slug,
          title,
          body,
          thumbnailKey,
          postCategoryPostsId: category,
        },
      } as UpdatePostMutationVariables,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    })
  }
}

const delPost = async (slug: string) => {
  await API.graphql({
    query: deletePost,
    variables: {
      input: {
        slug,
      },
    } as DeletePostMutationVariables,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
}

const uploadFile = async (f: File[]) => {
  const file = f[0]
  const date = new Date()
  const year = date.getFullYear().toString()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const key = `static/${year}/${month}/${file.name}`
  const res = await Storage.put(key, file, {
    level: 'public',
    contentType: file.type,
  })
  return res.key
}

const extractHash = (path?: string) => {
  const es = path?.split('#')
  return es && es.length === 2 ? es[1] : undefined
}
