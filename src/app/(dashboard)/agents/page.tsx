import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import AgentsView, { AgentViewError, AgentViewLoading } from '@/components/custom/agents/agents-view'
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from 'react';

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentViewLoading/>} >
        <ErrorBoundary fallback={<AgentViewError/>}>
          {/* Main Component */}
          <AgentsView/>
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page