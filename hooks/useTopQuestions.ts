"use client"

import useSWR from "swr"
import fetcher from "@/libs/fetcher"
import { IQuestion } from "@/interface-d"

const useTopQuestion = () => {

    const url = '/api/forum/topQuestions'
    const { data, isLoading, error, mutate } = useSWR<IQuestion[]>(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    return { data, isLoading, error, mutate }

}

export default useTopQuestion