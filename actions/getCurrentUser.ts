/*A utility function designed to retrieve the current authenticated login user
from database using Prisma query */

import prisma from "@/libs/prismadb";
import getSession from "./getSession";

const getCurrentUser = async () => {
    try {
        const session = await getSession(); /*get the information of current
        session */

        if (!session?.user?.email) {
            /*If the session doesn't contain the email of currently login user,
            return nothing */
            return null;
        }


        const currentUser = await prisma.user.findUnique({
            where: {
                emailAddress: session.user.email,
            },
        }); /*find the authenticated user in the database using Prisma findUnique
        query which finds a unique data from the database */

        if (!currentUser) {
            return null;
        } /*If no login user, return nothing */

        return currentUser; //return the current login user detail

    } catch (error: any) {
        console.error('ERROR_GET_CURRENT_USER_ACTION_FUNCTION', error);
        return null;
    }
};

export default getCurrentUser;
