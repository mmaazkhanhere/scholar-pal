/*A react component that shows list of group members and pending list displayed
on the group detail sidebar */


import { useSession } from 'next-auth/react';
import React from 'react'

import useLoginModal from '@/hooks/useLoginModal';
import useUser from '@/hooks/useUser';
import useUserCard from '@/hooks/useUserCard';
import usePendingUsers from '@/hooks/usePendingUsers';
import useGroupMembers from '@/hooks/useGroupMembers';

import { FaUserClock } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";


type Props = {
    groupCreatorId: string /*display pending members only if the currently sign
    in user is the group creator*/
    isPrivate?: boolean
    groupId?: string
}

const GroupMemberDetails = ({ groupCreatorId, isPrivate, groupId }: Props) => {

    const { onOpen: openCardModal } = useUserCard(); /*open the card modal to display
    list of users*/
    const { user: currentUser } = useUser(); //fetch current user
    const { onOpen: openLoginModal } = useLoginModal(); //open login modal 
    const { data: pendingList = [] } = usePendingUsers(groupId); //display pending list of group
    const { data: groupMembers = [] } = useGroupMembers(groupId); //display list of group members
    const { status } = useSession();

    if (!pendingList || !groupMembers || !currentUser) {
        //display nothing when any of above data is not available
        return null;
    }

    const handleAcceptedMembers = (userList: any, title: string = 'Members Joined') => {
        //function called to open list of group members
        if (status === 'unauthenticated') {
            openLoginModal();
        } else {
            openCardModal(title, false, userList, null, ''); /*pass title and user
            list through swr */
        }
    };

    /*display list of pending members of the group */
    const handlePendingMembers = (pendingList: any, title: string = 'Members waiting to join') => {
        if (status === 'unauthenticated') {
            openLoginModal();
        }
        else {
            openCardModal(title, true, null, pendingList, groupId);
        }
    }

    return (
        <div className='flex items-center gap-x-5 w-full'>
            {/*Display pending members list only to the group creator and
            if the group is private */}
            {
                (currentUser?.id == groupCreatorId && isPrivate) && (
                    <button
                        title='List of Pending Members'
                        aria-label='Button to open list of pending members'
                        onClick={() => handlePendingMembers(pendingList)}
                        className='flex items-center gap-x-4 border rounded-xl
                        border-[#343a40]/20 py-1 px-4 hover:opacity-80'
                    >
                        {/*Icon */}
                        <FaUserClock className='w-6 lg:w-8 h-6 lg:h-8' />

                        {/*number of pending members */}
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
                {/*Icon */}
                <FaUserCheck className='w-6 lg:w-8 h-6 lg:h-8' />

                {/*Number of group members */}
                <span className='text-lg font-medium'>
                    {groupMembers.length}
                </span>
            </button>
        </div>
    )
}

export default GroupMemberDetails