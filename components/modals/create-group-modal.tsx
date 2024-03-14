/*A react component that represents a modal for creating a new study group.
It uses custom hook to fetch and update relative data. */

"use client"

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'

import Input from '../input'
import ImageUpload from '../image-upload'
import ToggleButton from '../toggle-button'
import Modal from '../modal'

import useGroupModal from '@/hooks/useGroupModal'
import useLoginModal from '@/hooks/useLoginModal'
import useUser from '@/hooks/useUser'
import { useGroups } from '@/hooks/useGroups'
import useGroupJoined from '@/hooks/useGroupJoined'

import { successNotification } from '@/helpers/success-notification'
import { errorNotification } from '@/helpers/error-notification'

type Props = {}

const CreateGroupModal = (props: Props) => {

    const [loading, setLoading] = useState<boolean>(false);

    // state variables for managing modal data
    const [groupName, setGroupName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [groupAvatar, setGroupAvatar] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [subject, setSubject] = useState<string>('');


    const { isOpen, onClose } = useGroupModal(); //hook to group modal for creating group
    const { onOpen: openLoginModal } = useLoginModal(); //hook to login modal
    const { status } = useSession(); //current status of login user
    const { user: currentUser } = useUser() //fetch current user
    const { mutate: updateGroupList } = useGroups(); //fetch all users
    const { mutate: updateGroupJoined } = useGroupJoined(currentUser?.id);/*hook
    with mutate function to fetch updated list of groups user have joined */

    const currentUserId = currentUser?.id //current user id

    const handleToggle = () => {
        //a toggle button to set if the group is private
        setIsPrivate(!isPrivate);
    }

    /*a submit function that is called when user clicks on create button, a POST 
    request with relative payload is send at specified endpoint. A success
    notification is received if the request is successful*/
    const handleSubmit = async () => {
        try {

            setLoading(true);

            if (status == 'unauthenticated') {
                openLoginModal();
            }

            const request = await axios.post('/api/group', {
                groupName, description, groupAvatar, isPrivate, subject, currentUserId
            }) //POST Request at the specified endpoint

            if (request.status === 200) {
                successNotification('Group Successfully Created');
                updateGroupList(); //update group list
                updateGroupJoined(); //update list of groups user has joined
                setLoading(false);
                onClose(); //close the modal
            }

            //reset the state variable values
            setGroupName('');
            setDescription('');
            setGroupAvatar('');
            setIsPrivate(false);
            setSubject('');

        } catch (error) {

            //handle relative error and display error notification

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

    /*Body of the modal */
    const modalBody: React.ReactNode = (
        <div className='flex flex-col items-start gap-y-5 mt-2'>

            {/*Dropzone to upload file for group avatar */}
            <ImageUpload
                value={groupAvatar}
                disabled={loading}
                onChange={(image) => setGroupAvatar(image)}
                label='Upload Avatar for Group'
            />

            {/*Name of study group */}
            <Input
                label='Name of Study Group'
                value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
                disabled={loading}
            />

            <div className='flex flex-col items-start gap-y-2 w-full'>

                {/*Description */}
                <p className='lg:text-lg font-medium'>
                    Description
                </p>
                <div className='flex flex-col items-start w-full'>
                    <textarea
                        className="w-full min-h-[100px] p-2 overflow-auto rounded-lg 
                    border outline-none focus:border-[#1abc9c] disabled:opacity-70
                    disabled:cursor-not-allowed"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Purpose of the Study Group"
                        maxLength={150}
                    />

                    {/*Maximum length of description */}
                    <p
                        className='text-xs self-end'>
                        <span className={`${description.length <= 150 ? 'text-green-500' : 'text-red-500'} `}>
                            {description.length}
                        </span>
                        /150
                    </p>
                </div>

            </div>

            {/*Subject */}
            <Input
                label='Subject in Focus'
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                disabled={loading}
                placeholder='Mathematics'
            />

            {/*Group Private */}
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