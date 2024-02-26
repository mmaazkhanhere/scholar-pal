import React, { useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

import useLoginModal from '@/hooks/useLoginModal';

import { IPost, IUser } from '@/interface-d';

import { GoHeart, GoHeartFill } from 'react-icons/go';

import { errorNotification } from '@/helpers/error-notification';


type Props = {
    post: IPost,
    currentUser: IUser,
    setIsLoading: (isLoading: boolean) => void;
    handleLike: () => void;
};

const LikeButton = ({ post, currentUser, setIsLoading, handleLike }: Props) => {

    const session = useSession();
    const handleLoginModal = useLoginModal();

    const [isLiked, setIsLiked] = useState(post?.likedBy?.includes(currentUser?.id));

    const onClick = useCallback(async () => {
        if (session.status === 'unauthenticated') {
            handleLoginModal.onOpen();
            return;
        }

        // Optimistically update the UI
        setIsLiked((prevIsLiked) => !prevIsLiked);

        try {
            setIsLoading(true);
            await axios.post('/api/posts/like', {
                postId: post.id,
                userId: currentUser.id,
            });

            // Call onLike to update parent component's state after successful like/unlike
            handleLike();
        } catch (error) {
            // Revert optimistic update in case of an error
            setIsLiked((prevIsLiked) => !prevIsLiked);
            if (axios.isAxiosError(error) && error.response?.status === 500) {
                errorNotification('Something went wrong');
                console.error('LIKE_BUTTON_ERROR', error);
            }
        } finally {
            setIsLoading(false);
        }
    }, [session.status, handleLoginModal, setIsLoading, post.id, currentUser.id, handleLike, isLiked]); // Updated dependencies for useCallback

    return (
        <button
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
