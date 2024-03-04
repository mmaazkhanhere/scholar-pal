/*This is an API route to suggest user  */

import { NextResponse, NextRequest } from "next/server";
import prismadb from "@/libs/prismadb"

export const GET = async (request: NextRequest) => {

    try {

        const currentUserId = await request.nextUrl.pathname.split('/').pop();
        //extract the currently sign in user id to whom the recommendations will be made

        let suggestedUsers;

        /*If there is no current user id, then return suggested users that 
        potentially can include the current user. This is for homepage when 
        a user is not logged in */
        if (!currentUserId || currentUserId === "undefined") {

            suggestedUsers = await prismadb.user.findMany({
                take: 3, //three users are selected
                select: { //data that is selected and returned
                    name: true,
                    username: true,
                    profilePicture: true,
                    id: true,
                    fieldOfStudy: true
                },
            });
        }
        else {
            suggestedUsers = await prismadb.user.findMany({
                where: {
                    NOT: {
                        id: currentUserId, //does not include the current user
                    },
                },
                take: 3, //suggest three user
                select: { //data is selected and returned along with the selected users
                    name: true,
                    username: true,
                    profilePicture: true,
                    id: true,
                    fieldOfStudy: true
                },
            });
        }

        return NextResponse.json(suggestedUsers); //return the suggested users

    } catch (error) {
        console.error("ERROR_GET_API_SUGGESTED_USERS", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }

}