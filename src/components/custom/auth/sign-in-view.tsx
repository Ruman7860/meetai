'use client';
import { authClient } from '@/lib/auth-client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { OctagonAlertIcon } from 'lucide-react';
import { FaGithub, FaGoogle } from "react-icons/fa";
import { AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';

const formSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email' }),
    password: z.string().min(1, { message: 'Password is required' }),
});

const SignInView = () => {
    const router = useRouter();
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSocial = (provider: "github" | "google") => {
        setError(null);
        setLoading(true);

        authClient.signIn.social(
            {
                provider: provider,
                callbackURL: "/"
            },
            {
                onError: ({ error }) => {
                    setError(error.message);
                    setLoading(false);
                    toast.error(error.message || "Something went wrong");
                },
                onSuccess: () => {
                    setLoading(false);
                }
            }
        )

    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        const toastId = toast.loading("Signing in...");
        setError(null);
        authClient.signIn.email(
            {
                email: values.email,
                password: values.password
            },
            {
                onSuccess: () => {
                    router.push("/");
                    setLoading(false);
                    toast.success("Signed in successfully", { id: toastId });
                },
                onError: ({ error }) => {
                    setError(error.message);
                    setLoading(false);
                    toast.error(error.message || "Something went wrong", { id: toastId });
                },

            },
        )
    };

    return (
        <Card className="w-full max-w-4xl overflow-hidden p-0 shadow-2xl">
            <CardContent className="grid grid-cols-1 md:grid-cols-2 p-0">
                {/* Left side - form */}
                <div className="flex flex-col justify-center bg-white p-10 md:p-14">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h2>
                                <p className="text-sm text-gray-500">Please sign in to your account</p>
                            </div>

                            {/* Email field */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password field */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                                disabled={loading}
                            >
                                Sign In
                            </Button>
                            {!!error && (
                                <div className="flex  items-center gap-2 p-3 bg-destructive/10 border border-red-400 rounded-lg shadow-sm animate-fade-in">
                                    <OctagonAlertIcon className="w-5 h-5 mt-1 text-red-600" />
                                    <AlertTitle className="text-sm font-medium">{error}</AlertTitle>
                                </div>
                            )}
                            <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-border" />
                                </div>
                                <span className="relative z-10 bg-white px-3 text-sm text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <Button
                                    type="button"
                                    className="w-full cursor-pointer bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-semibold"
                                    disabled={loading}
                                    onClick={() => onSocial("google")}
                                >
                                    <FaGoogle />
                                    <span className='hidden lg:inline-block'>Google</span>

                                </Button>
                                <Button
                                    type="button"
                                    className="w-full cursor-pointer bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-semibold"
                                    disabled={loading}
                                    onClick={() => onSocial("github")}
                                >
                                    <FaGithub />
                                    <span className='hidden lg:inline-block'>Github</span>
                                </Button>
                            </div>
                            <p className="text-sm text-gray-500 text-center">
                                Don&apos;t have an account?{' '}
                                <Link href={'/sign-up'} className="text-purple-600 hover:underline cursor-pointer">Sign up</Link>
                            </p>
                        </form>
                    </Form>
                </div>

                {/* Right side - image/info */}
                <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-bl from-sky-400 to-indigo-700 text-white p-10 gap-7">
                    <Image src="/logo.svg" width={100} height={100} alt="Meet AI Logo" />
                    <h1 className="text-2xl font-semibold">Meet AI</h1>
                    <p className="text-center text-sm max-w-xs">
                        Sign in and start building smarter conversations with Meet AI.
                    </p>
                </div>
            </CardContent>
        </Card>

    );
};

export default SignInView;
