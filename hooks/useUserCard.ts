import { IModal } from "@/interface-d";
import { create } from "zustand";

interface IUserCardModal {
    isOpen: boolean;
    onOpen: (title: string, isPending: boolean, acceptedList?: any, pendingList?: any) => void;
    onClose: () => void;
    acceptedList: any;
    title: string;
    isPending: boolean;
    pendingList: any;
}

const useUserCard = create<IUserCardModal>((set) => ({
    isOpen: false,
    acceptedList: null,
    pendingList: null,
    title: '',
    isPending: false,
    onOpen: (title: string, isPending: boolean, acceptedList?: any, pendingList?: any) => set({ isOpen: true, acceptedList, title, isPending, pendingList }),
    onClose: () => set({ isOpen: false, acceptedList: null, pendingList: null, title: '', isPending: false })
}))

export default useUserCard;
