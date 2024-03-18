"use client"

import useSWR from "swr"
import fetcher from "@/libs/fetcher"
import { IAnswer } from "@/interface-d"

const useAnswerList = (questionId?: string) => {
    const url: string = `/api/forum/answer/${questionId}`

    const { data, isLoading, error, mutate } = useSWR<IAnswer[]>(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    return { data, isLoading, error, mutate }
}

export default useAnswerList;