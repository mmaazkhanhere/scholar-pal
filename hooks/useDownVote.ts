"use client"

import useSWR from "swr"
import fetcher from "@/libs/fetcher"

const useDownVote = (answerId?: string) => {

    const url: string = `/api/forum/downVote/${answerId}`

    const { data, isLoading, error, mutate } = useSWR<string[]>(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return { data, error, isLoading, mutate };
}

export default useDownVote;