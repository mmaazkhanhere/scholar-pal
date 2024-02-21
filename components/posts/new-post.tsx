"use client"

import React from 'react'

import { IUser } from '@/interface-d'
import Avatar from '../avatar'
import Button from '../button'
import usePostModal from '@/hooks/usePostModal'

type Props = {
    currentUser?: IUser
}

const NewPost = (props: Props) => {

    const handlePostModal = usePostModal()

    return (
        <div className='flex items-center justify-between py-2 px-4 rounded-lg
        border-[#343a40]/40 w-full lg:max-w-3xl gap-x-5 shadow-md'
        >
            <Avatar isMedium />
            <Button
                label='What is on your mind...'
                secondary
                className='border border-[#343a40]/30 w-full
                py-2 px-6 rounded-3xl text-xl text-[#343a40]/60 hover:scale-100'
                onClick={handlePostModal.onOpen}
            />
        </div>
    )
}

export default NewPost