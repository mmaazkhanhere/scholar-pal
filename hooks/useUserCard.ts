/*This hook provides a convenient way to manage the state of a user card modal
in React application using Zustand */

import { create } from "zustand";

interface IUserCardModal {
    isOpen: boolean; //indicates whether the modal is open or clos
    onOpen: (title: string, isPending: boolean, acceptedList?: any, pendingList?: any, groupId?: string) => void; //function top open the modal accepting the above parameters
    onClose: () => void; //function to close the modal
    acceptedList: any; //list of accepted users
    title: string; //title of the modal
    isPending: boolean; //boolean indicating whether the data is of pending users
    pendingList: any; //list of pending users
    groupId: string; //group id for which the member details being fetched
}

const useUserCard = create<IUserCardModal>((set) => ({
    isOpen: false, //initially modal is close
    acceptedList: null, //initially no accepted user list
    pendingList: null, //initially no pending user list
    title: '', //no title
    isPending: false, //initially not pending user list
    groupId: '', //no group id

    onOpen: (title: string, isPending: boolean, acceptedList?: any, pendingList?: any, groupId?: string) => set({ isOpen: true, acceptedList, title, isPending, pendingList, groupId }),
    /*when the modal is opened, value passed to it will be passed to the user card component */

    onClose: () => set({ isOpen: false, acceptedList: null, pendingList: null, title: '', isPending: false, groupId: '' })
    /*Closes the modal and return the variable values to null or empty */

}))

export default useUserCard;
