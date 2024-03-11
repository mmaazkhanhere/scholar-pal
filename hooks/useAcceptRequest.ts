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