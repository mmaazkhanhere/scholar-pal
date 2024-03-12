import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {

    try {

        const groupId = request.nextUrl.pathname.split('/').pop();
        if (!groupId) {
            return new NextResponse('Missing groupId', { status: 400 })
        };

        const groupMembers = await prismadb.membership.findMany({
            where: {
                groupId: groupId,
                status: 'ACCEPTED', // Assuming you want only approved members
            },
        });

        return NextResponse.json(groupMembers.map(member => member.userId));

    } catch (error) {
        console.error('GET_GROUP_MEMBERS_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
