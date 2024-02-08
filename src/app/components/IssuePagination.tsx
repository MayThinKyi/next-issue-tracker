'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";

type Props={
    issueCount:number;
}
const IssuePagination = ({issueCount}:Props) => {
    const router=useRouter();
    const searchParams=useSearchParams();
    const currentPage=Number(searchParams.get('page'))||1;
    const updatePageParam=(page:number)=>{
        const param=new URLSearchParams();
        if(searchParams.get('status')) param.append('status',searchParams.get('status')!)
        if(searchParams.get('sort')) param.append('sort',searchParams.get('sort')!)
        param.append('page',page.toString());
        const query=param.toString();
        router.push(`/issues/list?${query}`)
    }
    const lastPage=Math.ceil(issueCount/5);
  return (
    <div className='mt-5'>
      <p>Page {currentPage || 1} of {lastPage}</p>
        <div className="mt-2 flex item-center gap-5">
            <button onClick={()=>updatePageParam(1)} className="bg-zinc-100 p-2 rounded-lg">
            <FaAnglesLeft/>
            </button>
            <button onClick={()=>{
                if(currentPage>1) updatePageParam(currentPage-1) 
            }} className="bg-zinc-100 p-2 rounded-lg">
            <FaAngleLeft/>
            </button>
            <button onClick={()=>{
                if(currentPage<lastPage) updatePageParam(currentPage+1) 
            }} className="bg-zinc-100 p-2 rounded-lg">
            <FaAngleRight/>
            </button>
            <button onClick={()=>updatePageParam(lastPage)} className="bg-zinc-100 p-2 rounded-lg">
            <FaAnglesRight/>
            </button>
        </div>
    </div>
  )
}

export default IssuePagination
