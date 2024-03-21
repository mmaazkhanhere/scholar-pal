/*a custom hook that is responsible for fetching the list of answers associated
with a specific question id */

"use client"

import useSWR from "swr"
import fetcher from "@/libs/fetcher"
import { IAnswer } from "@/interface-d"

const useAnswerList = (questionId?: string) => {

    const url: string = `/api/forum/answer/${questionId}` //api endpoint to fetch answer list

    const { data, isLoading, error, mutate } = useSWR<IAnswer[]>(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }); //data will not be automatically revalidated in above cases

    return { data, isLoading, error, mutate }
}

export default useAnswerList;