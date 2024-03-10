"use client"

import fetcher from "@/libs/fetcher"
import useSWR from "swr"

const useNotifications = (userId?: string) => {

    const url = `/api/notifications/${userId}`

    const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnReconnect: false,
    })

    console.log(data)

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useNotifications