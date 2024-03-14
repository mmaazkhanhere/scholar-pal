/*A react component which represents a card for displaying information about a
study group. It displays the name of the group, the username of the group creator,
a short description, number of members, subject of focus of the study group
and a button to join or leave or request to join a study group */

"use client"

import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import axios from 'axios'

import Avatar from '../avatar'

import useUser from '@/hooks/useUser'
import useLoginModal from '@/hooks/useLoginModal'
import useGroup from '@/hooks/useGroup'
import { useGroups } from '@/hooks/useGroups'
import usePendingUsers from '@/hooks/usePendingUsers'
import useGroupMembers from '@/hooks/useGroupMembers'
import useGroupJoined from '@/hooks/useGroupJoined'

import { successNotification } from '@/helpers/success-notification'
import { errorNotification } from '@/helpers/error-notification'

import { IStudyGroup } from '@/interface-d'

type Props = {
    groupDetail: IStudyGroup
}

const GroupCard = ({ groupDetail }: Props) => {

    const [loading, setLoading] = useState<boolean>(false);

    const { status } = useSession(); //status of the current login user
    const { onOpen: openLoginModal } = useLoginModal(); //hook to open login modal

    const { user: currentUser, mutate: updateCurrentUser } = useUser();/* custom
    hook to fetch the current user details and mutate function to update the user */

    const { mutate: updateGroupCreatorUser } = useUser(groupDetail.creatorId);/* a
    custom hook to fetch the detail for group creator and mutate function to update
    the group creator user details */

    const { mutate: updateGroupList } = useGroups();/*hook with mutate function to
    fetch updated group list */

    const { mutate: updateGroup } = useGroup(groupDetail.id);/*hook with mutate
    function to fetch updated group of specific group id */

    const { mutate: updateJoinedGroup } = useGroupJoined(groupDetail.id);/*hook
    with function to fetch updated list of groups user have joined */

    const { data: pendingList, mutate: updatePendingList } = usePendingUsers(groupDetail.id)
    /*custom hook to fetch list of pending members of a group and a mutate 
    function to fetch updated list of pending members */

    const { data: groupMembers = [], mutate: updateGroupMembers } = useGroupMembers(groupDetail.id)
    /*custom hook to fetch list of group members and a mutate function to fetch
    updated list of group members */

    const router = useRouter(); //access the router object for navigation

    /*function that is triggered when user clicks on the join/leave/pending request
    button. It first checks if the user is authenticated to perform the request.
    If so, a POST request is send to specified API endpoint with relevant data.
    If the status is 200, a success notification is displayed else relevant
    error notification is displayed */
    const handleJoin = useCallback(async () => {

        try {

            setLoading(true);

            if (status == 'unauthenticated') {//checks the user authentication
                openLoginModal() //if not authenticated, open login modal
            }

            //post request to API endpoint
            const request = await axios.post('/api/group/join', {
                currentUserId: currentUser?.id,
                groupId: groupDetail.id,
                groupCreatorId: groupDetail.creatorId
            })

            if (request.status === 200) {
                successNotification('Request successfully sent');
                setLoading(false);
                updateGroup(); //update the specific group
                updateCurrentUser(); //update current user
                updateGroupCreatorUser(); //update group creator
                updateGroupList(); //update group list
                updateGroupMembers(); //update group members
                updatePendingList(); //update group pending list
                updateJoinedGroup(); //update user joined group list
            }

        } catch (error) {
            console.error('GROUP_CARD_HANDLE_JOIN_FUNCTION_ERROR', error);
            errorNotification('Something went wrong')
        }
        finally {
            setLoading(false);
        }
    }, [currentUser?.id, groupDetail.creatorId, groupDetail.id, openLoginModal, status, updateCurrentUser, updateGroup, updateGroupCreatorUser, updateGroupList, updateGroupMembers, updateJoinedGroup, updatePendingList])


    /*function that takes the user to the group details when clicked on. It checks
    if the group user is accessing is a private group and user is member of the
    group. If not, an error notification is displayed informing user that they
    cannot access the private group unless they are members of the private
    group*/
    const onClick = () => {
        const isAcceptedMember = groupMembers?.includes(currentUser?.id as any);

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

    if (!currentUser || !pendingList || !groupMembers) {
        //display nothing if the data is not available
        return null;
    }


    return (
        <article
            className="max-w-sm rounded shadow-lg bg-[#fefefe] 
            hover:bg-gray-100/70 transition duration-300 p-5 flex flex-col 
            items-start gap-y-5"
        >

            <div className="flex items-start gap-x-4">

                {/*Avatar of the Group */}
                <Avatar
                    profilePicture={groupDetail.groupAvatar}
                    isSuggestionAvatar
                />

                {/*Group name and private/open indicator */}
                <div className='flex flex-col items-start'>

                    {/*Group Name */}
                    <button
                        aria-label='Group Name Link'
                        title='Group Name'
                        onClick={onClick}
                        className='hover:underline hover:text-[#1abc9c] font-bold text-xl'>
                        {groupDetail.groupName}
                    </button>

                    {/*Group creator username */}
                    <div className='flex items-center gap-x-5'>
                        <p className='text-sm text-[#343a40]/60'>
                            Created by {groupDetail.creator.username}
                        </p>

                        {/*Private (red text) or open (green text) */}
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

            {/*Group description */}
            <p className="text-base">
                {groupDetail.description}
            </p>

            {/*Group subject and member number */}
            <div className="flex items-center gap-x-4">

                {/*Group subject */}
                <span
                    className="bg-[#343a40]/10 rounded-full px-3 py-1 text-sm 
                    font-semibold text-gray-700">
                    {groupDetail.subject}
                </span>

                {/*Number of group members */}
                <span className="bg-[#343a40]/10 rounded-full px-3 py-1 text-sm 
                    font-semibold text-gray-700">
                    {groupMembers?.length} Members
                </span>
            </div>

            {
                groupMembers?.includes(currentUser?.id as any) && !pendingList?.includes(currentUser.id) ? (
                    /*If user is present the group member list and is not present in
                    the pending list, a group leave button is displayed */
                    <button
                        aria-label='Group to Leave Button'
                        title='Leave Group'
                        onClick={handleJoin}
                        className="bg-red-500 text-[#f9fcfc] font-medium py-1 px-4 rounded text-sm"
                        disabled={loading}
                    >
                        Leave Group
                    </button>
                ) : pendingList?.includes(currentUser.id) ?
                    (
                        /*If user is included in the pending list, a request
                        pending button is displayed */
                        <button
                            title='Group request pending'
                            aria-label='Request pending'
                            onClick={handleJoin}
                            className="bg-[#f9fefe] border border-[#343a40] font-medium py-1 px-4 rounded text-sm"
                            disabled={loading}
                        >
                            Request Pending
                        </button>
                    )
                    :
                    (
                        /*If user is not a member of the group and neither is 
                        present in the pending member list, a join button is
                        displayed */
                        <button
                            aria-label='Join group button'
                            title='Join Group'
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