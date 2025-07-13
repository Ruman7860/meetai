"use client"
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'

const Home = () => {
    const trpc = useTRPC();
    const {data} = useQuery(trpc.hello.queryOptions({text: "Ruman"}));
    return (
        <div className='flex flex-col'>
            {data?.greeting}
        </div>
    )
}

export default Home