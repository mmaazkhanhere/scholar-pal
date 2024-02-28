'use client'

import useUser from '@/hooks/useUser';
import React, { useEffect, useState } from 'react'

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
    const [twitterUrl, setTwitterUrl] = useState<string>('');
    const [tutoringAvailable, setTutoringAvailable] = useState<boolean | undefined>();

    const { user } = useUser();

    useEffect(() => {
        setName(user?.name as string);
        setProfilePicture(user?.profilePicture as string);
    }, [user?.name, user?.profilePicture])

    return (
        <div>

        </div>
    )
}

export default EditModal