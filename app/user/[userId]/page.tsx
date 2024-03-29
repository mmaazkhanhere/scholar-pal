
import React from 'react'

import Header from '@/components/header'
import UserSidebar from '@/components/user/user-sidebar'
import UserPostBar from '@/components/user/user-post-bar'

type Props = {}

const UserProfile = (props: Props) => {

    return (
        <React.Fragment>
            <Header />

            <section
                className='max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-7 w-full pt-28
                px-2 lg:px-0'
            >
                {/*User side bar that has user details */}
                <div className='lg:col-span-2 w-full'>
                    <UserSidebar />
                </div>

                {/*All the post made by the user */}
                <UserPostBar />
            </section>
        </React.Fragment>

    )
}

export default UserProfile