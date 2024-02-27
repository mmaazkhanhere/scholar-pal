import useSWR from "swr";
import { useSession } from "next-auth/react";
import { IUser } from '@/interface-d';
import fetcher from "@/libs/fetcher";

const useUser = () => {
    const { data: session, status } = useSession();

    const userEmail = session?.user?.email

    // Here, we use TypeScript generics to specify that the fetcher will return IUser or null
    const { data, error, mutate } = useSWR<IUser | null>(session && status === "authenticated" ? `/api/user/?userEmail=${userEmail}` : null, fetcher);

    return {
        user: data, // TypeScript now knows data is IUser | null
        isLoading: !error && !data,
        isError: error,
        mutate
    };
};

export default useUser;
