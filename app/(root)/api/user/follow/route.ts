import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb';
import getCurrentUser from "@/actions/getCurrentUser";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const currentUser = await getCurrentUser(); // Get the currently logged-in user
        const { userId } = body; // The user to toggle follow/unfollow

        if (!currentUser || !userId) {
            return new NextResponse('Authentication required', { status: 401 });
        }

        if (currentUser.id === userId) {
            // Prevent users from following/unfollowing themselves
            return new NextResponse('Operation not allowed', { status: 400 });
        }

        // Retrieve the current state of the relationship from the database
        const targetUser = await prismadb.user.findUnique({
            where: { id: userId }
        });

        if (!targetUser) {
            return new NextResponse('User not found', { status: 404 });
        }

        let targetUserFollower = [...(targetUser.followerIds || [])]
        let currentUserFollowing = [...(currentUser.followingIds || [])];

        if (targetUserFollower.includes(currentUser.id) || currentUserFollowing.includes(targetUser.id)) {
            targetUserFollower = targetUserFollower.filter(follower => follower !== currentUser.id);
            currentUserFollowing = currentUserFollowing.filter(following => following !== targetUser.id);

        }
        else {
            targetUserFollower.push(currentUser.id);
            currentUserFollowing.push(targetUser.id);
        }

        const updateFollower = await prismadb.user.update({
            where: {
                id: userId
            },
            data: {
                followerIds: targetUserFollower
            }
        })

        const updatedCurrentUser = await prismadb.user.update({
            where: { id: currentUser.id },
            data: {
                followingIds: currentUserFollowing
            }
        });

        return NextResponse.json(updatedCurrentUser);
    } catch (error) {
        console.error('FOLLOW_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};
