import GroupsHomepage from '@/components/groups/groups-homepage'
import Header from '@/components/header'
import React from 'react'

type Props = {}

const GroupPage = (props: Props) => {
    return (
        <main>
            <Header />
            <GroupsHomepage />
        </main>
    )
}

export default GroupPage