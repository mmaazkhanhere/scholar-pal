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

        const answer = await prismadb.answer.findUnique({
            where: {
                id: answerId
            },
            select: {
                downvotes: true,
                authorId: true
            }
        })

        const author = await prismadb.user.findUnique({
            where: {
                id: answer?.authorId
            },
            select: {
                score: true
            }
        })

        const authorScore = author?.score

        const authorUpdatedScore = authorScore! - 5;

        if (!answer) {
            return new NextResponse('Cannot find answer', { status: 400 });
        }

        let updatedList = answer.downvotes;

        if (updatedList.includes(currentUser.id)) {
            updatedList = updatedList.filter((userId) => userId !== currentUser.id);

            await prismadb.user.update({
                where: {
                    id: answer.authorId
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
                    userId: answer.authorId,
                    senderId: currentUser.id,
                    body: `${currentUser.name} has downvoted your answer`,
                    type: 'DOWNVOTE'
                }
            })

            await prismadb.user.update({
                where: {
                    id: answer.authorId
                },
                data: {
                    score: authorUpdatedScore
                }
            });

        }

        const updateDownVoteList = await prismadb.answer.update({
            where: {
                id: answerId
            },
            data: {
                downvotes: updatedList
            }
        });

        return NextResponse.json(updateDownVoteList);

    } catch (error) {
        console.error('DOWN_VOTE_POST_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};