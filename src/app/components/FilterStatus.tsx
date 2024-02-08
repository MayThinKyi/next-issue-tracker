'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import {  useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const FilterStatus = () => {
    const router=useRouter();
    const statuses:{label:string,value:Status}[]=[
        {label:'Open',value:'OPEN'},
        {label:'In Progress',value:'IN_PROGRESS'},
        {label:'Closed',value:'CLOSED'}
    ]
    const searchParams=useSearchParams();
    console.log(searchParams.get('sort'));
    const filterStatus=(value:string)=>{
        const param=new URLSearchParams();
        if(value!=='all') param.append('status',value);
        if(searchParams.get('sort')) param.append('sort',searchParams.get('sort')!);
        if(searchParams.get('page')) param.append('page',searchParams.get('page')!);
        const query=param.toString();
        router.push(`/issues/list?${query}`);
    }
  return (
    <Select.Root onValueChange={(value)=>filterStatus(value)} defaultValue={searchParams.get('status')||'all'}>
        <Select.Trigger />
        <Select.Content>
            <Select.Group>
            <Select.Item value="all">All</Select.Item>
            {statuses.map((status)=>{
                return <Select.Item key={status.value} value={status.value}>{status.label}</Select.Item>
            })}
            </Select.Group>
        
        </Select.Content>
    </Select.Root>
  )
}

export default FilterStatus
