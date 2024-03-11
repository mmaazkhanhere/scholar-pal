import { IModal } from "@/interface-d";
import { create } from "zustand";

interface IUserCardModal {
    isOpen: boolean;
    onOpen: (title: string, isPending: boolean, acceptedList?: any, pendingList?: any, groupId?: string) => void;
    onClose: () => void;
    acceptedList: any;
    title: string;
    isPending: boolean;
    pendingList: any;
    groupId: string;
}

const useUserCard = create<IUserCardModal>((set) => ({
    isOpen: false,
    acceptedList: null,
    pendingList: null,
    title: '',
    isPending: false,
    groupId: '',
    onOpen: (title: string, isPending: boolean, acceptedList?: any, pendingList?: any, groupId?: string) => set({ isOpen: true, acceptedList, title, isPending, pendingList, groupId }),
    onClose: () => set({ isOpen: false, acceptedList: null, pendingList: null, title: '', isPending: false, groupId: '' })
}))

export default useUserCard;
