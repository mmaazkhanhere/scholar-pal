/*a custom hook that fetches list of all the group created */

"use client"

import useSWR from "swr"
import fetcher from "@/libs/fetcher"
import { IStudyGroup } from "@/interface-d"

export const useGroups = () => {

    const url: string = '/api/group'

    const { data, error, isLoading, mutate } = useSWR<IStudyGroup[]>(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return { data, error, isLoading, mutate };
}