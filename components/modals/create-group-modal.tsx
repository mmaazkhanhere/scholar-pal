"use client"

import React, { useState } from 'react'

import Input from '../input'
import ImageUpload from '../image-upload'
import ToggleButton from '../toggle-button'
import Modal from '../modal'
import useGroupModal from '@/hooks/useGroupModal'
import useLoginModal from '@/hooks/useLoginModal'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { successNotification } from '@/helpers/success-notification'
import useUser from '@/hooks/useUser'
import { errorNotification } from '@/helpers/error-notification'

type Props = {}

const CreateGroupModal = (props: Props) => {

    const [loading, setLoading] = useState<boolean>(false);

    const [groupName, setGroupName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [groupAvatar, setGroupAvatar] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [subject, setSubject] = useState<string>('');

    const { isOpen, onClose } = useGroupModal();
    const { onOpen: openLoginModal } = useLoginModal();
    const { status } = useSession();
    const { user: currentUser } = useUser()

    const currentUserId = currentUser?.id

    const handleToggle = () => {
        setIsPrivate(!isPrivate);
    }

    const handleSubmit = async () => {
        try {

            setLoading(true);

            if (status == 'unauthenticated') {
                openLoginModal();
            }

            const request = await axios.post('/api/group', {
                groupName, description, groupAvatar, isPrivate, subject, currentUserId
            })

            if (request.status === 200) {
                successNotification('Group Successfully Created');
                setLoading(false);
                onClose();
            }

            setGroupName('');
            setDescription('');
            setGroupAvatar('');
            setIsPrivate(false);
            setSubject('');

        } catch (error) {

            console.error('CREATE_GROUP_MODAL_ERROR', error);

            if (axios.isAxiosError(error) && error.response?.status == 400) {
                errorNotification('Missing Details. Please fill out all fields')
            }
            else {
                errorNotification('Something went wrong');
            }
        }
        finally {
            setLoading(false);
        }
    }

    const modalBody: React.ReactNode = (
        <div className='flex flex-col items-start gap-y-5 mt-2'>

            <ImageUpload
                value={groupAvatar}
                disabled={loading}
                onChange={(image) => setGroupAvatar(image)}
                label='Upload Avatar for Group'
            />

            <Input
                label='Name of Study Group'
                value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
                disabled={loading}
            />

            <div className='flex flex-col items-start gap-y-2 w-full'>
                <p className='lg:text-lg font-medium'>
                    Description
                </p>
                <textarea
                    className="w-full min-h-[100px] p-2 overflow-auto rounded-lg 
                    border outline-none focus:border-[#1abc9c] disabled:opacity-70
                    disabled:cursor-not-allowed"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Purpose of the Study Group"
                />
            </div>

            <Input
                label='Subject in Focus'
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                disabled={loading}
                placeholder='Mathematics'
            />

            <div className='flex items-center gap-x-4'>
                <p className='lg:text-lg font-medium'>
                    Is the Group Private?
                </p>
                <ToggleButton
                    variableToToggle={isPrivate}
                    onChange={handleToggle}
                />
            </div>


        </div>
    )

    return (
        <div>
            <Modal
                disabled={loading}
                title='Create New Study Group'
                onClose={onClose}
                body={modalBody}
                onSubmit={handleSubmit}
                buttonLabel='Create Group'
                isOpen={isOpen}
            />
        </div>
    )
}

export default CreateGroupModal