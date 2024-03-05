import { create } from "zustand";

import { IModal } from "@/interface-d";

const useGroupModal = create<IModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useGroupModal;