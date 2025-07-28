"use client";
import { AgentGetOne } from '@/modules/agents/type';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { agentInsertSchema } from '@/modules/agents/schemas/agents-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AgentCreateEditFormProps {
    onSuccess: () => void,
    onCancel: () => void,
    initialValues?: AgentGetOne
}

const AgentCreateEditForm = ({ onSuccess, onCancel, initialValues }: AgentCreateEditFormProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const createAgent = useMutation(trpc.agents.create.mutationOptions({
        onSuccess: () => {
            queryClient.invalidateQueries(
                trpc.agents.getMany.queryOptions(),
            )

            if(initialValues?.id){
                trpc.agents.getOne.queryOptions({id: initialValues?.id})
            }

            toast.success("Agent created successfully")
            onSuccess?.()
        },
        onError: (error) => {
            toast.error(error?.message);

            // TODO: check if error code is forbidden, redirect to "/upgrade"
        }
    }))

    const form = useForm<z.infer<typeof agentInsertSchema>>({
        resolver: zodResolver(agentInsertSchema),
        defaultValues: {
            name: initialValues ? initialValues.name : "",
            instructions: initialValues ? initialValues.instructions : ""
        }
    })
    const isEdit = !!(initialValues?.id)
    const isPending = createAgent.isPending;

    const onSubmit = (values: z.infer<typeof agentInsertSchema>) => {
        if (isEdit) {
            console.log("TODO: implement edit ")
        }
        else {
            createAgent.mutate(values);
        }
    }
    return (
        <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                <GeneratedAvatar
                    seed={form.watch('name')}
                    variant='botttsNeutral'
                    className='border size-16'
                />
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className=''>
                            <FormLabel>Name</FormLabel>
                            <FormControl className='outline-none'>
                                <Input className=' outline-none' placeholder='Enter Name' {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    name="instructions"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Textarea placeholder='You are a helpful math assistant that can answer questions and help with assignments' {...field} />
                            </FormControl>
                                     <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className='flex gap-5'>
                    {onCancel &&
                        <Button
                            variant={'destructive'}
                            disabled={isPending}
                            onClick={() => onCancel()}
                            type='button'
                        >
                            Cancel
                        </Button>
                    }
                    <Button
                        disabled={isPending}
                        type='submit'
                    >
                        {isEdit ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default AgentCreateEditForm