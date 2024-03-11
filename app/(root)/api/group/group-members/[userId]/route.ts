import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {

    const groupId = request.nextUrl.pathname.split('/').pop();

    try {

        if (!groupId) {
            return new NextResponse('Missing groupId', { status: 400 })
        };

        const groupMembers = await prismadb.studyGroup.findUnique({
            where: {
                id: groupId,
            },
            select: {
                members: true,
            }
        });

        console.log(groupMembers?.members);

        return NextResponse.json(groupMembers?.members)

    } catch (error) {
        console.error('GET_GROUP_MEMBERS_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }

}