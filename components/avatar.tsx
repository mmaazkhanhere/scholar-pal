import Image from 'next/image'
import React from 'react'

type Props = {
    isLarge?: boolean
}

const Avatar: React.FC<Props> = ({ isLarge }) => {
    return (
        <div
            className={`
            ${isLarge ? 'w-32 h-32' : 'w-7 h-7'}
            rounded-full hover:opacity-90 hover:scale-105 transition duration-500
            cursor-pointer relative
        `}
        >
            <Image
                src='/placeholder.png'
                alt='User Avatar'
                fill
                className='object-cover rounded-full'
            />
        </div>
    )
}

export default Avatar