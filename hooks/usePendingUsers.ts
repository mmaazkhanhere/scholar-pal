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