"use client"

import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const usePosts = (userId?: string) => {
    const url: string = userId ? `/api/posts/user/${userId}` : '/api/posts';

    const { data, error, isLoading, mutate } = useSWR(url, fetcher);

    return {
        data, error, isLoading, mutate
    }
};

export default usePosts;