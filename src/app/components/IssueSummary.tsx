import Link from 'next/link';
import React from 'react';

type Props={
    open:number;
    inProgress:number;
    closed:number;
}
const IssueSummary = ({open,inProgress,closed}:Props) => {
    const summaries:{label:string,value:number,link:string}[]=[
        {label:'Open Issues',value:open,link:'/issues/list?status=OPEN'},
        {label:'In-progress Issues',value:inProgress,link:'/issues/list?status=IN_PROGRESS'},
        {label:'Closed Issues',value:closed,link:'/issues/list?status=CLOSED'}
    ]
  return (
    <div className='sm:pl-14 flex flex-wrap items-center gap-5'>
        {summaries.map((summary)=>{
            return <div key={summary.value} className='border rounded-lg p-3'>
                <Link href={summary.link} className="font-semibold">{summary.label}</Link>
                <p className='mt-2'>{summary.value}</p>
            </div>
        })}
    </div>
  )
}

export default IssueSummary
