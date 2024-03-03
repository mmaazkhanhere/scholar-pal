import { NextResponse, NextRequest } from "next/server";
import prismadb from "@/libs/prismadb"

export const GET = async (request: NextRequest) => {

    try {

        const currentUserId = await request.nextUrl.pathname.split('/').pop();

        let suggestedUsers

        if (!currentUserId) {
            suggestedUsers = await prismadb.user.findMany({
                take: 5,
                select: { name: true, username: true, profilePicture: true },
            });
        }
        else {
            suggestedUsers = await prismadb.user.findMany({
                where: {
                    NOT: {
                        id: currentUserId,
                    },
                },
                take: 3,
                select: { name: true, username: true, profilePicture: true },
            });
        }

        return NextResponse.json(suggestedUsers);

    } catch (error) {
        console.error("ERROR_GET_API_SUGGESTED_USERS", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }

}