"use client"

import React, { useState } from 'react'
import Modal from '../modal';
import { IMembership, IUser } from '@/interface-d';
import AddedUserCard from '../user/added-user-card';
import useUserCard from '@/hooks/useUserCard';
import PendingUserCard from '../user/pending-user-card';

type Props = {

}

const UserCardModal = (props: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const handleUserCardModal = useUserCard();

    const groupMembersList = handleUserCardModal.acceptedList

    const modalBody: React.ReactNode = (
        <div>
            {
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