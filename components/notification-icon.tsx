import React from 'react'

import useUser from '@/hooks/useUser'
import useNotificationModal from '@/hooks/useNotificationModal'

import { BsDot } from 'react-icons/bs'
import { IoMdNotifications } from 'react-icons/io'

type Props = {}

const NotificationIcon = (props: Props) => {

    const { user } = useUser();
    const { onOpen: openNotificationModal } = useNotificationModal();

    return (
        <button
            aria-label='Notification Button'
            title='Notifications'
            onClick={openNotificationModal}
            className='cursor-pointer relative'
        >
            <IoMdNotifications className='hidden lg:block w-7 h-7' />
            {
                user?.hasNotifications && <BsDot
                    className='text-[#1abc9c] absolute -top-6 -left-0'
                    size={60}
                />
            }
        </button>
    )
}

export default NotificationIcon