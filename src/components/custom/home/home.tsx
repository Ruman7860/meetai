"use client"
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Home = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    if (!session) {
        return <div>Loading</div>
    }
    return (
        <div className='flex flex-col  '>
            <p>User logged in :</p>
            <p>{session.user?.email}</p>
            <p>{session.user?.name}</p>
            <Button
                variant={"destructive"}
                onClick={() => authClient.signOut({
                    fetchOptions: {
                        onSuccess: () => {
                            router.push("/sign-in")
                        }
                    }
                })}
            >
                Sign Out
            </Button>
        </div>
    )
}

export default Home