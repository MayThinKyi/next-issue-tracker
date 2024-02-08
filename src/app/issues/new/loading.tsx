import delay from 'delay'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const CreateIssueLoadingPage =async () => {
    await delay(2000)
  return (
    <div className='md:w-[40%]' >
        <Skeleton height={20}  />
        <Skeleton height={350}  className='mt-3' />
        <Skeleton height={20} width={100} className='mt-4' />
    </div>
  )
}

export default CreateIssueLoadingPage
