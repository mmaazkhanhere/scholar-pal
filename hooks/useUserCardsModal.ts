import { IModal } from "@/interface-d";
import { create } from "zustand";

interface IUserCardModal {
    isOpen: boolean;
    onOpen: (data: any) => void;
    onClose: () => void
    data: any;
}

const useUserCardModal = create<IUserCardModal>((set) => ({
    isOpen: false,
    data: null,
    onOpen: (data) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false, data: null })
}))

export default useUserCardModal;
