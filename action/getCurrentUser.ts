import prisma from "@/libs/prismadb";
import getSession from "./getSession";


const getCurrentUser = async () => {
    try {

        const session = await getSession();
        console.log(session)

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                emailAddress: session.user.email,
            },
        });
        console.log(currentUser)

        if (!currentUser) {
            return null;
        }

        console.log(currentUser)
        return currentUser;

    } catch (error: any) {
        return null;
    }
};

export default getCurrentUser;