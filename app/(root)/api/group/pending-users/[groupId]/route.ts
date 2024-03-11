import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {

    const groupId = request.nextUrl.pathname.split('/').pop();

    try {
        if (!groupId) {
            return new NextResponse('Missing groupId', { status: 400 })
        };

        const pendingMembers = await prismadb.studyGroup.findUnique({
            where: {
                id: groupId,
            },
            select: {
                pendingMembers: true,
            }
        });

        return NextResponse.json(pendingMembers?.pendingMembers)

    } catch (error) {
        console.error('GET_PENDING_USERS_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}