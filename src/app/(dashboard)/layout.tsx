
import DashboardSideBar from '@/components/custom/dashboard/dashboard-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
interface Props {
    children: React.ReactNode
}
const Layout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            <DashboardSideBar />
            <main>
                {children}
            </main>
        </SidebarProvider>
    )
}

export default Layout