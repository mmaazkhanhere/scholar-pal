import Header from '@/components/header'
import UserSidebar from '@/components/user/user-sidebar'
import React from 'react'

type Props = {}

const UserProfile = (props: Props) => {
    return (
        <React.Fragment>
            <Header />
            <section
                className='max-w-[1600px] mx-auto grid lg:grid-cols-7 w-full pt-28'
            >
                <div className='lg:col-span-2 border rounded-lg w-full'>
                    <UserSidebar />
                </div>
            </section>
        </React.Fragment>

    )
}

export default UserProfile