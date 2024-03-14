/*A react component which represents a button to create a new study group. */

import React, { useCallback } from 'react';
import { useSession } from 'next-auth/react';

import useGroupModal from '@/hooks/useGroupModal';
import useLoginModal from '@/hooks/useLoginModal';

import { IoAddCircleOutline } from 'react-icons/io5';

type Props = {}

const CreateGroupButton: React.FC<Props> = () => {

    const { onOpen: openGroupModal } = useGroupModal(); /*get the onOpen function
    from the custom hook and name it as openGroupModal which is used to open
    the modal to create group */
    const { onOpen: openLoginModal } = useLoginModal(); // hook to open login modal

    const { status } = useSession(); /*get the status variable of the current 
    login session */

    const onClick = useCallback(() => {
        if (status == 'unauthenticated') {
            /*If the current user status is unauthenticated, the login modal will 
            be opened*/
            openLoginModal();
        }
        else {
            /*If user is authenticated, the modal is opened to create a new group*/
            openGroupModal();
        }
    }, [openGroupModal, openLoginModal, status]) /*Dependencies of the useCallback function */


    return (

        <button
            aria-label='Button to Create New Group' //accessibility variable
            title='Create New Group' //accessibility variable
            onClick={onClick}
            className="flex items-center justify-center gap-x-2
            bg-[#1bac9c] hover:bg-[#1abc9c]/80 hover:scale-95 text-[#fefefe] 
            py-2 px-6 rounded-lg lg:rounded-xl lg:shadow-lg 
            cursor-pointer transition duration-300 ease-in-out"
        >
            {/* Icon */}
            <IoAddCircleOutline
                className="w-5 lg:w-7 h-5 lg:h-7"
            />

            {/* Text */}
            <span className='text-sm lg:text-base font-medium'>
                Create Study Group
            </span>

        </button>
    );
};

export default CreateGroupButton;
