/*A react component that displays list of post made in the group and a button 
to create new post for the group*/

"use client"

import React from 'react'
import { usePathname } from 'next/navigation'

import GroupPostButton from './group-post-button'
import GroupPosts from './group-posts'

import useGroupMembers from '@/hooks/useGroupMembers'
import useUser from '@/hooks/useUser'


type Props = {}

const GroupPostBar = (props: Props) => {

    const groupId = usePathname().split('/').pop() /*Get the group id from
    the url path */

    const { data: groupMembers = [] } = useGroupMembers(groupId); /*get list
    of group members */
    const { user: currentUser } = useUser(); //get current user detail

    return (
        <section className='flex flex-col lg:col-span-5 w-full px-2 lg:px-20 mt-10'>
            <div className='pt-5 lg:pt-0'>

                {/*display the nwe post button only if the user is group member */}
                {
                    groupMembers?.includes(currentUser?.id as any) && <GroupPostButton />
                }
            </div>

            {/*List of group posts */}
            <GroupPosts />
        </section>
    )
}

export default GroupPostBar