'use client';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'
import { DataTable } from './data-table';
import { columns } from './columns';
import { EmptyState } from '@/components/empty-state';
import { useAgentsFilters } from '@/modules/agents/hooks/useAgentFilters';
import DataPagination from './data-pagination';

const AgentsView = () => {
  const [filters,setFilters] = useAgentsFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
    ...filters
  }));

  return (
    <div className='flex flex-col justify-center items-center'>
      <DataTable
        data={data.items}
        columns={columns}
      />
      <DataPagination
        page = {filters.page}
        totalPages = {data.totalPages}
        onPageChange = {(page : number) => setFilters({page})}
      />
      {data.items.length === 0 && (
        <EmptyState
          title = "Create Your first agent"
          description='Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call'
        />
      )}
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