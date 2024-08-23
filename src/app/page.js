"use client"; 
import Image from 'next/image';

export default function Home() {

  return (
    <div className='pt-[80px]'>
      <Image className='w-screen h-[calc(100vh-80px)] object-cover' src="/smc5.jpg" alt="logo" width={1000} height={1000} />
    </div>
  );
}
