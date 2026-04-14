import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className="mycontainer flex justify-between items-center px-4 h-14 py-5">
        <div className="logo font-bold text-2xl ">
          <span className='text-green-800'> &lt;</span>
          pass
          <span className='text-green-800 '>op/&gt;</span>
        </div>
        {/* <ul className='flex gap-4'>
            <li className='hover:font-bold'><a href="/">Home</a></li>
            <li className='hover:font-bold'><a href="/">About</a></li>
            <li className='hover:font-bold'><a href="/">Contact</a></li>
           
        </ul> */}
        <button className='text-white bg-green-700 my-5 rounded-full flex justify-between items-center ring-white ring-1'>
          <img src="icons/github.svg" className=' invert  p-1   w-10' alt="github logo" />
          <span className='font-bold px-2'>
            GitHub

          </span>

        </button>
      </div>

    </nav>
  )
}

export default Navbar
