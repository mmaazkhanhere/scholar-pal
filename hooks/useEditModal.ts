import { IEditModal } from "@/interface-d";
import { create } from "zustand";

const useEditModal = create<IEditModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useEditModal