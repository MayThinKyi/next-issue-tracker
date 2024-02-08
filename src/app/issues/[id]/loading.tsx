import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const IssueDetailsLoadingPage = () => {
  return (
    <div className='grid grid-cols-1  md:grid-cols-2 gap-10 '>
        <div >
            <Skeleton width={150} height={20} />
            <div className="flex items-center gap-5 my-5">
               <Skeleton/>
                <Skeleton/>
            </div>
            <div className="border mt-5 rounded-lg p-4">
            <Skeleton  height={200} />
            </div>
        </div>
        <div className='md:w-[40%]'>
        <Skeleton height={30} />
        <Skeleton height={30}  />
        <Skeleton height={30}  />
        </div>
    </div>
  )
}

export default IssueDetailsLoadingPage
