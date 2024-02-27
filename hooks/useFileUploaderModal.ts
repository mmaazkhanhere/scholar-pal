import { IFileUploadModal } from '@/interface-d'
import { create } from 'zustand'

const useFileUploaderModal = create<IFileUploadModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useFileUploaderModal
