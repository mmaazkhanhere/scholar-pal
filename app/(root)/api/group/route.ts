import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export const POST = async (request: NextRequest) => {
    try {

    } catch (error) {

        console.error('STUDY_GROUP_CREATE_API_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}