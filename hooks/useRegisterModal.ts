import { IRegisterModal } from "@/interface-d";
import { create } from "zustand";

const useRegisterModal = create<IRegisterModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useRegisterModal;