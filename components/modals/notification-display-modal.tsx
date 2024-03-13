"use client"

import React, { useEffect } from 'react'
import Modal from '../modal'
import useNotifications from '@/hooks/useNotifications'
import useUser from '@/hooks/useUser'
import { INotification } from '@/interface-d'
import Avatar from '../avatar'
import useNotificationModal from '@/hooks/useNotificationModal'

type Props = {}

const NotificationDisplayModal = (props: Props) => {

    const { user: currentUser, mutate: updateCurrentUser } = useUser();
    const { data: notifications = [], mutate: updateNotifications } = useNotifications(currentUser?.id);
    const handleNotificationModal = useNotificationModal();

    useEffect(() => {
        updateCurrentUser();
        updateNotifications();
    }, [updateCurrentUser, updateNotifications])

    const modalBody: React.ReactNode = (
        <div className='flex flex-col w-full'>
            {
                notifications.length === 0 ? (
                    <p>No notifications</p>
                ) : (
                    notifications.map((notification: INotification) => (
                        <div
                            key={notification.id}
                            className='flex flex-row items-center p-6 gap-4 border-b-[1px]
                    border-[#343a40]/40 w-[500px]'
                        >
                            <div>
                                <Avatar
                                    isSuggestionAvatar
                                    userId={notification.sender?.id}
                                    profilePicture={notification.sender?.profilePicture}
                                />
                            </div>
                            <p>
                                {notification.body}
                            </p>
                        </div>
                    ))
                )
            }
        </div>
    )


    return (
        <Modal
            title='Notifications'
            onClose={handleNotificationModal.onClose}
            isOpen={handleNotificationModal.isOpen}
            body={modalBody}
            onSubmit={() => console.log('')}
        />
    )
}

export default NotificationDisplayModal