import useLoginModal from '@/hooks/useLoginModal';
import useUser from '@/hooks/useUser';
import { IMembership, IUser } from '@/interface-d'
import { useSession } from 'next-auth/react';
import React from 'react'

import { FaUserClock } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import useUserCard from '@/hooks/useUserCard';
import usePendingUsers from '@/hooks/usePendingUsers';
import useGroupMembers from '@/hooks/useGroupMembers';


type Props = {
    groupCreatorId: string /*display pending members only if the currently sign
    in user is the group creator*/
    isPrivate?: boolean
    groupId?: string
}

const GroupMemberDetails = ({ groupCreatorId, isPrivate, groupId }: Props) => {

    const { user: currentUser } = useUser();
    const userCardModal = useUserCard();
    const { onOpen: openLoginModal } = useLoginModal();
    const { data: pendingList = [] } = usePendingUsers(groupId);
    const { data: groupMembers = [] } = useGroupMembers(groupId);
    const { status } = useSession();

    if (!pendingList || !groupMembers || !currentUser) {
        return null;
    }

    const handleAcceptedMembers = (userList: any, title: string = 'Members Joined') => {
        if (status === 'unauthenticated') {
            openLoginModal();
        } else {
            userCardModal.onOpen(title, false, userList, null, '');
        }
    };

    const handlePendingMembers = (pendingList: any, title: string = 'Members waiting to join') => {
        if (status === 'unauthenticated') {
            openLoginModal();
        }
        else {
            userCardModal.onOpen(title, true, null, pendingList, groupId);
        }
    }

    return (
        <div className='flex items-center gap-x-5 w-full'>
            {
                (currentUser?.id == groupCreatorId && isPrivate) && (
                    <button
                        title='List of Pending Members'
                        aria-label='Button to open list of pending members'
                        onClick={() => handlePendingMembers(pendingList)}
                        className='flex items-center gap-x-4 border rounded-xl
                        border-[#343a40]/20 py-1 px-4 hover:opacity-80'
                    >
                        <FaUserClock className='w-6 lg:w-8 h-6 lg:h-8' />
                        <span className='text-lg font-medium'>
                            {pendingList?.length}
                        </span>
                    </button>
                )
            }
            <button
                title='List of accepted members'
                aria-label='Button to open list of accepted members'
                onClick={() => handleAcceptedMembers(groupMembers)}
                className='flex items-center gap-x-4 border rounded-xl
                border-[#343a40]/20 py-1 px-4 hover:opacity-80'
            >
                <FaUserCheck className='w-6 lg:w-8 h-6 lg:h-8' />
                <span className='text-lg font-medium'>
                    {groupMembers.length}
                </span>
            </button>
        </div>
    )
}

export default GroupMemberDetails