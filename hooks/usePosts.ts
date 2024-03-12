/*A custom hook is a React hook designed to fetch posts data, either all posts 
or specific to a user, from an API endpoint using the SWR */

"use client"

import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

const usePosts = (userId?: string) => {

    const url: string = userId ? `/api/posts/user/${userId}` : '/api/posts';
    //api endpoint depending on the availability of the user id

    const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }); //fetch posts

    return {
        data, error, isLoading, mutate //return the post and function to refetch the posts
    }
};

export default usePosts;