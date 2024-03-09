import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {

    const groupIdEncoded = await request.nextUrl.searchParams.get('groupId');
    const groupId = decodeURIComponent(groupIdEncoded!)

    try {

        if (!groupId) {
            return new NextResponse('Missing groupId', { status: 404 });
        }

        const group = await prismadb.studyGroup.findUnique({
            where: {
                id: groupId,
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                members: true,
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