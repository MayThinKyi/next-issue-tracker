import IssueForm from '@/app/components/issues/IssueForm';
import React from 'react'
import {prisma} from '@/db/db'
type Props={
    params:{
        id:string;
    }
}
const IssueEditPage =async ({params:{id}}:Props) => {
    const issue=await prisma?.issue.findUnique({
        where:{id:Number(id)}
    })
  return (
    <div>
      <IssueForm issueForm={issue!} />
    </div>
  )
}

export default IssueEditPage
