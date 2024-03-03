/*An API route to get a specific user. This api is used to display all the user
related data when navigated to their profile page */

import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {

    try {

        const userId = request.nextUrl.pathname.split('/').pop();
        //extracts the userId from the request url

        if (!userId) {
            //if userId does not exist then 400 status code is returned
            return new NextResponse('UserId is missing', { status: 400 })
        }

        //find the specific user by finding a unique user whose id matches the userId
        const user = await prismadb.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            //if userId does not exist then 404 status code is returned
            return new NextResponse('User not found', { status: 404 })
        }

        return NextResponse.json(user)// the user is returned in the json response

    } catch (error) {
        console.error('GET_USER_ID_ERROR', error);
        return new NextResponse('Internal Sever Error', { status: 500 })
    }
}