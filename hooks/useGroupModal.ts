/*This hooks provide a simple way to manage modal state by encapsulating the modal-
related state and logic, making it reuseable across different components */

import { create } from "zustand";

import { IModal } from "@/interface-d";

const useGroupModal = create<IModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useGroupModal;