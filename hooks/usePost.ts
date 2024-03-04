/*A custom hook is designed to fetch and manage data for a specific post and 
simplifies the process of loading a post's data, handling loading states, and 
dealing with potential errors*/

"use client"

import useSWR from "swr"
import fetcher from "@/libs/fetcher"

const usePost = (postId?: string) => {

    const url = postId ? `/api/posts/${postId}` : null;

    const { data, isLoading, error, mutate } = useSWR(url, fetcher,
        {
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        });

    return { data, isLoading, error, mutate };
}

export default usePost