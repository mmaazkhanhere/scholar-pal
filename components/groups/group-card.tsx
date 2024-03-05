
import React from 'react'
import Avatar from '../avatar'
import { IStudyGroup } from '@/interface-d'
import useUser from '@/hooks/useUser'

type Props = {
    groupDetail: IStudyGroup
}

const GroupCard = ({ groupDetail }: Props) => {

    const { user: currentUser } = useUser();

    return (
        <article
            className="max-w-sm rounded shadow-lg bg-[#fefefe] 
            hover:bg-gray-100/70 transition duration-300 cursor-pointer
            p-5 flex flex-col items-start gap-y-5"
        >

            <div className="flex items-start gap-x-4">
                <Avatar
                    profilePicture={groupDetail.groupAvatar}
                    isSuggestionAvatar
                />
                <div className='flex flex-col items-start'>
                    <span className='font-bold text-xl'>
                        {groupDetail.groupName}
                    </span>
                    <div className='flex items-center gap-x-5'>
                        <p className='text-sm text-[#343a40]/60'>
                            Created by {groupDetail.creator.username}
                        </p>
                        {
                            groupDetail.private == true ? (
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
                    {groupDetail.members.length} Members
                </span>
            </div>

            {
                groupDetail.members.some(member => member.userId == currentUser?.id) ? (
                    <button
                        className="bg-[#fefefe] text-[#343a40] border 
                        border-[#343a40] font-medium py-1 px-4 rounded text-sm"
                        disabled
                    >
                        Already Member
                    </button>
                ) : (
                    <button
                        className="bg-[#1abc9c] hover:bg-[#1abc9c]/60 text-white 
                    font-medium py-1 px-4 rounded text-sm"
                        disabled
                    >
                        Join
                    </button>
                )
            }


        </article>

    )
}

export default GroupCard