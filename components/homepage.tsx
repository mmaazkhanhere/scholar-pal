/*A react component that represents the UI of homepage of the application */

import React from 'react'

import NewPostButton from './posts/new-post-button'
import PostFeed from './posts/post-feed'
import UserSuggestion from './user-suggestion'

type Props = {}

const HomePage = (props: Props) => {

    return (
        <section
            className='grid grid-cols-1 lg:grid-cols-7 py-20 lg:py-32 max-w-[1600px]
            mx-auto px-2 lg:px-4 gap-x-8'
        >
            {/*Left side bar that contains all the post */}
            <div
                className='lg:col-span-5 w-full flex flex-col items-start 
                px-2 lg:px-0'
            >
                <NewPostButton />
                <PostFeed />
            </div>

            {/*Right side bar */}
            <div className='hidden lg:block lg:col-span-2 w-full relative'>
                <UserSuggestion />
            </div>
        </section>
    )
}

export default HomePage