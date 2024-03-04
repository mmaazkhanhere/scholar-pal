/*The useUser custom hook is a utility for fetching user data. It utilizes the 
SWR library for data fetching  */
import useSWR from "swr";

import { useSession } from "next-auth/react";

import { IUser } from '@/interface-d';

import fetcher from "@/libs/fetcher";

const useUser = (userId?: string) => {

    const { data: session, status } = useSession(); /*hook from next auth that
    provides session management and i used to get current authentication session */

    const userEmail = session?.user?.email //extract the user email from the session

    const fetchUrl = userId
        ? `/api/user/${userId}` // Path to fetch data for a specific user by userId
        : (session && status === "authenticated" ? `/api/user/?userEmail=${userEmail}` : null); // Path to fetch current user data

    const { data, error, mutate } = useSWR<IUser | null>(fetchUrl, fetcher); //fetch the user

    return {
        user: data, //return the user
        isLoading: !error && !data,
        isError: error,
        mutate //function to re-fetch the user
    };
};

export default useUser;
