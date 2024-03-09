"use client";

import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useGroup = (groupId: string) => {

    const encodedGroupId = encodeURIComponent(groupId);
    const url: string = `/api/group?groupId=${groupId}`

    const { data, isLoading, error, mutate } = useSWR(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return { data, isLoading, error, mutate };
}

export default useGroup;