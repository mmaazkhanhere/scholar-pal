import React from 'react'
import NewPost from './posts/new-post'
import { IUser } from '@/interface-d'
import PostFeed from './posts/post-feed'

type Props = {
    currentUser?: IUser
}

const HomePage = ({ currentUser }: Props) => {
    return (
        <section
            className='grid grid-cols-1 lg:grid-cols-7 py-20 lg:py-32 max-w-[1600px]
            mx-auto px-2 lg:px-4'
        >
            <div className='lg:col-span-5 w-full flex flex-col items-start border border-black'>
                <NewPost currentUser={currentUser} />
                <PostFeed currentUser={currentUser!} />
            </div>
            <div className='hidden lg:block lg:col-span-2 w-full border border-black'>
                Hello
            </div>
        </section>
    )
}

export default HomePage