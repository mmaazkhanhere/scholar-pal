"use client"

import useGroup from '@/hooks/useGroup';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import Avatar from '../avatar';
import GroupMemberDetails from './group-membder-details';

type Props = {}

const GroupSidebar = (props: Props) => {

    const [loading, isLoading] = useState<boolean>(false);

    const groupId = usePathname().split('/groups').pop();

    const { data: groupDetail, mutate: updateGroup } = useGroup(groupId as string)

    if (!groupDetail) {
        return null;
    }

    return (
        <section
            className='lg:col-span-2 flex flex-col items-start justify-center text-[#343a40]
            p-6 border rounded-lg gap-y-5 w-full'
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
                    members={groupDetail.members}
                    pendingMembers={groupDetail.pendingMembers}
                    groupCreatorId={groupDetail.creatorId}
                    isPrivate={groupDetail.private}
                />

            </div>
        </section>
    )
}

export default GroupSidebar