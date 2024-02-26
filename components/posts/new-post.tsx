"use client"

import React from 'react'

import { IUser } from '@/interface-d'
import Avatar from '../avatar'
import Button from '../button'
import usePostModal from '@/hooks/usePostModal'
import useLoginModal from '@/hooks/useLoginModal'
import { useSession } from 'next-auth/react'

type Props = {
    currentUser?: IUser
}

const NewPost = (props: Props) => {

    const handlePostModal = usePostModal()
    const handleLoginModal = useLoginModal()

    const session = useSession()

    const handleClick = () => {
        if (session.status !== 'authenticated') {
            handleLoginModal.onOpen()
        }
        else {
            handlePostModal.onOpen()
        }
    }

    return (
        <button
            onClick={handleClick}
            className='flex items-center justify-between py-2 px-4 rounded-lg
            border-[#343a40]/40 w-full lg:max-w-3xl gap-x-2.5 md:gap-x-5 shadow-md
            hover:scale-95 transition duration-500 cursor-pointer'
        >
            <div>
                <Avatar isPostAvatar />
            </div>
            <p
                className='border border-[#343a40]/30 w-full py-1 md:py-2 px-6 
                rounded-3xl lg:text-xl text-[#343a40]/60 hover:scale-100'

            >
                What is on your mind...
            </p>
        </button>
    )
}

export default NewPost