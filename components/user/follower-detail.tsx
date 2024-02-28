import React from 'react'

import { FaUser } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";

type Props = {
    followers?: string[];
    following?: string[];
}

const FollowerDetail = ({ followers, following }: Props) => {
    return (
        <div className='flex items-center justify-between mb-5 gap-x-5'>
            <div
                title='Follower'
                aria-label='Followers'
                className='flex items-center justify-start gap-x-2'
            >
                <FaUser
                    className='w-6 lg:w-7 h-6 lg:h-7'
                />
                <span className='text-lg lg:text-xl font-semibold'>
                    Followers:
                </span>
                <span className='text-lg lg:text-xl font-bold'>
                    {followers?.length}
                </span>
            </div>
            <div
                title='Followings'
                aria-label='Followings'
                className='flex items-center justify-start gap-x-2'
            >
                <FaUserCheck className='w-7 lg:w-8 h-7 lg:h-8' />
                <span className='text-lg lg:text-xl font-semibold'>
                    Following
                </span>
                <span className='text-lg lg:text-xl font-bold'>
                    {following?.length}
                </span>
            </div>
        </div>
    )
}

export default FollowerDetail