"use client"

import useSWR from "swr"
import fetcher from "@/libs/fetcher"
import { IQuestion } from "@/interface-d"

const useQuestion = (questionId?: string) => {

    const url = `/api/forum/question/${questionId}`

    const { data, isLoading, error, mutate } = useSWR<IQuestion>(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    return { data, isLoading, error, mutate };
}

export default useQuestion