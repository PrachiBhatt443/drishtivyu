"use client"; 
import Footer from '@/components/footer/Footer';
import Image from 'next/image';

export default function Home() {

  return (
    <div className='pt-[96px] bg-[#C8E8E0]'>
      <video className='w-screen h-[80vh] object-cover' autoPlay loop src="/854325-hd_1280_720_25fps.mp4" alt="logo" />
      <div className='flex justify-center py-10'>
        <div className='w-[85%]'>
          <h1 className='text-2xl'>News</h1>
          <div className='flex md:flex-row flex-col justify-between gap-24 pt-2'>
            <div className='flex flex-col gap-1 md:w-[30%] bg-slate-200 border-[1px] border-gray-300 rounded-md h-[450px] overflow-hidden'>
              <Image className='rounded-t-md' src="/smc5.jpg" alt="logo" width={1000} height={1000} />
              <div className='p-4 flex flex-col gap-2'>
                  <h1 className='text-lg font-semibold'>Major Tech Conference Announced</h1>
                  <p className='text-sm flex-1 overflow-hidden max-h-[5rem]'>
                    A leading tech conference has just been announced, bringing together industry experts from around the world.
                  </p>
              </div>
            </div>
            <div className='flex flex-col md:w-[30%] gap-1 bg-slate-200 border-[1px] border-gray-300 rounded-md h-[450px] overflow-hidden'>
              <Image className='rounded-t-md' src="/smc5.jpg" alt="logo" width={1000} height={1000} />
              <div className='p-4 flex flex-col gap-2'>
                  <h1 className='text-lg font-semibold'>Stock Prices Surge Amid Positive Earnings Reports</h1>
                  <p className='text-sm flex-1 overflow-hidden max-h-[5rem]'>
                    Global stock markets experienced significant gains today as several major companies reported better-than-expected earnings.
                  </p>
              </div>
            </div>
            <div className='flex flex-col md:w-[30%] gap-1 bg-slate-200 border-[1px] border-gray-300 rounded-md h-[450px] overflow-hidden'>
                <Image className='rounded-t-md' src="/smc5.jpg" alt="logo" width={1000} height={1000} />
                <div className='p-4 flex flex-col gap-2'>
                  <h1 className='text-lg font-semibold'>New Study Reveals Benefits of a Plant-Based Diet</h1>
                  <p className='text-sm flex-1 overflow-hidden max-h-[5rem]'>
                    A recent study published in a renowned medical journal highlights the numerous health benefits of adopting a plant-based diet.
                  </p>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
