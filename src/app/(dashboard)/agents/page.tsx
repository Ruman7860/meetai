import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import AgentsView, { AgentViewError, AgentViewLoading } from '@/components/custom/agents/agents-view'
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from 'react';
import AgentListHeader from '@/components/custom/agents/agents-list-header';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { loadSearchParams } from '@/modules/agents/params';
import type { SearchParams } from 'nuqs/server'

interface Props {
  searchParams : Promise<SearchParams>
}
const Page = async ({searchParams}:Props) => {
  const filters = await loadSearchParams(searchParams)
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session){
    redirect("/sign-in")
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
    ...filters
  }));

  return (
    <>
      <AgentListHeader/>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentViewLoading/>} >
          <ErrorBoundary fallback={<AgentViewError/>}>
            {/* Main Component */}
            <AgentsView/>
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  )
}

export default Page