import React from 'react'
import LatestIssues from './components/LatestIssues'
import IssueSummary from './components/IssueSummary'
import {prisma} from '@/db/db';
import IssueCharts from './components/IssueCharts';

const HomePage = async() => {
  const open=await prisma.issue.count({where:{status:'OPEN'}});
  const inProgress=await prisma.issue.count({where:{status:'IN_PROGRESS'}})
  const closed=await prisma.issue.count({where:{status:'CLOSED'}})

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5' >
      <div>
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueCharts open={open} inProgress={inProgress} closed={closed} />
      </div>
      <LatestIssues/>
    </div>
  )
}

export default HomePage
