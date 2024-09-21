import { create } from 'zustand'

interface Image {
  id: string
  name: string
  url: string
}

interface ImageStore {
  images: Image[]
  addImage: (image: Image) => void
  removeImage: (imageId: string) => void
}

const useImageStore = create<ImageStore>((set) => ({
  images: [],
  addImage: (image) => set((state) => ({ images: [...state.images, image] })),
  removeImage: (imageId) =>
    set((state) => ({
      images: state.images.filter((image) => image.id !== imageId),
    })),
}))

export default useImageStore
