"use client"

import { INotification } from "@/interface-d"
import fetcher from "@/libs/fetcher"
import useSWR from "swr"

const useNotifications = (userId?: string) => {

    const url = `/api/notifications/${userId}`

    const { data, error, isLoading, mutate } = useSWR<INotification[]>(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnReconnect: false,
    })

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useNotifications