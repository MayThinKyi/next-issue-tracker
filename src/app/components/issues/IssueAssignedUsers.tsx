'use client';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type Props={
    issue:Issue;
}

const IssueAssignedUsers = ({issue}:Props) => {
    const router=useRouter();
   const {data:users,isError,isLoading}=useQuery({
    queryKey:['users'],
    queryFn:()=>axios.get<User[]>('http://localhost:3000/api/users').then(res=>res.data)
   });
   const assignedUser=async(userId:string)=>{
       const res= await axios.put(`/api/issues/${issue.id}`,{
            assignedUserId:userId==='null' ? null :userId
        })
        const data=await res.data;
        router.refresh();
        toast.success('Issue assigned successfully!')
   }
    if(isLoading) return <Skeleton/>
  return (
    <Select.Root  onValueChange={(userId)=>assignedUser(userId)} defaultValue={issue.assignedUserId || 'null'}>
        <Select.Trigger />
        <Select.Content>
            <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="null" >Unassigned</Select.Item>
            {users?.map((user)=>{
                return <Select.Item key={user.id} value={user.id} >{user.name}</Select.Item>
            })}
            
            </Select.Group>
            
        </Select.Content>
    </Select.Root>
  )
}

export default IssueAssignedUsers
