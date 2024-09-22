import Footer from '@/components/footer/Footer'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Services = () => {
  return (
    <>
    <div className='pt-[80px] bg-[#C8E8E0]'>
        <div className='py-24 px-16'>
        <div className="text-center text-4xl pb-12 font-semibold text-green-700">Our Features & Services</div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
                <div className='py-5 px-2 flex flex-col justify-center items-center gap-2 rounded-lg cursor-pointer bg-white'>
                    <Image className='h-60 object-cover' src={"/road.png"} alt="Road Condition Monitoring" width={1000} height={1000} />
                    <h2 className='text-lg font-semibold text-center text-green-700'>Road Condition Monitoring</h2>
                    <p className='text-sm text-center text-[#376358]'>Monitor road conditions for safer travel and timely maintenance alerts.</p>
                    <Link href={"/services/road_condition"} className='text-sm rounded-xl bg-green-700 px-2 py-1 text-white'>Explore</Link>
                </div>
                <div className='py-5 px-2 flex flex-col items-center gap-2 rounded-lg cursor-pointer bg-white'>
                    <Image className='h-60 object-cover' src={"/crime.jpg"} alt="Real Time Crime Detection" width={1000} height={1000} />
                    <h2 className='text-lg font-semibold text-center text-green-700'>Real Time Crime Detection</h2>
                    <p className='text-sm text-center text-[#376358]'>Enhance safety with our real-time crime detection system.</p>
                    <button className='text-sm rounded-xl bg-green-700 px-2 py-1 text-white'>Explore</button>
                </div>
                <div className='py-5 px-2 flex flex-col justify-center items-center gap-2 rounded-lg cursor-pointer bg-white'>
                    <Image className='h-60 object-cover' src={"/air.png"} alt="Air Quality Monitoring" width={1000} height={1000} />
                    <h2 className='text-lg font-semibold text-center text-green-700'>Air Quality Monitoring</h2>
                    <p className='text-sm text-center text-[#376358]'>Track air quality for healthier environments and informed decisions.</p>
                    <Link href={"/services/air_quality"} className='text-sm rounded-xl bg-green-700 px-2 py-1 text-white'>Explore</Link>
                </div>
                <div className='py-5 px-2 flex flex-col justify-center items-center gap-2 rounded-lg cursor-pointer bg-white'>
                    <Image className='h-60 object-cover' src={"/speed.jpg"} alt="Overspeed Detection" width={1000} height={1000} />
                    <h2 className='text-lg font-semibold text-center text-green-700'>Overspeed Detection</h2>
                    <p className='text-sm text-center text-[#376358]'>Prevent accidents with our advanced overspeed detection system.</p>
                    <button className='text-sm rounded-xl bg-green-700 px-2 py-1 text-white'>Explore</button>
                </div>
                <div className='py-5 px-2 flex flex-col justify-center items-center gap-2 rounded-lg cursor-pointer bg-white'>
                    <Image className='h-60 object-cover' src={"/noise.jpg"} alt="Noise Detection" width={1000} height={1000} />
                    <h2 className='text-lg font-semibold text-center text-green-700'>Noise Detection</h2>
                    <p className='text-sm text-center text-[#376358]'>Monitor noise levels to ensure a peaceful and safe environment.</p>
                    <button className='text-sm rounded-xl bg-green-700 px-2 py-1 text-white'>Explore</button>
                </div>
                <div className='py-5 px-2 flex flex-col justify-center items-center gap-2 rounded-lg cursor-pointer bg-white'>
                    <Image className='h-60 object-cover' src={"/overcrowding.png"} alt="Overcrowding Detection" width={1000} height={1000} />
                    <h2 className='text-lg font-semibold text-center text-green-700'>Overcrowding Detection</h2>
                    <p className='text-sm text-center text-[#376358]'>Detect and manage overcrowding for safer public spaces.</p>
                    <button className='text-sm rounded-xl bg-green-700 px-2 py-1 text-white'>Explore</button>
                </div>
                <div className='py-5 px-2 flex flex-col justify-center items-center gap-2 rounded-lg cursor-pointer bg-white'>
                    <Image className='h-60 object-cover' src={"/feedback.jpg"} alt="Feedback Section" width={1000} height={1000} />
                    <h2 className='text-lg font-semibold text-center text-green-700'>Feedback Section</h2>
                    <p className='text-sm text-center text-[#376358]'>Share your thoughts and experiences for continuous improvement.</p>
                    <Link href={"/services/feedback"} className='text-sm rounded-xl bg-green-700 px-2 py-1 text-white'>Explore</Link>
                </div>
                
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Services
