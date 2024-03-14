/*The provided JavaScript code is a custom React hook named useGroup. 
This hook is designed to fetch data about a specific study group in an application.  */

"use client";

import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import { IStudyGroup } from "@/interface-d";

const useGroup = (groupId: string) => {

    const url: string = `/api/group/${groupId}`

    const { data, isLoading, error, mutate } = useSWR<IStudyGroup>(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return { data, isLoading, error, mutate };
}

export default useGroup;