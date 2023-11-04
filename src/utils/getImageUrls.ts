import ImageService from '../services/image.service'

export const getImageUrls = async (images: Blob[] | Blob) => {
  const imageService = new ImageService()

  if (!Array.isArray(images)) {
    return [await imageService.saveImage(images)]
  }

  return await Promise.all(
    images.map(async (image) => await imageService.saveImage(image))
  )
}
