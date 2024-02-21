
import prisma from "@/libs/prismadb";
import getSession from "./getSession";

const getCurrentUser = async () => {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }


        const currentUser = await prisma.user.findUnique({
            where: {
                emailAddress: session.user.email,
            },
        });

        if (!currentUser) {
            return null;
        }

        return currentUser;
    } catch (error: any) {
        console.error(error);
        return null;
    }
};

export default getCurrentUser;
