
import React from 'react'

import Header from '@/components/header'
import UserPosts from '@/components/user/user-posts'
import UserSidebar from '@/components/user/user-sidebar'
import NewPost from '@/components/posts/new-post'

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
                <div className='flex flex-col lg:col-span-5 w-full px-20'>
                    <NewPost />
                    <UserPosts />
                </div>
            </section>
        </React.Fragment>

    )
}

export default UserProfile