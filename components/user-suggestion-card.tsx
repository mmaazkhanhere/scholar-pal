/*A react component designed to display a suggestion for user and showcase
basic information about a suggested user, including their avatar, name, field
of study and user name */

import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Avatar from './avatar'

import useLoginModal from '@/hooks/useLoginModal'

import { IUser } from '@/interface-d'

type Props = {
    suggestUser: IUser
}

const UserSuggestionCard = ({ suggestUser }: Props) => {

    const router = useRouter()
    const { onOpen } = useLoginModal(); //open login modal
    const { status } = useSession() //get the current user authentication status

    if (!suggestUser) {
        //if no user for suggestion, display nothing
        return null;
    }

    /*function that is called when user clicks on the card. It checks if the user
    is authenticated. If not a login modal is opened else user is navigated
    to the suggested user profile*/
    const onClick = () => {
        if (status == 'unauthenticated') {
            onOpen();
        }
        else {
            router.push(`/user/${suggestUser.id}`)
        }
    }


    return (
        <section
            onClick={onClick}
            className='flex flex-col items-start p-2 w-full cursor-pointer'
        >
            <div className='flex items-start justify-start gap-x-4'>
                {/*Avatar */}
                <div>
                    <Avatar
                        isNavigable={false}
                        isSuggestionAvatar
                        userId={suggestUser.id}
                        profilePicture={suggestUser.profilePicture}
                    />
                </div>

                <div className='flex flex-col items-start'>
                    <div className='flex items-center gap-x-2'>

                        {/*Suggested User name */}
                        <p className='lg:text-lg font-bold'>
                            {suggestUser.name}
                        </p>

                        {/*Suggested User field of study */}
                        <span
                            className='text-sm lg:text-base text-[#1abc9c] 
                            font-medium'
                        >
                            {suggestUser.fieldOfStudy}
                        </span>
                    </div>

                    {/*username of the suggested user */}
                    <p className='text-sm lg:text-base text-[#343a40]/60 font-medium'>
                        @{suggestUser.username}
                    </p>
                </div>
            </div>

        </section>
    )
}

export default UserSuggestionCard