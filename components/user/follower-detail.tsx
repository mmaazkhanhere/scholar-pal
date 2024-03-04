/*A react component that display a user follower and following numbers. */

import React from 'react'

import { FaUser, FaUserCheck } from "react-icons/fa";

type Props = {
    followers?: string[]; //a string array of userIds who follow the user
    following?: string[]; //a string array of userId who the user is following
}

const FollowerDetail = ({ followers, following }: Props) => {
    return (
        <section className='flex items-center justify-between mb-5 gap-x-5'>

            {/*Follower Number */}
            <div
                title='Follower'
                aria-label='Followers'
                className='flex items-center justify-start gap-x-2'
            >
                <FaUser
                    className='w-5 lg:w-6 h-5 lg:h-6'
                />
                <span className='text-lg font-semibold'>
                    Followers:
                </span>
                <span className='text-lg font-bold'>
                    {followers?.length}
                </span>
            </div>

            {/*Following number */}
            <div
                title='Followings'
                aria-label='Followings'
                className='flex items-center justify-start gap-x-2'
            >
                <FaUserCheck className='w-6 lg:w-7 h-6 lg:h-7' />
                <span className='text-lg font-semibold'>
                    Following
                </span>
                <span className='text-lg font-bold'>
                    {following?.length}
                </span>
            </div>
        </section>
    )
}

export default FollowerDetail