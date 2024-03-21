/*A custom hook that fetches the list of pending users of a group given the
groupId which is used in fetching */

"use client"

import fetcher from "@/libs/fetcher"
import useSWR from "swr"

const usePendingUsers = (groupId?: string) => {

    const url: string = `/api/group/pending-users/${groupId}`;

    const { data, error, isLoading, mutate } = useSWR<string[]>(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    });

    return { data, error, isLoading, mutate };
}

export default usePendingUsers;