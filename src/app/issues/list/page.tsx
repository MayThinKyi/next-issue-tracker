import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import {prisma} from '@/db/db'
import delay from 'delay'
import StatusBadge from '@/app/components/StatusBadge'
import FilterStatus from '@/app/components/FilterStatus'
import { Issue, Status } from '@prisma/client'
import IssuePagination from '@/app/components/IssuePagination'
type Props={
  searchParams:{
    status:Status;
    sort:string;
    page:string;
  }
}
const IssuesListPage =async ({searchParams:{status,page,sort}}:Props) => {
  const pgNo=Number(page)||1;
  const statusFilter=status==='OPEN' || status==='IN_PROGRESS' || status==='CLOSED' ? status :undefined;
  const sortFilter=sort==='title' || sort==='status' || sort==='created'? {
    [sort]:'asc'
  }:undefined;
  const issues=await prisma.issue.findMany({
    where:{
      status:statusFilter
    },
    orderBy:sortFilter,
    skip:(pgNo-1)*5,
    take:5
  });
  const issueCount=await prisma.issue.count({
    where:{
      status:statusFilter
    },
  });
  const headers:{label:string;value:keyof Issue}[]=[
    {label:'Title',value:'title'},
    {label:'Status',value:'status'},
    {label:'Created',value:'createdAt'},
  ]
  await delay(1000);
 
  return (
    <div>
       <div className="flex items-center justify-between">
        <FilterStatus/>
        <div>
          <Link href={'/issues/new'} >
              <Button>Create Issue</Button>
          </Link>
        </div>
       </div>
        
        <Table.Root className='mt-5' variant="surface">
          <Table.Header>
            <Table.Row>
              {headers.map((header)=>{
                return <Table.ColumnHeaderCell key={header.value} >
                  <Link href={{
                    query:{
                      status,sort:header.value,page
                    }
                  }}>{header.label}</Link>
                </Table.ColumnHeaderCell>
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue)=>{
              return <Table.Row key={issue.id} >
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`} >{issue.title}</Link>
              </Table.RowHeaderCell>
              <Table.Cell>
                <StatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
            })}
            
          </Table.Body>
        </Table.Root>
        <IssuePagination issueCount={issueCount} />
    </div>
  )
}

export default IssuesListPage

export const dynamic='force-dynamic';
