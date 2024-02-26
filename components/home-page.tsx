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
            className='grid grid-cols-1 lg:grid-cols-6 py-20 lg:py-32 max-w-[1600px]
            mx-auto px-2 lg:px-4 gap-x-8'
        >
            <div
                className='lg:col-span-4 w-full flex flex-col items-start 
                px-2 lg:px-0'
            >
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