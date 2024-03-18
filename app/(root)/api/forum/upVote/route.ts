import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'
import getCurrentUser from "@/actions/getCurrentUser";

export const POST = async (request: NextRequest) => {

    const body = await request.json();
    const { answerId } = body;
    const currentUser = await getCurrentUser();

    try {

        if (!currentUser) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!answerId) {
            return new NextResponse('Missing details', { status: 400 });
        }

        const upVotesList = await prismadb.answer.findUnique({
            where: {
                id: answerId
            },
            select: {
                upvotes: true,
                authorId: true
            }
        })

        const author = await prismadb.user.findUnique({
            where: {
                id: upVotesList?.authorId
            },
            select: {
                score: true
            }
        })

        const authorScore = author?.score
        const authorUpdatedScore = authorScore! + 10;


        if (!upVotesList) {
            return new NextResponse('Cannot find answer', { status: 400 });
        }

        let updatedList = upVotesList.upvotes;

        if (updatedList.includes(currentUser.id)) {
            updatedList = updatedList.filter((userId) => userId !== currentUser.id);

            await prismadb.user.update({
                where: {
                    id: upVotesList.authorId
                },
                data: {
                    score: authorScore
                }
            });
        }
        else {
            updatedList.push(currentUser.id);

            await prismadb.notification.create({
                data: {
                    userId: upVotesList.authorId,
                    senderId: currentUser.id,
                    body: `${currentUser.name} has upvoted your answer`,
                    type: 'UPVOTE'
                }
            })

            await prismadb.user.update({
                where: {
                    id: upVotesList.authorId
                },
                data: {
                    score: authorUpdatedScore
                }
            });

        }

        const updatedUpVoteList = await prismadb.answer.update({
            where: {
                id: answerId
            },
            data: {
                upvotes: updatedList
            }
        });

        return NextResponse.json(updatedUpVoteList);

    } catch (error) {
        console.error('THUMBUP_POST_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};