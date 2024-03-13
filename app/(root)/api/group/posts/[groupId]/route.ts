import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'
import getCurrentUser from "@/actions/getCurrentUser";

export const GET = async (request: NextRequest) => {

    const groupId = request.nextUrl.pathname.split('/').pop()

    try {

        const groupPosts = await prismadb.post.findMany({
            where: {
                studyGroupId: groupId,
            },
            include: {
                author: {
                    select: {
                        name: true,
                        username: true,
                        profilePicture: true,
                        id: true
                    }
                },
                comments: {
                    select: {
                        author: {
                            select: {
                                name: true,
                                username: true,
                                profilePicture: true,
                                id: true
                            }
                        }
                    }
                },
            },
            orderBy: {
                createdAt: 'desc'/*order the post in descending order of the time 
                they were published*/
            }
        })

        return NextResponse.json(groupPosts); //returns all the posts

    } catch (error) {
        console.error('GET_ALL_GROUP_POSTS_API_ERROR', error);
        return new NextResponse('Server Error', { status: 500 })
    }
}

export const POST = async (request: NextRequest) => {

    const body = await request.json(); //extract body from request
    const { postContent, tags, groupId, creatorId } = body; //destruct the body
    const currentUser = await getCurrentUser();

    try {
        if (!groupId) {
            return new NextResponse('Missing group id', { status: 400 })
        }

        const currentUser = await getCurrentUser() //get the current signed in user

        if (!currentUser) {
            //If there is no sign in user, not authenticated error is returned
            return new NextResponse('Not authenticated', { status: 401 });
        }

        if (!postContent) {
            //If the post is empty, 404 status code is returned
            return new NextResponse('No Content', { status: 404 });
        }

        const group = await prismadb.studyGroup.findUnique({
            where: {
                id: groupId
            },
            select: {
                groupName: true,
            }
        })

        const newPost = await prismadb.post.create({
            data: {
                content: postContent,
                authorId: currentUser.id,
                studyGroupId: groupId,
                tags: tags || [], //tags are either tag passed in body or empty array
                likedBy: [] //likes list is set to empty array indicating no one have like did
            },
        });

        await prismadb.notification.create({
            data: {
                userId: creatorId,
                senderId: currentUser.id,
                body: `${currentUser.name} has made a new post in ${group?.groupName}`,
                type: 'NEW_POST'
            }
        })

        await prismadb.user.update({
            where: {
                id: creatorId,
            },
            data: {
                hasNotifications: true,
            }
        })

        return NextResponse.json(newPost);

    } catch (error) {
        console.error('CREATE_GROUP_POST_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }

}