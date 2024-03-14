/*A react component that displays a list of groups available for user to join */

"use client"

import React, { useState } from 'react'

import CreateGroupButton from './create-group-button'
import ToggleButton from '../toggle-button'
import GroupCard from './group-card'
import LoadingSpinner from '../loading-spinner'

import { useGroups } from '@/hooks/useGroups'
import useUser from '@/hooks/useUser'
import useGroupJoined from '@/hooks/useGroupJoined'

type Props = {}

const GroupList = (props: Props) => {

    const [showGroupJoined, setShowGroupJoined] = useState(true); /*a toggle 
    button to show only those groups that user is member of */

    const { data: groups, isLoading } = useGroups(); /* Get list of groups
    and loading state while data is fetching*/
    const { user: currentUser } = useUser(); // fetch the current user
    const { data: groupJoined } = useGroupJoined(currentUser?.id) /*fetch
    the list of groups user have joined */

    const toggleGroups = () => {
        setShowGroupJoined(!showGroupJoined); //function to toggle groupJoined by user
    }

    if (isLoading || !groups) {
        //while data is being fetched, display a loading spinner
        return <LoadingSpinner spinnerSize={60} />;
    }

    return (
        <section
            className='lg:col-span-5 w-full flex flex-col items-start gap-y-4'
        >
            <div className='flex items-center justify-between w-full'>
                {/*create group component */}
                <CreateGroupButton />

                {/*toggle show group component */}
                <ToggleButton
                    variableToToggle={showGroupJoined}
                    onChange={toggleGroups}
                />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 w-full mt-5 gap-8'>

                {
                    /*If showGroupJoined is true display a list of groups joined
                    by the user or else display all the groups available */
                    showGroupJoined ? (
                        groupJoined?.map((group) => (
                            <GroupCard
                                key={group.id}
                                groupDetail={group}
                            />
                        ))
                    ) : (
                        groups.map((group) => (
                            <GroupCard
                                key={group.id}
                                groupDetail={group}
                            />
                        ))
                    )
                }

            </div>

        </section>
    )
}

export default GroupList