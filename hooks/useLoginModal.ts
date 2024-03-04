/*a custom hook to create a simple modal management state using Zustand to
handle the opening and closing of Login modal */

import { ILoginModal } from "@/interface-d";
import { create } from "zustand";

const useLoginModal = create<ILoginModal>((set) => ({
    isOpen: false, //check if the modal is open or closed (default closed)
    onOpen: () => set({ isOpen: true }), //function to open the modal
    onClose: () => set({ isOpen: false }) //function to close the modal

}))


export default useLoginModal;