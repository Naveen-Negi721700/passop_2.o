import React from 'react'

const Footer = () => {
    return (

        <div className='bg-slate-800 text-white flex flex-col justify-center items-center  bottom-0 w-full'>
            <div className="logo font-bold text-2xl ">
          <span className='text-green-800'> &lt;</span>
          pass
          <span className='text-green-800 '>op/&gt;</span>
          </div>
            <div className='flex justify-center'>
                Created with <img className='w-7 mx-2' src="/icons/heart.png" alt="Heart" />by Naveen Negi
            </div>
        </div>
    )
}

export default Footer
