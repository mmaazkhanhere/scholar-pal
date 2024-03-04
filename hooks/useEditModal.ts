/*a custom hook to create a simple modal management state using Zustand to
handle the opening and closing of Edit modal */

import { IEditModal } from "@/interface-d";
import { create } from "zustand"; /*function to hold the state and functions related
to visibility */

const useEditModal = create<IEditModal>((set) => ({
    isOpen: false, // whether the modal is open or closed (by default it is closed)
    onOpen: () => set({ isOpen: true }), //function to open the modal
    onClose: () => set({ isOpen: false }) //function to close the modal
}))

export default useEditModal