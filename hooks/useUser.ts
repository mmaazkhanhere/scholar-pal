import useSWR from "swr";
import { useSession } from "next-auth/react";
import { IUser } from '@/interface-d';
import fetcher from "@/libs/fetcher";

const useUser = (userId?: string) => {
    const { data: session, status } = useSession();

    const userEmail = session?.user?.email

    const fetchUrl = userId
        ? `/api/user/${userId}` // Path to fetch data for a specific user by userId
        : (session && status === "authenticated" ? `/api/user/?userEmail=${userEmail}` : null); // Path to fetch current user data

    const { data, error, mutate } = useSWR<IUser | null>(fetchUrl, fetcher);

    return {
        user: data, // TypeScript now knows data is IUser | null
        isLoading: !error && !data,
        isError: error,
        mutate
    };
};

export default useUser;
