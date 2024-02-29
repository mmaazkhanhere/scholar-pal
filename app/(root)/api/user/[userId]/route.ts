import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {
    try {
        const userId = request.nextUrl.pathname.split('/').pop();
        if (!userId) {
            return new NextResponse('UserId is missing', { status: 400 })
        }

        const user = await prismadb.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            return new NextResponse('User not found', { status: 404 })
        }

        return NextResponse.json(user)

    } catch (error) {
        console.error('GET_USER_ID_ERROR', error);
        return new NextResponse('Internal Sever Error', { status: 500 })
    }
}