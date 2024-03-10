import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const GET = async (request: NextRequest) => {
    try {

        const groupList = await prismadb.studyGroup.findMany({
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

        if (!groupList) {
            return new NextResponse('No Groups Found', { status: 400 })
        }

        return NextResponse.json(groupList);

    } catch (error) {
        console.error('GET_ALL_STUDY_GROUPS_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export const POST = async (request: NextRequest) => {

    const body = await request.json();
    const { groupName, description, groupAvatar, isPrivate, subject, currentUserId } = body;

    try {

        if (!groupName || !description || !subject || !currentUserId) {
            return new NextResponse('Missing Required Fields', { status: 400 })
        }

        const studyGroup = await prismadb.studyGroup.create({
            data: {
                groupName: groupName,
                description: description,
                private: isPrivate,
                groupAvatar: groupAvatar,
                subject: subject,
                creatorId: currentUserId
            }
        })

        await prismadb.membership.create({
            data: {
                userId: currentUserId,
                groupId: studyGroup.id,
                status: "ACCEPTED"
            }
        });


        return NextResponse.json(studyGroup)

    } catch (error) {

        console.error('STUDY_GROUP_CREATE_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}