/*The useUsers custom hook is designed to fetch a list of user suggestions */

"use client"

import { IUser } from "@/interface-d";
import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useUsers = (currentUserId?: string) => {

    const apiEndpoint = `/api/user/suggestion/${currentUserId}` //api endpoint

    const { data, error, isLoading } = useSWR<IUser[]>(apiEndpoint, fetcher); /*
    fetch the user */

    return { data, error, isLoading }; //return the user

}

export default useUsers;