'use client';

import Image from 'next/image'
import React from 'react'
import {GraduationCap, Hand, LayoutIcon, Settings} from 'lucide-react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Link from 'next/link';

function SideNav() {
  const {user} = useKindeBrowserClient()
  const isActive = (path) => typeof window !== 'undefined' && window.location.pathname === path;


  const menuList = [
    {id: 1, name: "Dashboard", icon: LayoutIcon, path: "/dashboard"},
    {id: 2, name: "Students", icon: GraduationCap, path: "/dashboard/students"},
    {id: 3, name: "Attendance", icon: Hand, path: "/dashboard/attendance"},
    {id: 4, name: "Settings", icon: Settings, path: "/dashboard/settings"},
  ]


  return (
    <div className='border shadow-md h-screen p-5'>
      <div className='flex items-center gap-2'>
        <Image src={'/logo.svg'} width={80} height={80} alt='logo' />
        <p className='font-semibold'>Students' Attendance Tracker</p>
      </div>
      <hr className='my-5'/>
      {
        menuList.map((menu) => (
          <Link key={menu.id} href={menu.path}>
            <div
              className={`flex items-center gap-3 my-2 text-md p-4 text-slate-500 
                ${isActive(menu.path) ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'} 
                cursor-pointer rounded-lg`}
            >
              <menu.icon size="24" aria-label={menu.name} />
              {menu.name}
            </div>
          </Link>
          ))
      }
      <div className='flex gap-2 items-center bottom-5 fixed'>
        <Image src={user?.picture} width={35} height={35} alt="user" className='rounded-full'/>
        <div className=''>
          <h2 className='text-sm font-semibold'>{user?.given_name} {user?.family_name}</h2>
          <h2 className='text-sm text-slate-400'>{user?.email}</h2>
        </div>
      </div>
    </div>
  )
}

export default SideNav