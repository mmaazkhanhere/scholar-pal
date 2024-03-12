"use client"

import React from 'react'
import GroupPostButton from './group-post-button'
import useGroupMembers from '@/hooks/useGroupMembers'
import useUser from '@/hooks/useUser'
import { usePathname } from 'next/navigation'

type Props = {}

const GroupPostBar = (props: Props) => {

    const groupId = usePathname().split('/').pop()

    const { data: groupMembers = [] } = useGroupMembers(groupId);
    const { user: currentUser } = useUser();

    return (
        <section className='flex flex-col lg:col-span-5 w-full px-2 lg:px-20 mt-10'>
            <div className='pt-5 lg:pt-0'>

                {
                    groupMembers?.includes(currentUser?.id as any) && <GroupPostButton />
                }

            </div>
        </section>
    )
}

export default GroupPostBar