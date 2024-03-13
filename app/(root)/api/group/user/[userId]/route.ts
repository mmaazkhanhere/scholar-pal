import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {

    const userId = request.nextUrl.pathname.split('/').pop();

    try {
        if (!userId) {
            return new NextResponse('Missing user id', { status: 400 })
        }

        const groups = await prismadb.studyGroup.findMany({
            where: {
                members: {
                    some: {
                        userId: userId
                    }
                }
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        username: true,
                    }
                },
                members: true,
            }
        })

        return NextResponse.json(groups);

    } catch (error) {
        console.error('GET_GROUP_CREATED_BY_USER_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }

}