import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libs/prismadb"
import { MembershipStatus, NotificationType } from "@prisma/client";

export const POST = async (request: NextRequest) => {

    const body = await request.json();
    const { currentUserId, groupId, groupCreatorId } = body;

    try {

        if (!currentUserId || !groupId || !groupCreatorId) {
            //handle missing data 
            return new NextResponse('Missing required details', { status: 404 });
        }

        const currentUserData = await prismadb.user.findUnique({
            where: {
                id: currentUserId
            }
        }) //get the current logged in user details

        const groupCreatorDetail = await prismadb.user.findUnique({
            where: {
                id: groupCreatorId
            }
        }) //get the details of th user who created the group

        if (!currentUserData || !groupCreatorDetail) {
            //if the users are not found, give 404 status code and error message
            return new NextResponse('Cannot find the users', { status: 404 })
        }

        const group = await prismadb.studyGroup.findUnique({
            where: {
                id: groupId
            },
            include: {
                members: true,
            }
        }); //find the group which the current user want to join

        if (!group) {
            //if no such group is found, return 404 status code and error message
            return new NextResponse('Cannot find the group', { status: 404 })
        }

        let userMembership;

        if (group?.members.some(member => member.userId == currentUserId)) {

            /*check if the user has already joined the group. If so, remove the
            user from the group. The group creator cannot be removed using this
            query*/

            await prismadb.membership.deleteMany({
                where: {
                    userId: currentUserId,
                    groupId: groupId,
                    NOT: {
                        userId: group.creatorId
                    }
                },
            });

            const updatedGroupMembers = group.members.filter(
                (userId) => userId !== currentUserId
            ); //filter out the user from the group members

            return NextResponse.json(updatedGroupMembers); //return the updated group members
        }


        if (group.private) {
            //The code block runs if the the group is private

            const pendingMembers = group.pendingMembers; /*get the list of
            pending members that want to join the group */

            if (pendingMembers.includes(currentUserId)) {

                const updatedPendingMembers = pendingMembers.filter(userId => userId !== currentUserId);

                // Update the group's pending members
                const updatedGroup = await prismadb.studyGroup.update({
                    where: {
                        id: groupId,
                    },
                    data: {
                        pendingMembers: updatedPendingMembers
                    }
                });

                // Delete the user's pending membership
                await prismadb.membership.deleteMany({
                    where: {
                        userId: currentUserId,
                        groupId: groupId,
                        status: MembershipStatus.PENDING,
                    },
                });

                return NextResponse.json(updatedGroup);
            }
            else {
                /*If user doesn't exist in the pending list, then add the user in
                the pending list of the group */
                pendingMembers.push(currentUserId);

                const updatedGroup = await prismadb.studyGroup.update({
                    where: {
                        id: groupId,
                    },
                    data: {
                        pendingMembers
                    }
                }) //update the group pending members

                await prismadb.membership.create({
                    data: {
                        userId: currentUserId,
                        groupId: groupId,
                        status: MembershipStatus.PENDING,
                    },
                }); //create a pending membership status

                await prismadb.notification.create({
                    data: {
                        userId: groupCreatorDetail.id,
                        body: `${currentUserData.name} has requested to join your study group ${group.groupName}`,
                        type: NotificationType.GROUP_JOIN_REQUEST,
                    },
                }) /*create a notification to the group creator that the user has requested to join the study group*/

                return NextResponse.json(updatedGroup)
            }
        }
        //if the group is not private, the user is directly added to the group
        else {
            userMembership = await prismadb.membership.create({
                data: {
                    userId: currentUserId,
                    groupId: groupId,
                    status: MembershipStatus.ACCEPTED
                }
            }); //update the current user membership status

            await prismadb.notification.create({
                data: {
                    userId: groupCreatorDetail.id,
                    body: `${currentUserData.name} has joined your study group ${group.groupName}`,
                    type: NotificationType.GROUP_JOINED
                }
            }); //creating notification to group admin that user has joined the study group
        }

        return NextResponse.json(userMembership);

    } catch (error) {
        console.error("ERROR_GROUP_JOIN_API", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}