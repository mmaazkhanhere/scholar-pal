/*A custom hook which is responsible for fetching the list of members associated with
a specific group ID */

"use client"

import { IMembership } from "@/interface-d";
import fetcher from "@/libs/fetcher"
import useSWR from "swr"

const useGroupMembers = (groupId?: string) => {

    const url: string = `/api/group/group-members/${groupId}`;

    const { data, error, isLoading, mutate } = useSWR<IMembership[]>(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    return { data, error, isLoading, mutate };
}

export default useGroupMembers;