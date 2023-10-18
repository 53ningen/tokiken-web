import { Context, Handler, S3Event } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import * as sharp from 'sharp'

const s3 = new AWS.S3({ apiVersion: '2006-03-01' })

export const handler: Handler = async (event: S3Event, _: Context) => {
  const { eventName } = event.Records[0]
  console.log(eventName)

  const acceptEventNames = [
    'ObjectCreated:Put',
    'ObjectCreated:Copy',
    'ObjectCreated:Post',
    'ObjectCreated:CompleteMultipartUpload',
  ]
  if (!acceptEventNames.includes(eventName)) {
    console.log(`eventName: ${eventName} is not accepted`)
    return { result: 'SKIP' }
  }

  const bucketName = event.Records[0].s3.bucket.name
  const { key } = event.Records[0].s3.object
  if (key.match(/^public\/uploads\/(.*)/)) {
    return await generateThumbnails(bucketName, key)
  } else {
    const message = `key: ${key} is not started with public/uploads/`
    console.log(message)
    return { result: 'SKIP', message }
  }
}

const generateThumbnails = async (bucket: string, key: string) => {
  const imageSizes = [300, 600, 1024]
  const exts = ['png', 'jpg', 'jpeg', 'gif', 'tiff']
  const ext = key.split('.').pop()
  if (!exts.includes(ext)) {
    const message = `key: ${key} seems not image file`
    console.log(message)
    return { result: 'SKIP', message }
  }
  const paths = key.split('/')
  const fileName = paths[paths.length - 1]
  const fileNameWithoutExt = fileName.split('.').slice(0, -1).join('.')
  const newBasePath = key
    .replace(/^public\/uploads/, 'public/static')
    .split('/')
    .slice(0, -1)
    .join('/')

  try {
    const object = await s3
      .getObject({
        Bucket: bucket,
        Key: key,
      })
      .promise()
    if (object?.Body) {
      // オリジナル画像をコピー
      const newKey = `${newBasePath}/${fileName}`
      await s3.putObject({ Bucket: bucket, Key: newKey, Body: object.Body }).promise()
      console.log(`copied ${key} to ${newKey}`)

      // サムネイルを生成してアップロード
      for (const size of imageSizes) {
        const resizeImage = await sharp(object.Body as string)
          .resize(size)
          .withMetadata()
          .toBuffer()
        const newKey = `${newBasePath}/${fileNameWithoutExt}@${size}.${ext}`
        await s3
          .putObject({
            Bucket: bucket,
            Key: newKey,
            Body: resizeImage,
          })
          .promise()
        console.log(`generated ${newKey} from ${key}`)

        // アップロードされたデータを削除
        await s3
          .deleteObject({
            Bucket: bucket,
            Key: key,
          })
          .promise()
        console.log(`deleted ${key}`)
      }
      return { result: 'SUCCESS' }
    } else {
      console.error('object is empty')
      return { result: 'FAILED', message: 'object is empty' }
    }
  } catch (e) {
    console.error(e)
    return { result: 'FAILED', message: e.message }
  }
}
