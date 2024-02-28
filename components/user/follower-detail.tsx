import React from 'react'

type Props = {
    followers?: string[];
    following?: string[];
}

const FollowerDetail = ({ followers, following }: Props) => {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start gap-x-2'>
                <span>{followers?.length}</span>
            </div>
            <div className='flex items-center justify-start gap-x-2'>
                <span>{following?.length}</span>
            </div>
        </div>
    )
}

export default FollowerDetail