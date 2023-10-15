import boom from '@hapi/boom'
import { S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import config from '../config/config'
import { S3_SIGNED_URL_EXPRIRES } from '../utils/constants'

class ImageService {
  s3Client: S3Client

  constructor() {
    this.s3Client = new S3Client({
      endpoint: config.s3EndpointUrl,
      credentials: {
        accessKeyId: config.s3AccessKeyId,
        secretAccessKey: config.s3SecretAccessKey
      },
      region: 'global'
    })
  }

  async saveImage(image: Blob) {
    try {
      const imageName = `${crypto.randomUUID()}.jpeg`
      const putObjectCommand = new PutObjectCommand({
        Bucket: 'my-store',
        Key: imageName,
        Body: image
      })
      const signedUrl = await getSignedUrl(this.s3Client, putObjectCommand, {
        expiresIn: S3_SIGNED_URL_EXPRIRES
      })
      await fetch(signedUrl, { method: 'PUT', body: image })

      return `${config.s3EndpointUrl}/${config.s3BucketName}/${imageName}`
    } catch (error) {
      throw boom.internal('There was an error trying to save the image')
    }
  }
}

export default ImageService
