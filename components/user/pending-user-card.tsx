import React, { useCallback } from 'react'
import axios from 'axios'

import Avatar from '../avatar'

import useGroup from '@/hooks/useGroup'
import usePendingUsers from '@/hooks/usePendingUsers'
import useGroupMembers from '@/hooks/useGroupMembers'
import useUser from '@/hooks/useUser'

import { successNotification } from '@/helpers/success-notification'
import { errorNotification } from '@/helpers/error-notification'

type Props = {
    userId: string
    groupId: string
}

const PendingUserCard = ({ userId, groupId }: Props) => {

    const { user } = useUser(userId);
    const { mutate: updateGroup } = useGroup(groupId);
    const { mutate: updatePendingList } = usePendingUsers(groupId);
    const { mutate: updateGroupMembers } = useGroupMembers(groupId);


    const handleAcceptRequest = useCallback(async () => {
        try {
            const request = await axios.patch(`/api/group/accept-request`, {
                groupId, targetUserId: userId
            })

            if (request.status === 200) {
                successNotification('User added')
                updateGroup();
                updateGroup(groupId);
                updateGroupMembers(groupId);
                updatePendingList();
            }
        } catch (error) {
            console.error('HANDLE_ACCEPT_REQUEST_FUNCTION_ERROR', error);
            errorNotification('Something went wrong')
        }
    }, [groupId, updateGroup, updateGroupMembers, updatePendingList, userId])

    return (
        <article
            className='flex items-center w-full rounded-xl
        border border-[#343a40]/20 p-2 gap-x-2 lg:gap-x-5 max-w-lg'
        >
            <Avatar
                profilePicture={user?.profilePicture}
                userId={user?.id}
                isSuggestionAvatar
                isNavigable={true}
            />
            <div className='flex items-center w-full '>
                <div className='flex flex-col items-start justify-center w-full'>

                    {/*User name and username */}
                    <div className='lg:flex items-center gap-x-2'>
                        {/*User name */}
                        <p className='text-sm lg:text-lg font-bold'>
                            {user?.name}
                        </p>

                        {/*Username */}
                        <p className='hidden md:block md:text-base text-[#343a40]/60'>
                            @{user?.username}
                        </p>
                    </div>

                    {/*Field of Study */}
                    <p className='text-sm lg:text-base text-[#1abc9c] md:font-medium'>
                        {user?.fieldOfStudy}
                    </p>
                </div>
                <div>
                    <button
                        title='Accept User Request'
                        aria-label='Accept User Request Button'
                        onClick={handleAcceptRequest}
                        className='hover:bg-[#1abc9c]/70 bg-[#1abc9c] 
                        text-[#fefefe] px-4 py-1 rounded-xl'
                    >
                        Accept
                    </button>
                </div>
            </div>

        </article>
    )
}

export default PendingUserCard