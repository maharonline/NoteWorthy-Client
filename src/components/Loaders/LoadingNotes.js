import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import'./LoadingNotes.css'

export default function LoadingNotes() {
    const {ThemeToggle}=useAuthContext()
  return (
    <div className='flex justify-center items-center flex-column'>
   <div className='hidden'><ThemeToggle/></div>

<div className="loader"></div>
    </div>
  )
}
