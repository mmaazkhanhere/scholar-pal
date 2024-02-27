import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'


export const GET = async (request: NextRequest) => {

    try {

        const userEmail = request.nextUrl.searchParams.get('userEmail')

        if (!userEmail) {
            return new NextResponse('No user email', { status: 404 })
        }

        const currentUser = await prismadb.user.findUnique({
            where: {
                emailAddress: userEmail
            },
        })

        if (!currentUser) {
            return new NextResponse('No user', { status: 404 });
        }

        return NextResponse.json(currentUser);

    } catch (error) {
        console.error('ERROR_GET_USER', error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }

}