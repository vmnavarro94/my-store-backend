const config = {
  env: process.env.ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  s3AccessKeyId: process.env.S3_ACCESS_KEY_ID || '',
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  s3EndpointUrl: process.env.S3_ENDPOINT_URL || '',
  s3BucketName: process.env.S3_BUCKET_NAME || ''
}

export default config
