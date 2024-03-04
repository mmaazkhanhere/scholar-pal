/*a custom hook to fetch comments on a post with id equal to postId using
SWR hook */

"use client"

import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useComments = (postId: string) => {

    const url: string = `/api/comment?postId=${postId}` //api end point to fetch comments

    const { data, error, isLoading, mutate } = useSWR(url, fetcher);

    return {
        data, error, isLoading, mutate //return the comments
    }
};

export default useComments;