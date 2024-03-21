/*A react component that displays a modal to display all notifications
users have received using custom hooks. */

"use client"

import React, { useEffect } from 'react'

import Modal from '../modal'
import Avatar from '../avatar'

import useNotifications from '@/hooks/useNotifications'
import useNotificationModal from '@/hooks/useNotificationModal'
import useUser from '@/hooks/useUser'

import { INotification } from '@/interface-d'

type Props = {}

const NotificationDisplayModal = (props: Props) => {

    const { user: currentUser, mutate: updateCurrentUser } = useUser();
    /*hook to get current user and a mutate function to update the current user */

    const { data: notifications = [] } = useNotifications(currentUser?.id);
    /*hook to get the notification list */

    const handleNotificationModal = useNotificationModal(); //hook to manage notification modal

    useEffect(() => {
        updateCurrentUser(); //manually refetch the current user data
    }, [updateCurrentUser]);

    {/*Body of the modal */ }
    const modalBody: React.ReactNode = (
        <div className='flex flex-col w-full'>

            {/*Display list of notifications */}
            {
                notifications.length === 0 ? (
                    <p>No new notifications</p>
                ) : (
                    notifications.map((notification: INotification) => (
                        <div
                            key={notification.id}
                            className='flex flex-row items-center p-6 gap-4 border-b-[1px]
                        border-[#343a40]/40 w-[500px]'
                        >
                            {/*Avatar of sender */}
                            <div>
                                <Avatar
                                    isSuggestionAvatar
                                    userId={notification.sender?.id}
                                    profilePicture={notification.sender?.profilePicture}
                                />
                            </div>

                            {/*Body of the notification */}
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