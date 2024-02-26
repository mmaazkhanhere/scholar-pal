import React, { useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

import useLoginModal from '@/hooks/useLoginModal';

import { IPost, IUser } from '@/interface-d';

import { GoHeart, GoHeartFill } from 'react-icons/go';

import { errorNotification } from '@/helpers/error-notification';


type Props = {
    post: IPost, //post data
    currentUser: IUser, //current login user data
    isLoading?: boolean,
    setIsLoading: (isLoading: boolean) => void; //set the loading state of like button
    handleLike: () => void; //function from the post card component to handle the like button
};

const LikeButton = ({ post, currentUser, isLoading, setIsLoading, handleLike }: Props) => {

    const session = useSession(); //session of the current login user
    const handleLoginModal = useLoginModal(); //custom hook to handle login modal

    const [isLiked, setIsLiked] = useState(post?.likedBy?.includes(currentUser?.id));
    /*a state variable that checks if the current user have already liked the post
    by checking if it exist in the likedBy array. */

    const onClick = useCallback(async () => {

        if (session.status === 'unauthenticated') {
            /*Checks if the user is authenticated or not. If the user is not
            authenticated, the login modal is open to make the user login. This
            indicates that only logged in user can like a post */
            handleLoginModal.onOpen();
            return;
        }

        setIsLiked((prevIsLiked) => !prevIsLiked); /*It updates the previous
        status of like. If the previous state was false (that the post was not
        liked), it updates it to true. If the was previous state was true (it
        was liked by the user), it updates it to false */

        try {

            setIsLoading(true); //the loading state of the button is set to true

            await axios.post('/api/posts/like', {
                postId: post.id,
                userId: currentUser.id,
            }); //make an HTTP POST request along with post id and user id

            handleLike(); /*This function updates the number of like in the
            parent post card component */

        } catch (error) {

            setIsLiked((prevIsLiked) => !prevIsLiked);/*If any error occurs, the 
            previous state is restored. */

            if (axios.isAxiosError(error) && error.response?.status === 500) {
                errorNotification('Something went wrong');
                console.error('LIKE_BUTTON_ERROR', error);
            } //error notification

        } finally {
            setIsLoading(false); //the loading state is returned to false
        }
    }, [session.status, handleLoginModal, setIsLoading, post.id, currentUser.id, handleLike]);

    return (
        <button
            disabled={isLoading}
            onClick={onClick}
            aria-label={isLiked ? 'Unlike' : 'Like'}
        >
            {
                isLiked ? (
                    <GoHeartFill
                        className="text-red-500 w-6 h-6 cursor-pointer 
                    hover:text-red-400 transition duration-300"
                    />
                ) : (
                    <GoHeart
                        className="w-6 h-6 cursor-pointer hover:text-black/80
                    transition duration-300"
                    />
                )
            }
        </button>
    );
};

export default LikeButton;
