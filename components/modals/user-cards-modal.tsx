"use client"

import React, { useState } from 'react'
import Modal from '../modal';
import { IMembership, IUser } from '@/interface-d';
import useUserCardModal from '@/hooks/useUserCardsModal';
import UserCard from '../user/user-card';

type Props = {
    title?: string;
    userList?: IMembership[]
}

const UserCardModal = ({ title, userList }: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const handleUserCardModal = useUserCardModal();

    const modalBody: React.ReactNode = (
        <div>
            {
                handleUserCardModal.data?.map((user: IMembership) => (
                    <div
                        key={user.id}
                        className='flex flex-col items-start gap-y-1'
                    >
                        <UserCard
                            member={user}
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