/*A custom hook that provides a simple and straightforward way to manage modal
state using Zustand. It encapsulates the modal-related state and logic, making
it reuseable */

import { create } from "zustand";
import { IModal } from "@/interface-d";

const useNotificationModal = create<IModal>((set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
}))

export default useNotificationModal