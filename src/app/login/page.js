'use client'
import Footer from '@/components/footer/Footer'
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

const Login = () => {
    const session =useSession();
    const router=useRouter();
    if(session.status==="loading")
    return<p>Loading...</p>;
    if(session.status==="authenticated")
    router?.push("/");

    const handleSubmit=async(e)=>{

        e.preventDefault();
        const name=e.target[0].value;
        const password=e.target[1].value;
        signIn("credentials",{name,password})

    }
  return (
    <>
        <div className='h-screen w-screen flex flex-col justify-center items-center bg-[#C8E8E0]'>
            <div>
                <div className='w-full flex flex-col items-center'>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-5 items-center px-10 py-5 bg-green-100 shadow-xl rounded-md'>
                    <h1 className='text-center font-semibold text-2xl py-2'>Login</h1>  
                        <div className='flex flex-col'>
                            <label className='font-semibold'>Username:</label>
                            <input className='p-1.5 border-[1px] border-gray-600 outline-none rounded-md' placeholder='Username'></input>  
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-semibold'>Password:</label>
                            <input className='p-1.5 border-[1px] border-gray-600 outline-none rounded-md' type='password' placeholder='Password'></input>
                        </div>
                        <div className='flex justify-center'>
                            <button className='px-2 py-1 bg-blue-300 rounded-md '>Submit</button>
                        </div>
                        <div className='flex gap-1'>
                            <p className='text-center'>Don&apos;t have an account?</p>
                            <Link className='text-center text-blue-500' href={"/register"}>Register here</Link>
                        </div>
                    </form>
                </div>
                <div className='w-screen absolute left-0 bottom-0'>
                    <Footer/>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login