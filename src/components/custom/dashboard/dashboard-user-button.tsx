'use client';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { authClient } from '@/lib/auth-client'
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const DashboardUserButton = () => {
    const { data, isPending } = authClient?.useSession();
    const router = useRouter();
    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions:{
                onSuccess: () => router.push("/sign-in")
            }
        });
    }
    if (isPending || !data?.user) {
        return null;
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='rounded-lg border border-border/10 p-3 w-full flex gap-3 items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden '>
                {data.user.image ?
                    <Avatar>
                        <AvatarImage src={data.user.image} />
                    </Avatar>
                    : <GeneratedAvatar seed={data.user.name} variant='initials' />}
                <div className='flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0'>
                    <p className='text-sm w-full truncate'>
                        {data.user.name}
                    </p>
                    <p className='text-xs w-full truncate'>
                        {data.user.email}
                    </p>
                </div>
                <ChevronDownIcon className='size-5' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' side='top' className='w-full'>
                <DropdownMenuLabel className='font-normal flex flex-col gap-1'>
                    <span className='text-sm w-full truncate '>{data.user.name}</span>
                    <span className='text-xs w-full truncate'>{data.user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem >
                    <CreditCardIcon className='size-4'/>
                    Billing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} >
                    <LogOutIcon className='size-4'/>
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DashboardUserButton