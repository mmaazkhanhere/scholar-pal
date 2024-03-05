//An edit modal component to update or edit the current user's profile

'use client'

import useUser from '@/hooks/useUser';
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';

import ImageUpload from '../image-upload';
import Input from '../input';
import Modal from '../modal';
import ToggleButton from '../toggle-button';

import useEditModal from '@/hooks/useEditModal';
import useLoginModal from '@/hooks/useLoginModal';

import { successNotification } from '@/helpers/success-notification';
import { errorNotification } from '@/helpers/error-notification';


type Props = {}

const EditModal = (props: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    //state variables for user details
    const [name, setName] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [age, setAge] = useState<number | undefined>();
    const [fieldOfStudy, setFieldOfStudy] = useState<string>('');
    const [profilePicture, setProfilePicture] = useState<string>('');
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
        setAge(user?.age as number);
        setBio(user?.bio as string);
        setFieldOfStudy(user?.fieldOfStudy as string);
        setLinkedInProfile(user?.linkedInProfile as string);
        setFacebookProfile(user?.facebookProfile as string);
        setTwitterProfile(user?.twitterUrl as string);
        setTutoringAvailable(user?.tutoringAvailable)
    }, [user?.age, user?.bio, user?.facebookProfile, user?.fieldOfStudy, user?.linkedInProfile, user?.name, user?.profilePicture, user?.tutoringAvailable, user?.twitterUrl]) /*assign the user name and profile
    picture on initial render*/


    /*function that is called when user submit the modal. It make a PATCH request
    and pass all the user data to update it. After successful updating, all
    teh state variables are returned to initial state (empty strings mostly).
    A success notification is displayed for successful update. All the related
    errors are handled correctly. */

    const onSubmit = useCallback(async () => {

        try {

            setIsLoading(true);//loading state is state indicating process in progress

            const request = await axios.patch('/api/user', {
                name, bio, age,
                fieldOfStudy, profilePicture, linkedInProfile, facebookProfile,
                twitterProfile, tutoringAvailable
            }) //a PATCH request with related data

            if (request.status == 200) {//if successful request

                setIsLoading(false);

                successNotification('Profile successfully updated');//success notification
                mutate(); //manually refetch the updated user profile

                //reset the state variables vales
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

            console.error('UPDATE_PROFILE_ERROR', error);

            if (axios.isAxiosError(error) && error.response?.status == 401) {
                handleLoginModal.onOpen() /*if user is not authenticated, open the
                login modal */
            }
            else if (axios.isAxiosError(error) && error.response?.status == 400) {
                errorNotification('Missing details') //if details are missing
            }
            else {
                errorNotification('Something went wrong') //error notification
            }
        } finally {
            setIsLoading(false); //set the loading state to false indicate completion
        }

    }, [age, bio, facebookProfile, fieldOfStudy, handleEditModal, handleLoginModal, linkedInProfile, mutate, name, profilePicture, tutoringAvailable, twitterProfile])


    //function to toggle the tutor availability
    const toggleTutor = () => {
        setTutoringAvailable(!tutoringAvailable); /*If it is true, change it to 
        false and vice versa */
    }

    //the content of the modal
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
                    variableToToggle={tutoringAvailable!}
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