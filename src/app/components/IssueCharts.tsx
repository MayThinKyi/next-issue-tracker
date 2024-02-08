'use client';
import React from 'react'
import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Bar,
  } from 'recharts';
type Props={
    open:number;
    inProgress:number;
    closed:number;
}
const IssueCharts = ({open,inProgress,closed}:Props) => {
    const data=[
        {label:'Open',value:open},
        {label:'In Progress',value:inProgress},
        {label:'Closed',value:closed},
    ]
  return (
    <ResponsiveContainer className='mt-10' width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="label" />
      <YAxis />
      <Bar
        dataKey="value"
        barSize={40}
        style={{ fill: '#6E56CF' }}
      />
    </BarChart>
  </ResponsiveContainer>
  )
}

export default IssueCharts
