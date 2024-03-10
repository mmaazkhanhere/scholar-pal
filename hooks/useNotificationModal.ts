import { create } from "zustand";
import { IModal } from "@/interface-d";

const useNotificationModal = create<IModal>((set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
}))

export default useNotificationModal