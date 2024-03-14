/*A react button component that opens new post modal when clicked on */

"use client"

import React, { useCallback } from 'react'
import { useSession } from 'next-auth/react'

import Avatar from '../avatar'

import useLoginModal from '@/hooks/useLoginModal'
import useUser from '@/hooks/useUser'
import useGroupPostModal from '@/hooks/useGroupPostModal'


type Props = {}

const GroupPostButton = (props: Props) => {

    const { onOpen: openGroupPostModal } = useGroupPostModal() //hook to open group post modal
    const { onOpen: openLoginModal } = useLoginModal() //hook to open login modal

    const { status } = useSession() //status of current user
    const { user: currentUser } = useUser(); //get the current user data

    const handleClick = useCallback(() => {
        /*function that checks if user is authenticated; if they are post modal
        is opened else login modal will be opened */
        if (status !== 'authenticated') {
            openLoginModal();
        } else {
            openGroupPostModal();
        }
    }, [status, openLoginModal, openGroupPostModal])

    return (
        <section
            onClick={handleClick}
            className='flex items-center justify-between py-2 px-4 rounded-lg
            border-[#343a40]/40 w-full lg:max-w-4xl gap-x-2.5 md:gap-x-5 shadow-md
            hover:scale-95 transition duration-500 cursor-pointer'
        >

            {/*Avatar */}
            <Avatar
                profilePicture={currentUser?.profilePicture}
                isPostAvatar
                userId={currentUser?.id}
            />

            {/*text span */}
            <span
                className='border border-[#343a40]/30 w-full py-1 md:py-2 px-6 
                rounded-3xl lg:text-xl text-[#343a40]/60 hover:scale-100'

            >
                What is on your mind...
            </span>
        </section>
    )
}

export default GroupPostButton