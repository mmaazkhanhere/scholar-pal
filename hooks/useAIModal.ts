/*a custom hook to create a simple modal management state using Zustand to
handle the opening and closing of AI modal */

import { IAIModal } from "@/interface-d";
import { create } from "zustand"; /*function that is used to initialize a new
store that will hold the state and functions related to the modal's visibility. */

const useAIModal = create<IAIModal>((set) => ({
    isOpen: false, // a boolean indicating whether the modal is open or closed
    onOpen: () => set({ isOpen: true }), //function to set the modal visible
    onClose: () => set({ isOpen: false }), //function to close the modal
}))

export default useAIModal