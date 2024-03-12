"use client"

import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

const useGroupPosts = (groupId?: string) => {

    const url: string = `/api/group/posts/${groupId}`

    const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    return {
        data, error, isLoading, mutate
    }
};

export default useGroupPosts;