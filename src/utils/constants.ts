export const IMAGE_URL_REGEX =
  /(http(s?):)([/|.|\w|\s|-])*\.(?:png|jpe?g|gif|bmp|webp|tiff|svg|ico)/

export const EMAIL_REGEX =
  /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

export const PHONE_NUMBER_REGEX =
  /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

export const S3_SIGNED_URL_EXPRIRES = 100 //seconds
