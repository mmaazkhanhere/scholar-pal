"use client"

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'

import Modal from '../modal'
import Avatar from '../avatar'
import PostLength from '../posts/post-length'
import PostFooter from '../posts/post-footer'
import Button from '../button'
import Tags from '../tags'
import usePostModal from '@/hooks/usePostModal'



type Props = {}

const NewPostModal = (props: Props) => {

    const [postContent, setPostContent] = useState<string>('')
    const [tags, setTags] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const session = useSession()

    const handlePostModal = usePostModal()

    const modalBody: React.ReactNode = (
        <div className='flex flex-col gap-y-5'>
            <div className='flex items-center justify-start gap-x-5'>
                <Avatar isMedium />
                <span className='text-xl lg:text-2xl font-bold'>
                    {session.data?.user?.name}
                </span>
            </div>
            <div className='flex flex-col items-start w-full gap-y-4'>
                <textarea
                    value={postContent}
                    onChange={(event) => setPostContent(event.target.value)}
                    placeholder='What is on your mind?'
                    minLength={100}
                    className='min-h-[200px] lg:min-h-[150px] w-full p-2 overflow-y-auto
                        placeholder:text-lg lg:placeholder:text-xl border 
                        rounded-xl text-lg lg:text-xl focus:outline-none'
                    disabled={isLoading}
                />

                <Tags tags={tags} setTags={setTags} />

                <div className='flex items-center justify-between w-full'>
                    <PostFooter />
                    <PostLength currentLength={postContent.length} />
                </div>
                <Button
                    disabled={isLoading || postContent.length > 250}
                    label='Post'
                    onClick={() => console.log('')}
                    className='self-end px-6 py-1 lg:py-3'
                    ariaLabel='Post Button'
                />
            </div>
        </div>
    )

    return (

        <Modal
            disabled={isLoading}
            body={modalBody}
            isOpen={handlePostModal.isOpen}
            onClose={handlePostModal.onClose}
            onSubmit={() => console.log('')}
        />

    )
}

export default NewPostModal