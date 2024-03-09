import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libs/prismadb"

export const POST = async (request: NextRequest) => {

    const body = await request.json();
    const { currentUserId, groupId, groupCreatorId } = body;

    try {

        if (!currentUserId || !groupId || !groupCreatorId) {
            return new NextResponse('Missing required details', { status: 404 });
        }

        const currentUserData = await prismadb.user.findUnique({
            where: {
                id: currentUserId
            }
        })

        const groupCreatorDetail = await prismadb.user.findUnique({
            where: {
                id: groupCreatorId
            }
        })

        if (!currentUserData || !groupCreatorDetail) {
            return new NextResponse('Cannot find the users', { status: 404 })
        }

        const group = await prismadb.studyGroup.findUnique({
            where: {
                id: groupId
            },
            include: {
                members: true
            }
        });

        if (!group) {
            return new NextResponse('Cannot find the group', { status: 404 })
        }

        if (group?.members.includes(currentUserId)) {
            return new NextResponse('User already have joined the study group', { status: 404 });
        }

        let userMembership;

        if (group.private) {
            userMembership = await prismadb.membership.create({
                data: {
                    userId: currentUserId,
                    groupId: groupId,
                    status: 'PENDING'
                }
            });

            await prismadb.notification.create({
                data: {
                    userId: groupCreatorDetail.id,
                    body: `${currentUserData.name} has requested to join your study group ${group.groupName}`,
                    type: 'GROUP_JOIN_REQUEST'
                }
            });

        } else {
            userMembership = await prismadb.membership.create({
                data: {
                    userId: currentUserId,
                    groupId: groupId,
                    status: 'ACCEPTED'
                }
            });

            await prismadb.notification.create({
                data: {
                    userId: groupCreatorDetail.id,
                    body: `${currentUserData.name} has joined your study group ${group.groupName}`,
                    type: 'GROUP_JOIN_ACCEPTED'
                }
            });
        }

        return NextResponse.json(userMembership);

    } catch (error) {
        console.error("ERROR_GROUP_JOIN_API", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}