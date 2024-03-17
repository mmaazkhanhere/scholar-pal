import React from 'react'

import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

type Props = {}

const ForumButton = (props: Props) => {
    return (
        <div className='flex items-center gap-x-6'>

            {/*Thumb Up Button */}
            <button className='flex items-center justify-center gap-x-2'>
                <FaRegThumbsUp className='w-6 h-6' />
                <span>
                    {0}
                </span>
            </button>

            {/*Thumb Down Button */}
            <button className='flex items-center justify-center gap-x-2'>
                <FaRegThumbsDown className='w-6 h-6' />
                <span>
                    {0}
                </span>
            </button>
        </div>
    )
}

export default ForumButton