/*A react button component that opens new post modal when clicked on */

"use client"

import React, { useCallback } from 'react'
import { useSession } from 'next-auth/react'

import Avatar from '../avatar'

import usePostModal from '@/hooks/usePostModal'
import useLoginModal from '@/hooks/useLoginModal'
import useUser from '@/hooks/useUser'

type Props = {}

const NewPostButton = (props: Props) => {

    const handlePostModal = usePostModal() //custom hook to handle visibility of post modal
    const handleLoginModal = useLoginModal() //custom hook to handle visibility of login modal

    const { status } = useSession() //get the current user authentication status
    const { user: currentUser } = useUser(); //get the current user

    const handleClick = useCallback(() => {
        if (status !== 'authenticated') {
            handleLoginModal.onOpen()
        } else {
            handlePostModal.onOpen()
        }
    }, [status, handleLoginModal, handlePostModal])

    return (
        <section
            onClick={handleClick}
            className='flex items-center justify-between py-2 px-4 rounded-lg
            border-[#343a40]/40 w-full lg:max-w-4xl gap-x-2.5 md:gap-x-5 shadow-md
            hover:scale-95 transition duration-500 cursor-pointer'
        >
            <Avatar
                profilePicture={currentUser?.profilePicture}
                isPostAvatar
                userId={currentUser?.id}
            />
            <span
                className='border border-[#343a40]/30 w-full py-1 md:py-2 px-6 
                rounded-3xl lg:text-xl text-[#343a40]/60 hover:scale-100'

            >
                What is on your mind...
            </span>
        </section>
    )
}

export default NewPostButton