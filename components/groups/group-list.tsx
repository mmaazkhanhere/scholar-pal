"use client"

import React, { useState } from 'react'
import CreateGroupButton from './create-group-button'
import ToggleButton from '../toggle-button'

type Props = {}

const GroupList = (props: Props) => {

    const [showGroupJoined, setShowGroupJoined] = useState(false);

    const toggleGroups = () => {
        setShowGroupJoined(!showGroupJoined);
    }

    return (
        <section className='lg:col-span-5 w-full border border-black'>
            <div className='flex items-center justify-between w-full'>
                <CreateGroupButton />
                <ToggleButton
                    variableToToggle={showGroupJoined}
                    onChange={toggleGroups}
                />
            </div>

        </section>
    )
}

export default GroupList