import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'
import getCurrentUser from "@/actions/getCurrentUser";

export const PATCH = async (request: NextRequest) => {
    const body = await request.json();
    const { groupId, targetUserId } = body;
    const currentUser = await getCurrentUser();

    try {
        if (!groupId || !targetUserId || !currentUser) {
            return new NextResponse('Missing details', { status: 400 })
        }

        const group = await prismadb.studyGroup.findUnique({
            where: {
                id: groupId,
            },
            select: {
                groupName: true,
                creatorId: true,
                pendingMembers: true,
            }
        })

        const targetUser = await prismadb.user.findUnique({
            where: {
                id: targetUserId,
            }
        })
        if (!targetUser) {
            return new NextResponse('Cannot find ')
        }

        let pendingMembersList = group?.pendingMembers;

        if (pendingMembersList?.includes(targetUserId)) {
            pendingMembersList = pendingMembersList.filter(member => member != targetUserId)
        }

        const updatedGroup = await prismadb.studyGroup.update({
            where: { id: groupId },
            data: { pendingMembers: pendingMembersList },
        });

        await prismadb.notification.create({
            data: {
                userId: currentUser?.id as string,
                body: `${targetUser?.name} has joined your group ${group?.groupName}`,
                type: 'GROUP_JOINED',
                senderId: targetUser?.id as string
            }
        });

        const membership = await prismadb.membership.deleteMany({
            where: {
                userId: targetUserId as string,
            },
        });

        // Check if membership exists
        if (!membership) {
            throw new Error('Membership not found');
        }

        // Update the membership
        await prismadb.notification.create({
            data: {
                userId: currentUser.id as string,
                senderId: targetUser.id,
                body: `${targetUser.name} has joined your study group ${group?.groupName}`,
                type: 'GROUP_JOINED',
            },
        })

        await prismadb.user.update({
            where: {
                id: group?.creatorId
            },
            data: {
                hasNotifications: true,
            }
        }) //the user has now a notification

        return NextResponse.json(updatedGroup)

    } catch (error) {
        console.error('ACCEPT_REQUEST_API_ERROR', error)
        return new NextResponse('Error occurred', { status: 500 });
    }
}