import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {

    const groupId = await request.nextUrl.pathname.split('/').pop();

    try {

        if (!groupId) {
            return new NextResponse('Missing groupId', { status: 404 });
        }

        const group = await prismadb.studyGroup.findUnique({
            where: {
                id: groupId,
            },
            include: {
                creator: true,
                members: {
                    include: {
                        user: true,
                    }
                },
                posts: true
            }
        })

        if (!group) {
            return new NextResponse('No Group Found', { status: 400 })
        }

        return NextResponse.json(group);

    } catch (error) {
        console.error('GET_SPECIFIC_GROUP_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}