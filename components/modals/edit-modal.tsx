'use client'

import useUser from '@/hooks/useUser';
import React, { useCallback, useEffect, useState } from 'react'
import ImageUpload from '../image-upload';
import Input from '../input';
import Modal from '../modal';
import useEditModal from '@/hooks/useEditModal';
import axios from 'axios';
import { successNotification } from '@/helpers/success-notification';
import useLoginModal from '@/hooks/useLoginModal';
import { errorNotification } from '@/helpers/error-notification';
import ToggleButton from '../toggle-button';

type Props = {}

const EditModal = (props: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [age, setAge] = useState<number | undefined>(); // Made it explicitly optional
    const [fieldOfStudy, setFieldOfStudy] = useState<string>('');
    const [profilePicture, setProfilePicture] = useState<string>('');
    // Additional states
    const [linkedInProfile, setLinkedInProfile] = useState<string>('');
    const [facebookProfile, setFacebookProfile] = useState<string>('');
    const [twitterProfile, setTwitterProfile] = useState<string>('');
    const [tutoringAvailable, setTutoringAvailable] = useState<boolean | undefined>(false);

    const { user, mutate } = useUser();
    const handleEditModal = useEditModal()
    const handleLoginModal = useLoginModal();

    useEffect(() => {
        setName(user?.name as string);
        setProfilePicture(user?.profilePicture as string);
    }, [user?.name, user?.profilePicture])


    const onSubmit = useCallback(async () => {

        try {
            setIsLoading(true);
            const request = await axios.patch('/api/user', {
                name, bio, age,
                fieldOfStudy, profilePicture, linkedInProfile, facebookProfile,
                twitterProfile, tutoringAvailable
            })

            if (request.status == 200) {
                setIsLoading(false);
                successNotification('Profile successfully updated');
                mutate();
                setName('');
                setBio('');
                setFieldOfStudy('');
                setProfilePicture('');
                setLinkedInProfile('');
                setFacebookProfile('');
                setTwitterProfile('');
                handleEditModal.onClose();
            }

        } catch (error) {
            setIsLoading(false);
            console.error('UPDATE_PROFILE_ERROR', error);
            if (axios.isAxiosError(error) && error.response?.status == 401) {
                handleLoginModal.onOpen()
            }
            else if (axios.isAxiosError(error) && error.response?.status == 400) {
                errorNotification('Missing details')
            }
            else {
                errorNotification('Something went wrong')
            }
        } finally {
            setIsLoading(false);
        }

    }, [age, bio, facebookProfile, fieldOfStudy, handleEditModal, handleLoginModal, linkedInProfile, mutate, name, profilePicture, tutoringAvailable, twitterProfile])

    const toggleTutor = () => {
        setTutoringAvailable(!tutoringAvailable);
    }

    const modalBody: React.ReactNode = (
        <div className='flex flex-col gap-y-3'>

            {/* Image*/}
            <ImageUpload
                value={profilePicture}
                disabled={isLoading}
                onChange={(image) => setProfilePicture(image)}
                label='Upload Profile Picture'
            />

            {/* Name*/}
            <Input
                label='Name'
                onChange={(event) => setName(event.target.value)}
                disabled={isLoading}
                value={name}
            />

            {/* Bio*/}
            <Input
                label='Short Bio'
                onChange={(event) => setBio(event.target.value)}
                disabled={isLoading}
                value={bio}
            />

            {/* Age*/}
            <Input
                label='Age'
                onChange={(event) => setAge(parseInt(event.target.value))}
                disabled={isLoading}
                value={age}
            />

            {/* Field of study*/}
            <Input
                label='Field of Study'
                onChange={(event) => setFieldOfStudy(event.target.value)}
                disabled={isLoading}
                value={fieldOfStudy}
            />

            {/* Facebook Profile Link*/}
            <Input
                label='Facebook Profile Link'
                onChange={(event) => setFacebookProfile(event.target.value)}
                disabled={isLoading}
                value={facebookProfile}
            />

            {/* Twitter Profile Link*/}
            <Input
                label='Twitter Profile Link'
                onChange={(event) => setTwitterProfile(event.target.value)}
                disabled={isLoading}
                value={twitterProfile}
            />


            {/* LinkedIn Profile Link*/}
            <Input
                label='LinkedIn Profile Link'
                onChange={(event) => setLinkedInProfile(event.target.value)}
                disabled={isLoading}
                value={linkedInProfile}
            />

            <div className="flex items-center gap-x-4 py-4">
                <span className='lg:text-lg font-medium'>Available for Tutoring:</span>
                <ToggleButton
                    tutoringAvailable={tutoringAvailable!}
                    onChange={toggleTutor}
                />
            </div>

        </div>

    )

    return (
        <div>
            <Modal
                disabled={isLoading}
                title='Edit Profile '
                onClose={handleEditModal.onClose}
                isOpen={handleEditModal.isOpen}
                body={modalBody}
                onSubmit={onSubmit}
                buttonLabel='Submit'
            />
        </div>
    )
}

export default EditModal