/*A custom react hook that fetches a list uof groups user have joined. */

"use client"

import { IStudyGroup } from "@/interface-d";
import fetcher from "@/libs/fetcher"
import useSWR from 'swr'

const useGroupJoined = (userId?: string) => {

    const url = `/api/group/user/${userId}`;

    const { data, isLoading, error, mutate } = useSWR<IStudyGroup[]>(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })


    return { data, isLoading, error, mutate }
}

export default useGroupJoined;