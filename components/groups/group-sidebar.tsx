"use client"

import useGroup from '@/hooks/useGroup';
import { usePathname } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import Avatar from '../avatar';
import GroupMemberDetails from './group-member-details';
import useGroupMembers from '@/hooks/useGroupMembers';
import useUser from '@/hooks/useUser';
import { useSession } from 'next-auth/react';
import useLoginModal from '@/hooks/useLoginModal';
import { useGroups } from '@/hooks/useGroups';
import axios from 'axios';
import { successNotification } from '@/helpers/success-notification';
import { errorNotification } from '@/helpers/error-notification';
import LoadingSpinner from '../loading-spinner';
import useGroupJoined from '@/hooks/useGroupJoined';

type Props = {}

const GroupSidebar = (props: Props) => {

    const [loading, setLoading] = useState<boolean>(false);

    const groupId = usePathname().split('/groups').pop();

    const { status } = useSession();
    const { onOpen: openLoginModal } = useLoginModal();
    const { user: currentUser, mutate: updateCurrentUser } = useUser();
    const { mutate: updateGroupList } = useGroups();
    const { data: groupDetail, mutate: updateGroup } = useGroup(groupId as string)
    const { data: groupMembers = [], mutate: updateGroupMembers } = useGroupMembers(groupDetail?.id)
    const { mutate: updateGroupJoined } = useGroupJoined(groupDetail?.id)

    const isGroupMember = groupMembers?.includes(currentUser?.id as any);

    const handleJoin = useCallback(async () => {
        try {

            setLoading(true);

            if (status == 'unauthenticated') {
                openLoginModal()
            }

            const request = await axios.post('/api/group/join', {
                currentUserId: currentUser?.id,
                groupId: groupId,
                groupCreatorId: groupDetail?.creatorId
            })

            if (request.status === 200) {
                successNotification('Request successfully sent');
                setLoading(false);
                updateGroup();
                updateCurrentUser();
                updateGroupList();
                updateGroupMembers();
                updateGroupJoined();
            }

        } catch (error) {
            console.error('GROUP_CARD_HANDLE_JOIN_FUNCTION_ERROR', error);
            errorNotification('Something went wrong')
        }
        finally {
            setLoading(false);
        }
    }, [currentUser?.id, groupDetail?.creatorId, groupId, openLoginModal, status, updateCurrentUser, updateGroup, updateGroupJoined, updateGroupList, updateGroupMembers])

    if (!groupDetail) {
        return <LoadingSpinner spinnerSize={50} />;
    }

    return (
        <section
            className='lg:col-span-2 flex flex-col items-start justify-center text-[#343a40]
            p-6 border rounded-lg gap-y-5 w-full mt-10'
        >
            <Avatar
                isNavigable={false}
                isProfileAvatar
                profilePicture={groupDetail.groupAvatar}
                className='self-center'
            />

            <div className='flex flex-col items-start gap-y-5'>

                <div className='flex flex-col items-start gap-y-1'>
                    <div className='flex items-end gap-x-4'>
                        <h3 className='text-2xl lg:text-4xl font-bold '>
                            {groupDetail.groupName}
                        </h3>
                        {
                            groupDetail.private ? (
                                <p className='text-red-500 text-sm lg:text-base font-medium'>
                                    Private
                                </p>
                            ) : (
                                <p className='text-green-500 text-sm lg:text-base font-medium'>
                                    Open
                                </p>
                            )
                        }
                    </div>

                    <p className='font-extralight uppercase tracking-widest'>
                        created by {groupDetail.creator.name}
                    </p>
                </div>

                <p
                    className='uppercase font-medium py-1 lg:py-0 
                    lg:text-lg bg-[#1abc9c] rounded-xl text-[#fefefe] px-6'
                >
                    {groupDetail.subject}
                </p>

                <p className='lg:text-lg mb-5'>
                    {groupDetail.description}
                </p>

                <GroupMemberDetails
                    groupCreatorId={groupDetail.creatorId}
                    isPrivate={groupDetail.private}
                    groupId={groupDetail.id}
                />

                <button
                    aria-label='Button to join or leave group'
                    title='Join/Leave Button'
                    onClick={handleJoin}
                    className={`${isGroupMember ? 'bg-red-500' : 'bg-[#1abc9c] hover:bg-[#1abc9c]/60 '} text-[#f9fcfc] font-medium py-1.5 px-4 rounded text-sm w-full mt-2`}
                >
                    {
                        isGroupMember ? 'Leave Group' : 'Join Group'
                    }
                </button>

            </div>
        </section>
    )
}

export default GroupSidebar