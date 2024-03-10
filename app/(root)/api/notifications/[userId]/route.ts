import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libs/prismadb"

export const GET = async (request: NextRequest) => {

    console.log('API called');

    try {
        const userId = request.nextUrl.pathname.split('/').pop()

        console.log(userId)

        if (!userId || typeof userId !== 'string') {
            return new NextResponse('Invalid UserId', { status: 404 });
        }

        const notifications = await prismadb.notification.findMany({
            where: {
                userId: userId
            },
            include: {
                sender: true
            },
            orderBy: {
                createdAt: 'desc'
            }

        });

        await prismadb.user.update({
            where: {
                id: userId
            },
            data: {
                hasNotifications: false

            }
        })

        return NextResponse.json(notifications)
    } catch (error) {
        console.error('GET_NOTIFICATION_API_ERROR', error)
        return new NextResponse('Internal Server Error', { status: 500 });
    }

}