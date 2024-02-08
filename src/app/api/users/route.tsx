import { NextRequest, NextResponse } from "next/server";
import {prisma} from '@/db/db'

export async function GET(request:NextRequest){
    try {
        const users=await prisma.user.findMany({});
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}