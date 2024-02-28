import Header from '@/components/header'
import UserSidebar from '@/components/user/user-sidebar'
import React from 'react'

type Props = {}

const UserProfile = (props: Props) => {
    return (
        <React.Fragment>
            <Header />
            <section
                className='max-w-[1600px] mx-auto grid grid-cols-7 w-full pt-20'
            >
                <div className='col-span-2 border border-black w-full'>
                    <UserSidebar />
                </div>
            </section>
        </React.Fragment>

    )
}

export default UserProfile