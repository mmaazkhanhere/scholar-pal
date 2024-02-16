import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/libs/prismadb";
import { authOptions } from "@/app/(root)/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await getServerSession(req, res, authOptions)

    if (!session?.user?.email) {
        throw new Error('Not signed in')
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            emailAddress: session.user.email
        }
    })

    if (!currentUser) {
        throw new Error('Not signed in')
    }

    return { currentUser }
}

export default serverAuth;