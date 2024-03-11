"use client"


import React, { useCallback, useState } from 'react'
import Avatar from '../avatar'
import { IStudyGroup } from '@/interface-d'
import useUser from '@/hooks/useUser'
import axios from 'axios'
import { successNotification } from '@/helpers/success-notification'
import { errorNotification } from '@/helpers/error-notification'
import { useSession } from 'next-auth/react'
import useLoginModal from '@/hooks/useLoginModal'
import useGroup from '@/hooks/useGroup'
import { useGroups } from '@/hooks/useGroups'
import { useRouter } from 'next/navigation'
import usePendingUsers from '@/hooks/usePendingUsers'

type Props = {
    groupDetail: IStudyGroup
}

const GroupCard = ({ groupDetail }: Props) => {

    const [loading, setLoading] = useState<boolean>(false);

    const { status } = useSession();
    const { onOpen: openLoginModal } = useLoginModal();
    const { user: currentUser, mutate: updateCurrentUser } = useUser();
    const { mutate: updateGroupCreatorUser } = useUser(groupDetail.creatorId);
    const { mutate: updateGroupList } = useGroups();
    const { mutate: updateGroup } = useGroup(groupDetail.id);
    const { data: pendingList, mutate: updatePendingList } = usePendingUsers(groupDetail.id)

    const router = useRouter();

    const handleJoin = useCallback(async () => {

        try {

            setLoading(true);

            if (status == 'unauthenticated') {
                openLoginModal()
            }

            const request = await axios.post('/api/group/join', {
                currentUserId: currentUser?.id,
                groupId: groupDetail.id,
                groupCreatorId: groupDetail.creatorId
            })

            if (request.status === 200) {
                successNotification('Request successfully sent');
                setLoading(false);
                updateGroup();
                updateCurrentUser();
                updateGroupCreatorUser();
                updateGroupList();
                updatePendingList();
            }

        } catch (error) {
            console.error('GROUP_CARD_HANDLE_JOIN_FUNCTION_ERROR', error);
            errorNotification('Something went wrong')
        }
        finally {
            setLoading(false);
        }
    }, [currentUser?.id, groupDetail.creatorId, groupDetail.id, openLoginModal, status, updateCurrentUser, updateGroup, updateGroupCreatorUser, updateGroupList, updatePendingList])

    const acceptedMembers = groupDetail.members.filter(member => member.status === 'ACCEPTED');

    const onClick = () => {
        const isAcceptedMember = acceptedMembers.some(member => member.userId === currentUser?.id);

        // Check if the group is private and the user is not an accepted member
        if (groupDetail.private && !isAcceptedMember) {
            errorNotification('Cannot open private groups');
            if (status === 'unauthenticated') {
                // If the user is also unauthenticated, prompt them to log in
                openLoginModal();
            }
        } else {
            // If the group is not private or the user is an accepted member, proceed to the group
            router.push(`/groups/${groupDetail.id}`);
        }
    }


    return (
        <article
            className="max-w-sm rounded shadow-lg bg-[#fefefe] 
            hover:bg-gray-100/70 transition duration-300 p-5 flex flex-col 
            items-start gap-y-5"
        >

            <div className="flex items-start gap-x-4">
                <Avatar
                    profilePicture={groupDetail.groupAvatar}
                    isSuggestionAvatar
                />
                <div className='flex flex-col items-start'>
                    <button
                        onClick={onClick}
                        className='hover:underline hover:text-[#1abc9c] font-bold text-xl'>
                        {groupDetail.groupName}
                    </button>
                    <div className='flex items-center gap-x-5'>
                        <p className='text-sm text-[#343a40]/60'>
                            Created by {groupDetail.creator.username}
                        </p>
                        {
                            groupDetail.private ? (
                                <p className='text-red-500 text-sm font-medium'>
                                    Private
                                </p>
                            ) : (
                                <p className='text-green-500 text-sm font-medium'>
                                    Open
                                </p>
                            )
                        }
                    </div>
                </div>
            </div>

            <p className="text-base">
                {groupDetail.description}
            </p>
            <div className="flex items-center gap-x-4">
                <span
                    className="bg-[#343a40]/10 rounded-full px-3 py-1 text-sm 
                    font-semibold text-gray-700">
                    {groupDetail.subject}
                </span>
                <span className="bg-[#343a40]/10 rounded-full px-3 py-1 text-sm 
                    font-semibold text-gray-700">
                    {groupDetail.members.filter(member => member.status === 'ACCEPTED').length} Members
                </span>
            </div>

            {
                groupDetail.members.some(member => member.userId == currentUser?.id && pendingList?.includes(currentUser.id) == false) ? (
                    <button
                        onClick={handleJoin}
                        className="bg-red-500 text-[#f9fcfc] font-medium py-1 px-4 rounded text-sm"
                        disabled={loading}
                    >
                        Leave Group
                    </button>
                ) : groupDetail.members.some(member => member.userId == currentUser?.id && pendingList?.includes(currentUser.id) == true) ?
                    (
                        <button
                            onClick={handleJoin}
                            className="bg-[#f9fefe] border border-[#343a40] font-medium py-1 px-4 rounded text-sm"
                            disabled={loading}
                        >
                            Request Pending
                        </button>
                    )
                    :
                    (
                        <button
                            onClick={handleJoin}
                            className="bg-[#1abc9c] hover:bg-[#1abc9c]/60 text-white 
                        font-medium py-1 px-6 rounded text-sm"
                            disabled={loading}
                        >
                            Join Group
                        </button>
                    )
            }

        </article>

    )
}

export default GroupCard