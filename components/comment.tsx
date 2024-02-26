import React, { useState } from 'react'

import { IPost, IUser } from '@/interface-d'

import { FaRegCommentAlt } from "react-icons/fa";

type Props = {
    post: IPost,
    currentUser: IUser,
    isLoading?: boolean,
}

const Comment = ({ post, currentUser, isLoading }: Props) => {

    const [comment, setComment] = useState<string>('')

    return (
        <button
            disabled={isLoading}
            aria-label='Comment Button'
        >
            <FaRegCommentAlt
                className='w-5 h-5 hover:text-black/70
                transition duration-300 cursor-pointer'
            />
        </button>
    )
}

export default Comment