"use client"

import { IUser } from "@/interface-d";
import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useUsers = (currentUserId?: string) => {

    const apiEndpoint = `/api/user/suggestion/${currentUserId}`

    const { data, error, isLoading } = useSWR<IUser[]>(apiEndpoint, fetcher);

    return { data, error, isLoading };

}

export default useUsers;