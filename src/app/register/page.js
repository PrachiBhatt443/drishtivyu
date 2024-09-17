'use client'
import Footer from '@/components/footer/Footer'
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'

const Register = () => {
    const router = useRouter();
    const session =useSession();  
    const passwordAgain=useRef();
    const pass=useRef();
    const[err,setErr]=useState(false);
    const[warn,setWarn]=useState(false);
    
    if(session.status==="loading")
    return<p>Loading...</p>;
    if(session.status==="authenticated")
    router?.push("/");
    
    const handleSubmit=async(e)=>{
      e.preventDefault();
      if(pass.current.value!==passwordAgain.current.value)
      setWarn(true);
      else
      {
        const name=e.target[0].value;
        const password=e.target[1].value;
        try{
          const res=await fetch("/api/auth/register",{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify({
              name,password,
            })
          });
          res.status===201&&router.push("/login");
        }catch(err){
          setErr(true);
        }
      }
      
    }
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-[#C8E8E0]'>
        <div>
            <div className='w-full flex flex-col items-center'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5 items-center px-10 py-5 bg-green-100 shadow-xl rounded-md'>
                <h1 className='text-center font-semibold text-2xl py-2'>Sign up</h1>  
                    <div className='flex flex-col'>
                        <label className='font-semibold'>Username:</label>
                        <input className='p-1.5 border-[1px] border-gray-600 outline-none rounded-md' placeholder='Username'></input>  
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-semibold'>Password:</label>
                        <input ref={pass} className='p-1.5 border-[1px] border-gray-600 outline-none rounded-md' type='password' placeholder='Password'></input>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-semibold'>Confirm Password:</label>
                        <input ref={passwordAgain} className='p-1.5 border-[1px] border-gray-600 outline-none rounded-md' type='password' placeholder='Retype Password'></input>
                        {warn&&<p className='text-red-500 text-xs'>Passwords don&apos;t match</p>}
                    </div>
                    <div className='flex justify-center'>
                        <button className='px-2 py-1 bg-blue-300 rounded-md '>Submit</button>
                    </div>
                    <div className='flex gap-1'>
                        <p className='text-center'>Already have an account?</p>
                        <Link className='text-center text-blue-500' href={"/login"}>Login here</Link>
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