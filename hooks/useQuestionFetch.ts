/*A custom hook to fetch all the questions posted */

"use client"

import useSWR from "swr"
import fetcher from "@/libs/fetcher"
import { IQuestion } from "@/interface-d"

const useQuestionFetch = () => {
    const url: string = "/api/forum/question"

    const { data, isLoading, error, mutate } = useSWR<IQuestion[]>(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    return { data, isLoading, error, mutate }
}

export default useQuestionFetch;