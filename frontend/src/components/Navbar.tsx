import { Rocket } from 'lucide-react'
import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='bg-slate-100 p-5 border border-b-slate-300 h-16 '>
    
    <h2 className='flex text-slate-500 font-bold'>
    <Rocket className='mr-1'  />
      My CMS</h2> 
    </div>
  )
}

export default Navbar