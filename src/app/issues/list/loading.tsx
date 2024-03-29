import { Table } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const IssueListLoadingPage = () => {
    const issues=[1,2,3,4,5,6]
  return (
    <div>
        <Skeleton height={20} width={100} />
        <Table.Root className='mt-5' variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue)=>{
              return <Table.Row key={issue} >
              <Table.RowHeaderCell>
              <Skeleton/>
              </Table.RowHeaderCell>
              <Table.Cell>
              <Skeleton/>
              </Table.Cell>
              <Table.Cell><Skeleton/></Table.Cell>
            </Table.Row>
            })}
            
          </Table.Body>
        </Table.Root>
    </div>
  )
}

export default IssueListLoadingPage
