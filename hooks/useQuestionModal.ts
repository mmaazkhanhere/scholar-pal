/*A custom react hook that uses zustand to handle the visibility of the
question modal */

import { create } from "zustand";
import { IModal } from "@/interface-d";

const useQuestionModal = create<IModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useQuestionModal;