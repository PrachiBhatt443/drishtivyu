import React from 'react'

const Login = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <div>
            <div className='w-full flex flex-col items-center'>
                <form className='flex flex-col gap-5 items-center px-10 py-5 bg-green-100 shadow-xl rounded-md'>
                <h1 className='text-center font-semibold text-2xl py-2'>Login</h1>  
                    <div className='flex flex-col'>
                        <label className='font-semibold'>Username:</label>
                        <input className='p-1.5 border-[1px] border-gray-600 outline-none' placeholder='Username'></input>  
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-semibold'>Password:</label>
                        <input className='p-1.5 border-[1px] border-gray-600 outline-none' type='password' placeholder='Password'></input>
                    </div>
                    <div className='flex justify-center'>
                        <button className='px-2 py-1 bg-blue-300 rounded-md '>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login