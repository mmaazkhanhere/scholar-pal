"use client"

import React, { useState } from 'react'
import CreateGroupButton from './create-group-button'
import ToggleButton from '../toggle-button'
import GroupCard from './group-card'
import { useGroups } from '@/hooks/useGroups'
import LoadingSpinner from '../loading-spinner'
import useUser from '@/hooks/useUser'
import useGroupJoined from '@/hooks/useGroupJoined'

type Props = {}

const GroupList = (props: Props) => {

    const [showGroupJoined, setShowGroupJoined] = useState(true);

    const { data: groups, isLoading } = useGroups();
    const { user: currentUser } = useUser();
    const { data: groupJoined } = useGroupJoined(currentUser?.id)

    const toggleGroups = () => {
        setShowGroupJoined(!showGroupJoined);
    }

    if (isLoading || !groups) {
        return <LoadingSpinner spinnerSize={60} />;
    }

    return (
        <section
            className='lg:col-span-5 w-full flex flex-col items-start gap-y-4'
        >
            <div className='flex items-center justify-between w-full'>
                <CreateGroupButton />
                <ToggleButton
                    variableToToggle={showGroupJoined}
                    onChange={toggleGroups}
                />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 w-full mt-5 gap-8'>

                {
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