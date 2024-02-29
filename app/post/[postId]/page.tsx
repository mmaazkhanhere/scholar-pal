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
            <div
                className='flex flex-col items-start pt-24 mx-auto max-w-4xl 
            px-2 lg:px-0'
            >
                <Link href='/'>
                    <IoArrowBackCircleOutline className='w-10 h-10' />
                </Link>
                <PostDetail />
            </div>
        </main>
    )
}

export default PostPage