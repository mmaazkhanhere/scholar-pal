/*a custom hook that fetches list of down votes an answer has received given 
an answerId */

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