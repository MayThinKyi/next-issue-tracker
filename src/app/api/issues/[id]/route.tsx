import { NextRequest, NextResponse } from "next/server";
import {prisma} from '@/db/db'
import { editIssueSchema } from "@/schema/validationSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
type Props={
    params:{
        id:string;
    }
}

export async function PUT(request:NextRequest,{params:{id}}:Props){
    try {
        const session= await getServerSession(authOptions);
        if(!session?.user) return NextResponse.json('Unauthorized',{status:401});
        const data=await request.json();
        const validation=editIssueSchema.safeParse(data);
        if(!validation.success){
            return NextResponse.json('Please provide necessary data!',{status:400});
        };
        if(data.assignedUserId) {
            const user=await prisma.user.findUnique({where:{id:data.assignedUserId}});
            if(!user) return NextResponse.json('User not found!',{status:404});
        }
        const updatedIssue=await prisma.issue.update({
           where:{
            id:Number(id)
           },
           data:{
            title:data.title,description:data.description,
            assignedUserId:data.assignedUserId
           }
        })
        return NextResponse.json(updatedIssue,{status:201});
    } catch (error) {
        return NextResponse.json(error,{status:500});
    }
}

export async function DELETE(request:NextRequest,{params:{id}}:Props) {
    try {
        const session= await getServerSession(authOptions);
        if(!session?.user) return NextResponse.json('Unauthorized',{status:401});
        const issue=await prisma?.issue.findUnique({
            where:{id:Number(id)}
        });
        if(!issue) return NextResponse.json('Issue not found!',{status:404});
        await prisma?.issue.delete({where:{id:Number(id)}});
        return NextResponse.json({});
    } catch (error) {
        return NextResponse.json(error,{status:500});
    }
}