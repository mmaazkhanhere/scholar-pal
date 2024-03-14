import React from 'react'

import PostFeed from './posts/post-feed'
import UserSuggestion from './user-suggestion'
import NewPostButton from './posts/new-post-button'

type Props = {}

const Homepage = (props: Props) => {
    return (
        <section
            className='grid grid-cols-1 lg:grid-cols-7 py-20 lg:py-32 max-w-[1600px]
            mx-auto px-2 lg:px-4 gap-x-8'
        >
            <div
                className='lg:col-span-5 w-full flex flex-col items-start 
                px-2 lg:px-0'
            >
                <NewPostButton />
                <PostFeed />
            </div>
            <div className='hidden lg:block lg:col-span-2 w-full relative'>
                <UserSuggestion />
            </div>
        </section>
    )
}

export default Homepage