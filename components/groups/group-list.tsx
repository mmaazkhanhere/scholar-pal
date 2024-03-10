"use client"

import React, { useState } from 'react'
import CreateGroupButton from './create-group-button'
import ToggleButton from '../toggle-button'
import GroupCard from './group-card'
import { useGroups } from '@/hooks/useGroups'
import LoadingSpinner from '../loading-spinner'

type Props = {}

const GroupList = (props: Props) => {

    const [showGroupJoined, setShowGroupJoined] = useState(false);

    const { data: groups, isLoading } = useGroups();

    const toggleGroups = () => {
        setShowGroupJoined(!showGroupJoined);
    }

    if (isLoading || !groups) {
        return <LoadingSpinner spinnerSize={60} />;
    }

    return (
        <section
            className='lg:col-span-5 w-full border border-black
        flex flex-col items-start gap-y-4'
        >
            <div className='flex items-center justify-between w-full'>
                <CreateGroupButton />
                <ToggleButton
                    variableToToggle={showGroupJoined}
                    onChange={toggleGroups}
                />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 w-full mt-5'>
                {
                    groups.map((group) => (
                        <GroupCard
                            key={group.id}
                            groupDetail={group}
                        />
                    ))
                }
            </div>

        </section>
    )
}

export default GroupList