import StatusBadge from '@/app/components/StatusBadge';
import Markdown from 'react-markdown'
import React from 'react'
import {prisma} from '@/db/db'
import IssueActions from '@/app/components/issues/IssueActions';
import IssueAssignedUsers from '@/app/components/issues/IssueAssignedUsers';
import delay from 'delay';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
type Props={
    params:{
        id:string;
    }
}
const IssueDetailsPage =async ({params:{id}}:Props) => {
    const session=await getServerSession(authOptions);
    const issue=await prisma.issue.findUnique({
        where:{id:Number(id)}
    });
    await delay(3000)
   
  return (
    <div className='grid grid-cols-1  md:grid-cols-2 gap-10 '>
        <div >
            <h1 className='text-2xl font-bold'>{issue?.title}</h1>
            <div className="flex items-center gap-5 my-5">
                <StatusBadge status={issue?.status!} />
                <p>{issue?.createdAt.toDateString()}</p>
            </div>
            <div className="border mt-5 rounded-lg p-4">
                <Markdown className='prose' >
                    {issue?.description}
                </Markdown>
            </div>
        </div>
        {session &&<div className='md:w-[40%]'>
            <IssueAssignedUsers issue={issue!} />
             <IssueActions id={Number(id)} />
        </div>}
    </div>
  )
}

export default IssueDetailsPage

