import { create } from 'zustand'

interface File {
  id: string
  name: string
  size: number
  uploadedAt: Date
}

interface FileStore {
  files: File[]
  addFile: (file: File) => void
  removeFile: (id: string) => void
}

export const useFileStore = create<FileStore>((set) => ({
  files: [],
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (id) =>
    set((state) => ({ files: state.files.filter((file) => file.id !== id) })),
}))
