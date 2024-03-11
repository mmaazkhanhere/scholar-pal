import useLoginModal from '@/hooks/useLoginModal';
import useUser from '@/hooks/useUser';
import useUserCardModal from '@/hooks/useUserCardsModal';
import { IMembership, IUser } from '@/interface-d'
import { useSession } from 'next-auth/react';
import React from 'react'

import { FaUserClock } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";


type Props = {
    members: IMembership[], //array of all members
    pendingMembers?: string[], //array of all pending members
    groupCreatorId: string /*display pending members only if the currently sign
    in user is the group creator*/
    isPrivate?: boolean
}

const GroupMemberDetails = ({ members, pendingMembers, groupCreatorId, isPrivate }: Props) => {

    const { user: currentUser } = useUser();
    const userCardModal = useUserCardModal();
    const { onOpen: openLoginModal } = useLoginModal();
    const { status } = useSession();

    const addedMembers = members.filter(member => member.status === 'ACCEPTED');

    const handleClick = (userList: any) => {
        if (status === 'unauthenticated') {
            openLoginModal();
        } else {
            userCardModal.onOpen(userList);
        }
    };

    return (
        <div className='flex items-center gap-x-5 w-full'>
            {
                (currentUser?.id == groupCreatorId && isPrivate) && (
                    <button
                        title='List of Pending Members'
                        aria-label='Button to open list of pending members'
                        onClick={() => handleClick(pendingMembers)}
                        className='flex items-center gap-x-4 border rounded-xl
                        border-[#343a40]/20 py-1 px-4 hover:opacity-80'
                    >
                        <FaUserClock className='w-6 lg:w-8 h-6 lg:h-8' />
                        <span className='text-lg font-medium'>
                            {pendingMembers?.length}
                        </span>
                    </button>
                )
            }
            <button
                title='List of accepted members'
                aria-label='Button to open list of accepted members'
                onClick={() => handleClick(members)}
                className='flex items-center gap-x-4 border rounded-xl
                border-[#343a40]/20 py-1 px-4 hover:opacity-80'
            >
                <FaUserCheck className='w-6 lg:w-8 h-6 lg:h-8' />
                <span className='text-lg font-medium'>
                    {addedMembers.length}
                </span>
            </button>
        </div>
    )
}

export default GroupMemberDetails