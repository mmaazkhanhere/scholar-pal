/*A react component that represents the homepage of the forum page. For large
screen, it is divided into two section. In the left section, forum header and
the list of questions is displayed. In the right section, a list of top
questions, ordered by most answers received, is displayed */

import React from 'react'

import ForumHeader from './forum-header'
import QuestionsList from './questions-list'
import ForumSidebar from './forum-sidebar'

type Props = {}

const ForumHomepage = (props: Props) => {
    return (
        <section
            className='grid grid-cols-1 lg:grid-cols-7 py-20 lg:py-32 max-w-[1600px]
            mx-auto px-2 lg:px-4 gap-x-8'
        >
            {/*Left Section */}
            <div
                className='lg:col-span-5 w-full flex flex-col items-start 
                px-4 lg:px-2 '
            >
                <ForumHeader />
                <QuestionsList />
            </div>

            {/*Right Section */}
            <div className='hidden lg:block lg:col-span-2 w-full relative'>
                <ForumSidebar />
            </div>

        </section>
    )
}

export default ForumHomepage