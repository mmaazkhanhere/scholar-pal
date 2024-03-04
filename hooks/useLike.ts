/*a custom hook that is designed for managing like interaction on a post
within a React application. It encapsulates the logic for liking or unlike a
post , updating the like count */

import { useState, useCallback, useEffect } from 'react';

import axios from 'axios';

import { IPost, IUser } from '@/interface-d';


const useLike = (post: IPost, currentUser: IUser, setIsLoading: (loading: boolean) => void) => {

    /*A boolean state that indicates whether the current user has liked the post
    and its initial value is determine by checking the current user id in
    the like list */
    const [isLiked, setIsLiked] = useState(post?.likedBy?.includes(currentUser?.id));

    //number of like the post have with initial value set to that of likes received by post
    const [likeCount, setLikeCount] = useState(post.likedBy?.length || 0);


    useEffect(() => {
        // Update the isLiked state based on the current post data
        setIsLiked(post.likedBy?.includes(currentUser.id));
        // Also update the likeCount based on current post data
        setLikeCount(post.likedBy?.length || 0);
    }, [post, currentUser.id]);


    /* the function is called when the user like the post. Before making an 
    request, it changes the value of isLiked state providing an immediate feedback
    to the user, making the UI more responsive. It then make an HTTP POST request to
    update post like field
     */
    const toggleLike = useCallback(async () => {

        const updatedIsLiked = !isLiked; //change the value of isLiked

        const updatedLikeCount = updatedIsLiked ? likeCount + 1 : likeCount - 1;
        /*If it is liked, the count is increased by 1 else decreased by 1*/

        setIsLiked(updatedIsLiked); //state variables are updated
        setLikeCount(updatedLikeCount);

        try {
            setIsLoading(true);

            await axios.post('/api/posts/like', {
                postId: post.id,
                userId: currentUser.id,
            });

        } catch (error) {

            setIsLiked(!updatedIsLiked); // Revert to previous state
            setLikeCount(likeCount); // Revert to the actual count before the optimistic update

            console.error('ERROR_LIKE_HOOK:', error);

        } finally {
            setIsLoading(false);
        }

    }, [isLiked, likeCount, post.id, currentUser.id, setIsLoading]);

    return { isLiked, toggleLike, likeCount }; /*return the isLiked state,
    function to toggle the like and total number of likes received */
};

export default useLike;
