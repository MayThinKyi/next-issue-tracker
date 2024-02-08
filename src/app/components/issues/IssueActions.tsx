'use client';
import React from 'react'
import { Button } from '@radix-ui/themes';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
type Props={
    id:number;
}
const IssueActions = ({id}:Props) => {
    const router=useRouter();
    const deleteIssue=async()=>{
        try {
         const res=await axios.delete(`/api/issues/${id}`);
         const data=await res.data;
         router.push('/issues/list');
         router.refresh();
        
        } catch (error) {
             toast.error('Delete issue fail!')
             console.log(error)
        }
     }
  return (
     <div className='mt-5 flex flex-col gap-4 w-full' >
            <Button color='purple' onClick={()=>router.push(`/issues/edit/${id}`)} >Edit Issue</Button>    
            <Button color='red'  onClick={deleteIssue} >Delete Issue</Button>    
        </div>
  )
}

export default IssueActions
