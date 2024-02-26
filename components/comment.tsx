import React from 'react'

import { IPost, IUser } from '@/interface-d'

import { FaCommentAlt } from 'react-icons/fa'

type Props = {
    post: IPost,
    currentUser: IUser,
    isLoading?: boolean,
}

const Comment = ({ post, currentUser }: Props) => {
    return (
        <button>
            <FaCommentAlt
                className='w-5 h-5 hover:text-black/70
                        transition duration-300 cursor-pointer'
            />

        </button>
    )
}

export default Comment