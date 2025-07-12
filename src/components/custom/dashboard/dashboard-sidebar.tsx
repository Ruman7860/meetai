'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Bot, Star, VideoIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import DashboardUserButton from './dashboard-user-button'
import { useIsMobile } from '@/hooks/use-mobile'


const DashboardSideBar = () => {
    const pathName = usePathname();
    const firstSection = [
        {
            label: "Meetings",
            href: "/meetings",
            icon: VideoIcon
        },
        {
            label: "Agents",
            href: "/agents",
            icon: Bot
        }
    ]

    const secondSection = [
        {
            label: "Upgrade",
            href: "/upgrade",
            icon: Star
        }
    ]
    return (
        <Sidebar>
            <SidebarHeader className='text-sidebar-accent-foreground'>
                <Link href="/" className='flex items-center gap-2 px-2 pt-2'>
                    <Image src="/logo.svg" alt="logo" width={40} height={40} />
                    <p className='text-2xl font-semibold '>Meet AI</p>
                </Link>
            </SidebarHeader>
            <div className='px-4 py-2'>
                <Separator className='opacity-10 text-[#5D6B68] ' />
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {firstSection?.map((item, index) => (
                            <SidebarMenuItem key={item?.href}>
                                <SidebarMenuButton
                                    asChild
                                    className={cn(
                                        "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                        pathName === item?.href && "bg-linear-to-r/oklch border-[#5D6B68]/10"
                                    )}
                                    isActive={pathName === item?.href}
                                >
                                    <Link href={item?.href}>
                                        <item.icon size={20} />
                                        <span className='text-sm font-medium tracking-tight'>
                                            {item?.label}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
                <div className='px-4 py-2'>
                    <Separator className='opacity-10 text-[#5D6B68] ' />
                </div>
                <SidebarGroup>
                    <SidebarMenu>
                        {secondSection?.map((item, index) => (
                            <SidebarMenuItem key={item?.href}>
                                <SidebarMenuButton
                                    asChild
                                    className={cn(
                                        "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                        pathName === item?.href && "bg-linear-to-r/oklch border-[#5D6B68]/10"
                                    )}
                                    isActive={pathName === item?.href}
                                >
                                    <Link href={item?.href}>
                                        <item.icon size={20} />
                                        <span className='text-sm font-medium tracking-tight'>
                                            {item?.label}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className='text-white'>
                <DashboardUserButton/>
            </SidebarFooter>
        </Sidebar>
    )
}

export default DashboardSideBar