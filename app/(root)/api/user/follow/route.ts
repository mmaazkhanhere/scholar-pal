/*An API route for follow and unfollow logic. It checks if user exists in a
user follower list. If it does, when the api is called, they are removed from the
list, thus unfollow them. If they do not exist, they are added to the user
follower list*/

import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb';
import getCurrentUser from "@/actions/getCurrentUser";

export const POST = async (request: NextRequest) => {

    const body = await request.json(); //extract the body from the request
    const currentUser = await getCurrentUser(); // Get the currently logged-in user
    const { userId } = body; // The ser to follow/unfollow

    try {

        if (!currentUser || !userId) {
            //if the current user or the target user id doesn't exist, return 401 status
            return new NextResponse('Authentication required', { status: 401 });
        }

        if (currentUser.id === userId) {
            /* if the target user id is same as the current user, return 400 status 
            and an error message that a user cannot follow or unfollow themselves*/
            return new NextResponse('Operation not allowed', { status: 400 });
        }

        /*get the user that is supposed to be follow/unfollow using the userId
        passed in the request body */
        const targetUser = await prismadb.user.findUnique({
            where: { id: userId }
        });

        if (!targetUser) {
            //if the target user doesn't exist, return 404 status and an error message
            return new NextResponse('User not found', { status: 404 });
        }

        //create a shallow copy of the target user follower ids list
        let targetUserFollower = [...(targetUser.followerIds || [])]

        //create a shallow copy of the current user following ids list
        let currentUserFollowing = [...(currentUser.followingIds || [])];

        /*Checks if the target user exist in the currently signed in following list
        or the currently signed in user exists in target user follower list  */
        if (targetUserFollower.includes(currentUser.id) || currentUserFollowing.includes(targetUser.id)) {

            /*remove the currently sign in user from the target follower list  */
            targetUserFollower = targetUserFollower.filter(follower => follower !== currentUser.id);

            /*remove the target user from the currently sign in user following list */
            currentUserFollowing = currentUserFollowing.filter(following => following !== targetUser.id);

        }
        //if they do not exist in each other follower and following list
        else {
            //add the currently sign in user to the target follower list
            targetUserFollower.push(currentUser.id);

            //add the target user to the currently sign in user following list
            currentUserFollowing.push(targetUser.id);

            await prismadb.notification.create({
                data: {
                    userId: userId,
                    senderId: currentUser.id,
                    type: 'FOLLOW_REQUEST',
                    body: `${currentUser.name} has send you a follow request`
                }
            })
        }

        //update the target user data and its follower list
        await prismadb.user.update({
            where: {
                id: userId
            },
            data: {
                followerIds: targetUserFollower
            }
        })


        //update current user data and its following list
        const updatedCurrentUser = await prismadb.user.update({
            where: { id: currentUser.id },
            data: {
                followingIds: currentUserFollowing,
                hasNotifications: true
            }
        });

        return NextResponse.json(updatedCurrentUser); /*return the currently
        updated user in json response */
    } catch (error) {
        console.error('FOLLOW_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};
