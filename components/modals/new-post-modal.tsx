"use client"

import React, { useCallback, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'

import Modal from '../modal'
import Avatar from '../avatar'
import PostLength from '../posts/post-length'
import NewPostFooter from '../posts/new-post-footer'
import AddTags from '../posts/add-tags'

import usePostModal from '@/hooks/usePostModal'
import useLoginModal from '@/hooks/useLoginModal'

import { successNotification } from '@/helpers/success-notification'
import { errorNotification } from '@/helpers/error-notification'


type Props = {}

const NewPostModal = (props: Props) => {

    const [postContent, setPostContent] = useState<string>('')
    const [tags, setTags] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const session = useSession()

    const handlePostModal = usePostModal()
    const handleLoginModal = useLoginModal()

    const handleSubmit = useCallback(async () => {
        console.log('function called')
        try {
            setIsLoading(true)

            const result = await axios.post('/api/posts', { postContent, tags })
            if (result.status == 200) {
                successNotification('Post successfully')
            }
            setIsLoading(false)
            handlePostModal.onClose()

        } catch (error) {
            setIsLoading(false)
            console.error('NEW_POST_MODAL_ERROR', error)
            if (axios.isAxiosError(error) && (error.response?.status == 401)) {
                errorNotification('Not Authenticated')
                handleLoginModal.onOpen()
            }
            else if (axios.isAxiosError(error) && (error.response?.status == 404)) {
                errorNotification('Post is empty')
            }
            else {
                errorNotification('Something went wrong')
            }
        }

    }, [handleLoginModal, handlePostModal, postContent, tags])

    const modalBody: React.ReactNode = (
        <div className='flex flex-col gap-y-5'>
            <div className='flex items-center justify-start gap-x-5'>
                <Avatar isPostAvatar />
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

                <AddTags tags={tags} setTags={setTags} />

                <div className='flex items-center justify-between w-full'>
                    <NewPostFooter />
                    <PostLength currentLength={postContent.length} />
                </div>
            </div>
        </div>
    )

    return (

        <Modal
            disabled={isLoading || postContent.length > 250}
            body={modalBody}
            isOpen={handlePostModal.isOpen}
            onClose={handlePostModal.onClose}
            onSubmit={handleSubmit}
            buttonLabel='Post'
        />

    )
}

export default NewPostModal