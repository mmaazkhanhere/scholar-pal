"use client"

import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useSession } from 'next-auth/react'

import Modal from '../modal'
import Avatar from '../avatar'

import usePostModal from '@/hooks/usePostModal'

type Props = {}

const NewPostModal = (props: Props) => {

    const [postContent, setPostContent] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handlePostModal = usePostModal()
    const session = useSession()

    const modalBody: React.ReactNode = (
        <div className='flex flex-col gap-y-5'>
            <div className='flex items-center justify-start'>
                <Avatar />
                <div className='flex flex-col items-start'>
                    <span>{session.data?.user?.name}</span>
                    <textarea
                        value={postContent}
                        onChange={(event) => setPostContent(event.target.value)}
                        placeholder='What is on your mind?'
                        minLength={100}
                        className='min-h-[200px] w-full p-1 overflow-y-auto'
                        disabled={isLoading}
                    />
                </div>
            </div>
        </div>
    )

    return (
        <React.Fragment>
            <ToastContainer />
            <Modal
                disabled={isLoading}
                body={modalBody}
                isOpen={handlePostModal.isOpen}
                onClose={handlePostModal.onClose}
                onSubmit={() => console.log('')}
            />
        </React.Fragment>
    )
}

export default NewPostModal