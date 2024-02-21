import { IPostModal } from "@/interface-d";
import { create } from "zustand";

const useAIModal = create<IPostModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useAIModal