import React from 'react'
import Link from 'next/link';

import Header from '@/components/header'

import { IoArrowBackCircleOutline } from "react-icons/io5";
import PostDetail from '@/components/posts/post-detail';


type Props = {}

const PostPage = (props: Props) => {
    return (
        <main>
            <Header />

            {/*Post UI */}
            <div
                className='flex flex-col items-start pt-24 mx-auto max-w-4xl 
            px-2 lg:px-0'
            >
                {/*Return back button */}
                <Link href='/'>
                    <IoArrowBackCircleOutline className='w-10 h-10' />
                </Link>

                {/*Post displayed */}
                <PostDetail />
            </div>
        </main>
    )
}

export default PostPage