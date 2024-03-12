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
                members: true,
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

        // Remove the user from the pending list
        if (pendingMembersList?.includes(targetUserId)) {
            pendingMembersList = pendingMembersList.filter(member => member !== targetUserId);
            await prismadb.studyGroup.update({
                where: {
                    id: groupId,
                },
                data: {
                    pendingMembers: pendingMembersList,
                },
            });
        }

        await prismadb.membership.deleteMany({
            where: {
                userId: targetUserId,
                groupId: groupId,
            },
        });

        // Create a new membership status for the user
        const membership = await prismadb.membership.create({
            data: {
                userId: targetUserId,
                groupId: groupId,
                status: 'ACCEPTED',
            },
        });


        await prismadb.notification.create({
            data: {
                userId: currentUser?.id,
                body: `${targetUser?.name} has joined your group ${group?.groupName}`,
                type: 'GROUP_JOINED',
                senderId: targetUser?.id
            }
        });

        await prismadb.user.update({
            where: {
                id: group?.creatorId
            },
            data: {
                hasNotifications: true,
            }
        }) //the user has now a notification

        return NextResponse.json(membership)

    } catch (error) {
        console.error('ACCEPT_REQUEST_API_ERROR', error)
        return new NextResponse('Error occurred', { status: 500 });
    }
}