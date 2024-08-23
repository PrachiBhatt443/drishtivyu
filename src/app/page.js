"use client"; 

import { Container, Typography, Button, Grid, Paper, Box } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className='pt-[80px]'>
      <Image className='w-screen h-[75vh] ' src="/smc3.avif" alt="logo" width={1000} height={1000} />
    </div>
  );
}
