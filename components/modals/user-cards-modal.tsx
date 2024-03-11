"use client"

import React, { useState } from 'react'
import Modal from '../modal';
import { IUser } from '@/interface-d';
import useUserCardModal from '@/hooks/useUserCardsModal';
import UserCard from '../user/user-card';

type Props = {
    title?: string;
    userList?: IUser[]
}

const UserCardModal = ({ title, userList }: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const handleUserCardModal = useUserCardModal();
    console.log(handleUserCardModal)

    const modalBody: React.ReactNode = (
        <div>
            {
                handleUserCardModal.data?.map((user: IUser) => (
                    <div
                        key={user.id}
                        className='flex flex-col items-start gap-y-1'
                    >
                        <UserCard
                            user={user}
                        />
                    </div>
                ))
            }
        </div>
    )

    return (
        <section>
            <Modal
                title={title}
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