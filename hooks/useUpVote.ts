"use client"

import useSWR from "swr"
import fetcher from "@/libs/fetcher"

const useUpVote = (answerId?: string) => {

    const url: string = `/api/forum/upVote/${answerId}`

    const { data, isLoading, error, mutate } = useSWR<string[]>(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return { data, error, isLoading, mutate };
}

export default useUpVote;