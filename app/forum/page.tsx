import ForumHomepage from '@/components/forum/forum-homepage'
import Header from '@/components/header'
import React from 'react'

type Props = {}

const ForumPage = (props: Props) => {
    return (
        <main>
            <Header />
            <ForumHomepage />
        </main>
    )
}

export default ForumPage