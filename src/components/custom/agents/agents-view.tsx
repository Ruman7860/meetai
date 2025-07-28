'use client';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'

const AgentsView = () => {
  const trpc = useTRPC();
  const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div>
      {JSON.stringify(data,null,2)}
    </div>
  )
}
export default AgentsView;

export const AgentViewLoading = () => {
  return <LoadingState
      title="Loading Agents..."
      description="This may take a few seconds..."
    />
}

export const AgentViewError = () => {
  return <ErrorState
      title="Error Loading Agents..."
      description="Unable to load agents. Please try again."
    />
}