import React from 'react'
import GroupPostButton from './group-post-button'

type Props = {}

const GroupPostBar = (props: Props) => {
    return (
        <section className='flex flex-col lg:col-span-5 w-full px-2 lg:px-20 mt-10'>
            <div className='pt-5 lg:pt-0'>
                {/*If the profile page user has navigated is same as the user
                currently signed in, only then display the new post button */}
                <GroupPostButton />

            </div>
        </section>
    )
}

export default GroupPostBar