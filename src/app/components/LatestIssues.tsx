import React from 'react'
import {prisma} from '@/db/db'
import StatusBadge from './StatusBadge';
import { Avatar } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import Link from 'next/link';
const LatestIssues = async() => {
    const  session=await getServerSession(authOptions);
    const issues=await prisma.issue.findMany({
        orderBy:{createdAt:'desc'},
        take:5,
        include:{
            assignedUser:true
        }
    });
    
  return (
    <div className='p-4 rounded-xl border'>
        <h1 className="font-semibold text-xl mb-3">
            Latest Issues
        </h1>
      {issues.map((issue)=>{
        return <div key={issue.id} className='border-b py-3 flex items-center justify-between'>
            <div>
                <Link  href={`/issues/${issue.id}`} >{issue.title}</Link><br/>
                <StatusBadge status={issue.status} />
            </div>
            <div>
                {issue.assignedUser &&
                <Avatar className='rounded-full' src={issue.assignedUser.image!} fallback="?" />
                 } 
            </div>
        </div>
      })}
    </div>
  )
}

export default LatestIssues
