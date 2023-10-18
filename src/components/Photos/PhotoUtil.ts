import { AlbumItem } from '../../API'

export const getAlbumItemS3Key = (item: AlbumItem, size?: 300 | 600 | 1024) => {
  const { albumId, imageKey } = item
  const ext = imageKey.split('.').pop()
  const fileNameWithoutExt = imageKey.split('.').slice(0, -1).join('.')
  const key = `static/photos/${albumId}/${fileNameWithoutExt}${size ? `@${size}` : ''}.${ext}`
  return key
}
