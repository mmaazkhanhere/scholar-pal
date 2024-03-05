import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const POST = async (request: NextRequest) => {

    const body = await request.json();
    const { groupName, description, groupAvatar, isPrivate, subject, currentUserId } = body;

    try {

        if (!groupName || !description || isPrivate || !subject || !currentUserId) {
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

        return NextResponse.json(studyGroup)

    } catch (error) {

        console.error('STUDY_GROUP_CREATE_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}