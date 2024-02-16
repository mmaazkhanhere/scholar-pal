import { ILoginModal } from "@/interface-d";
import { create } from "zustand";

const useLoginModal = create<ILoginModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })

}))


export default useLoginModal;