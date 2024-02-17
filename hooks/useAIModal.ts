import { IAIModal } from "@/interface-d";
import { create } from "zustand";

const useAIModal = create<IAIModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useAIModal