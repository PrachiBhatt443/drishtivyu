import Footer from '@/components/footer/Footer'
import React from 'react'

const Register = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <div>
            <div className='w-full flex flex-col items-center'>
                <form className='flex flex-col gap-5 items-center px-10 py-5 bg-green-100 shadow-xl rounded-md'>
                <h1 className='text-center font-semibold text-2xl py-2'>Sign up</h1>  
                    <div className='flex flex-col'>
                        <label className='font-semibold'>Username:</label>
                        <input className='p-1.5 border-[1px] border-gray-600 outline-none rounded-md' placeholder='Username'></input>  
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-semibold'>Password:</label>
                        <input className='p-1.5 border-[1px] border-gray-600 outline-none rounded-md' type='password' placeholder='Password'></input>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-semibold'>Confirm Password:</label>
                        <input className='p-1.5 border-[1px] border-gray-600 outline-none' type='retype password' placeholder='Password'></input>
                    </div>
                    <div className='flex justify-center'>
                        <button className='px-2 py-1 bg-blue-300 rounded-md '>Submit</button>
                    </div>
                </form>
            </div>
            <div className='w-screen absolute left-0 bottom-0'>
                <Footer/>
            </div>
        </div>
    </div>
  )
}

export default Register