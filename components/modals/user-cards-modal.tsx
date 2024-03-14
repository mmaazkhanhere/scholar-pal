/*A react component that displays a list of users  */

"use client"

import React, { useState } from 'react'

import Modal from '../modal';
import AddedUserCard from '../user/added-user-card';
import PendingUserCard from '../user/pending-user-card';

import useUserCard from '@/hooks/useUserCard';


type Props = {

}

const UserCardModal = (props: Props) => {

    const [loading, setLoading] = useState<boolean>(false);

    const handleUserCardModal = useUserCard(); //hook to manage the visibility of the user card modal

    const groupMembersList = handleUserCardModal.acceptedList //get the list of members of group

    //body of the modal
    const modalBody: React.ReactNode = (
        <div>
            {
                /*If data that is being passed is data of pending members of the
                group then pending user card component is called. */
                handleUserCardModal.isPending == true ? (
                    handleUserCardModal.pendingList?.map((userId: string) => (
                        <div
                            key={userId}
                            className=' flex flex-col items-start gap-y-2'>
                            <PendingUserCard
                                userId={userId}
                                groupId={handleUserCardModal.groupId}
                            />
                        </div>

                    ))
                ) : (
                    /*If data passed is that of members of the group then added
                    user card component is called */
                    groupMembersList?.map((user: any) => (
                        <div
                            key={user.id}
                            className='flex flex-col items-start'
                        >
                            <AddedUserCard
                                member={user}
                            />
                        </div>
                    ))
                )
            }
        </div>
    )

    return (
        <section>
            <Modal
                title={handleUserCardModal.title}
                isOpen={handleUserCardModal.isOpen}
                onClose={handleUserCardModal.onClose}
                body={modalBody}
                onSubmit={() => console.log('')}
                disabled={loading}
            />
        </section>
    )
}

export default UserCardModal