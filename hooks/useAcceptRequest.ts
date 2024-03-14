/*A custom hook is designed to handle a user’s request to join a group in an 
application. The hook uses the useSWR function from the swr library to send 
a request to a specific API endpoint, constructed using the provided userId */

"use client"

import useSWR from "swr"
import fetcher from "@/libs/fetcher"

const useAcceptRequest = (userId?: string) => {
    const url: string = `/groups/join/${userId}`

    const { data, isLoading, error, mutate } = useSWR(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnReconnect: false,
    })

    return { data, isLoading, error, mutate };
}

export default useAcceptRequest;