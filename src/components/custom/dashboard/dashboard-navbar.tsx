'use client';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { PanelLeftClose, PanelLeftIcon, SearchIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import DashboardCommand from './dashboard-command';

const DashboardNavbar = () => {
    const { state, toggleSidebar, isMobile } = useSidebar();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === 'k' && (e.metaKey || e.ctrlKey)){
                e.preventDefault();
                setOpen((prev) => !prev)
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    },[])
    return (
        <>
            <DashboardCommand
                open={open}
                setOpen={setOpen}
            />
            <nav className='flex px-4 gap-x-4 items-center py-3 border-b bg-background'>
                <Button onClick={toggleSidebar} variant={'outline'} className='size-9 cursor-pointer'>
                    {(isMobile || state === 'collapsed') ? <PanelLeftIcon className='size-4' /> : <PanelLeftClose className='size-4' />}
                </Button>
                <Button
                    className='h-9 w-[240px] justify-start font-normal text-muted-foreground    hover:text-muted-foreground cursor-pointer'
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => {setOpen((prev) => !prev)}}
                >
                    <SearchIcon />
                    Search ...
                    <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100'>
                        <span className='text-sm'>&#8984;</span>K
                    </kbd>
                </Button>
            </nav>
        </>
    )
}

export default DashboardNavbar