import React from 'react'
import ForumHeader from './forum-header'
import QuestionsList from './questions-list'

type Props = {}

const ForumHomepage = (props: Props) => {
    return (
        <section
            className='grid grid-cols-1 lg:grid-cols-7 py-20 lg:py-32 max-w-[1600px]
            mx-auto px-2 lg:px-4 gap-x-8'
        >
            <div
                className='lg:col-span-5 w-full flex flex-col items-start 
                px-4 lg:px-2 '
            >
                <ForumHeader />
                <QuestionsList />
            </div>

        </section>
    )
}

export default ForumHomepage