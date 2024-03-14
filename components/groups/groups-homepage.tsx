/*Home page of the group page route */
import React from 'react'
import GroupList from './group-list'

type Props = {}

const GroupsHomepage = (props: Props) => {
    return (
        <section
            className='py-20 lg:py-32 max-w-[1600px] mx-auto grid grid-cols-1 
            lg:grid-cols-7 w-full px-2 lg:px-4 '
        >
            <GroupList />
        </section>
    )
}

export default GroupsHomepage