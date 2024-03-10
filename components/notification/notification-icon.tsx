import useNotifications from '@/hooks/useNotifications'
import useUser from '@/hooks/useUser'
import Link from 'next/link'
import React from 'react'
import { BsDot } from 'react-icons/bs'
import { IoMdNotifications } from 'react-icons/io'

type Props = {}

const NotificationIcon = (props: Props) => {

    const { user } = useUser();
    console.log(user?.hasNotifications)

    return (
        <Link
            href='/notification'
            className='cursor-pointer relative'
        >
            <IoMdNotifications className='hidden lg:block w-7 h-7' />
            {
                user?.hasNotifications && <BsDot
                    className='text-[#1abc9c] absolute -top-6 -left-0'
                    size={60}
                />
            }
        </Link>
    )
}

export default NotificationIcon