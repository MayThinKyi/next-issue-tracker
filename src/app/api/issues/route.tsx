import { createIssueSchema } from "@/schema/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import {prisma} from '@/db/db'
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function POST(request:NextRequest){
    try {
        const session= await getServerSession(authOptions);
       if(!session?.user) return NextResponse.json('Unauthorized',{status:401});
       const data=await request.json();
       const validation=createIssueSchema.safeParse(data);
       if(!validation.success) return NextResponse.json("Title and description are required!",{status:400});
       const issue=await prisma.issue.create({
           data:{
               title:data.title,description:data.description
           }
       })
       return NextResponse.json(issue,{status:201});

    } catch (error) {
        return NextResponse.json({error:error},{status:500});
    }
}

export async function GET(request:NextRequest){
    try {
        const issues=await prisma.issue.findMany({});
        return NextResponse.json(issues);
    } catch (error) {
        return NextResponse.json({error:error},{status:500});
    }
}