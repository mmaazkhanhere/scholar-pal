import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { IPost, IUser } from '@/interface-d';

// Custom hook definition
const useLike = (post: IPost, currentUser: IUser, setIsLoading: (loading: boolean) => void) => {
    const [isLiked, setIsLiked] = useState(post?.likedBy?.includes(currentUser?.id));
    const [likeCount, setLikeCount] = useState(post.likedBy?.length || 0);

    useEffect(() => {
        // Update the isLiked state based on the current post data
        setIsLiked(post.likedBy?.includes(currentUser.id));
        // Also update the likeCount based on current post data
        setLikeCount(post.likedBy?.length || 0);
    }, [post, currentUser.id]);

    const toggleLike = useCallback(async () => {
        // Optimistically update the UI before making the API request
        const updatedIsLiked = !isLiked;
        const updatedLikeCount = updatedIsLiked ? likeCount + 1 : likeCount - 1;

        setIsLiked(updatedIsLiked);
        setLikeCount(updatedLikeCount);

        try {
            setIsLoading(true);
            await axios.post('/api/posts/like', {
                postId: post.id,
                userId: currentUser.id,
            });
        } catch (error) {
            // Revert optimistic update in case of an error
            setIsLiked(!updatedIsLiked); // Revert to previous state
            setLikeCount(likeCount); // Revert to the actual count before the optimistic update
            console.error('Error liking/unliking post:', error);
        } finally {
            setIsLoading(false);
        }
    }, [isLiked, likeCount, post.id, currentUser.id, setIsLoading]);

    return { isLiked, toggleLike, likeCount };
};

export default useLike;
