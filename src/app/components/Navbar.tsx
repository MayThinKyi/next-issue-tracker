'use client';
import { Avatar, DropdownMenu } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const Navbar = () => {
  const {data:user,status} =useSession();
    const pathName=usePathname();
    const navLinks:{label:string;link:string}[]=[
        {label:'Dashboard',link:'/'},
        {label:'Issues',link:'/issues/list'}
    ]
  return (
    <div className='py-4 px-5 sm:px-10 border-b  flex justify-between items-center'>
     <div className="flex items-center gap-5">
      <AiFillBug size={24} />
        {navLinks.map((navLink)=>{
          return <Link key={navLink.link}
            href={navLink.link} className={`${pathName===navLink.link ?'text-zinc-900' :' text-zinc-400'}`}
            >{navLink.label}</Link>
        })}
     </div>
     {status==='loading' ?  <Skeleton height={20} width={50} /> : 
      status==='authenticated' ? <div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
          <Avatar className='rounded-full' fallback='?' src={user.user?.image!} />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className='p-2'>
          <p className="text-zinc-400 mb-3 text-md">{user.user?.email}</p>
          <DropdownMenu.Item >
            <Link href={'/api/auth/signout'} >Logout</Link>
          </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div> : 
      <Link href={'/api/auth/signin'} >Login</Link>
      }
    </div>
  )
}

export default Navbar
