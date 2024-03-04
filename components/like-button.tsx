/*A react component that allow users to like or unlike a post in React application */

import React, { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

import useLoginModal from '@/hooks/useLoginModal';

import { IPost, IUser } from '@/interface-d';

import { GoHeart, GoHeartFill } from 'react-icons/go';

import { errorNotification } from '@/helpers/error-notification';


type Props = {
    post: IPost, //post data
    user: IUser, //current login user data
    isLoading?: boolean,
    setIsLoading: (isLoading: boolean) => void; //set the loading state of like button
    handleLike: () => void; //function from the post card component to handle the like button
};

const LikeButton = ({ post, user, isLoading, setIsLoading, handleLike }: Props) => {

    const { status } = useSession(); //status of the user accessing the component
    const { onOpen } = useLoginModal(); //extract only specific function to open the login modal

    const [isLiked, setIsLiked] = useState(post?.likedBy?.includes(user?.id));
    /*a state variable that checks if the current user have already liked the post
    by checking if it exist in the likedBy array. */

    useEffect(() => {
        // Update isLiked state when currentUser or post.likedBy changes
        setIsLiked(post?.likedBy?.includes(user?.id));
    }, [user.id, post.likedBy]);

    const toggleLike = useCallback(async () => {
        try {

            setIsLoading(true); //the loading state of the button is set to true

            await axios.post('/api/posts/like', {
                postId: post.id,
                userId: user.id,
            }); //make an HTTP POST request along with post id and user id

            handleLike(); /*This function updates the number of like in the
            parent post card component */

        } catch (error) {

            setIsLiked(!isLiked);/*If any error occurs, the 
            previous state is restored. */

            if (axios.isAxiosError(error) && error.response?.status === 500) {
                errorNotification('Something went wrong');
                console.error('LIKE_BUTTON_ERROR', error);
            } //error notification

        } finally {
            setIsLoading(false); //the loading state is returned to false
        }
    }, [handleLike, isLiked, post.id, setIsLoading, user.id]);

    const onClick = useCallback(async () => {

        if (status === 'unauthenticated') {
            /*Checks if the user is authenticated or not. If the user is not
            authenticated, the login modal is open to make the user login. This
            indicates that only logged in user can like a post */
            onOpen();
            return;
        }

        setIsLiked(!isLiked); /*It updates the previous
        status of like. If the previous state was false (that the post was not
        liked), it updates it to true. If the was previous state was true (it
        was liked by the user), it updates it to false */

        toggleLike(); // Perform the like/unlike action

    }, [status, isLiked, toggleLike, onOpen]);

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
