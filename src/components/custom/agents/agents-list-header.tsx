"use client";
import { Button } from '@/components/ui/button';
import { Plus, SearchIcon, XCircleIcon } from 'lucide-react';
import React, { useState } from 'react'
import AgentAddDialog from './agent-add-dialog';
import { useAgentsFilters } from '@/modules/agents/hooks/useAgentFilters';
import { Input } from '@/components/ui/input';
import { DEFAULT_PAGE } from '@/constants';

const AgentListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useAgentsFilters();

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE
    })
  }

  return (
    <div className='py-4 px-4 md:px-8 flex flex-col gap-y-4'>
      <div className='flex items-center justify-between'>
        <h5 className='font-medium text-xl'>My Agents</h5>
        <Button onClick={() => {
          setIsDialogOpen(true)
        }} className='cursor-pointer'>
          <Plus className='h-4 w-4' />
          New Agent
        </Button>
      </div>
      {/* filter component */}
      <div className='flex items-center gap-x-2 p-1'>
        <div className='relative'>
          <Input
            placeholder='Filter by name'
            className='h-9 px-9 bg-white w-[200px]'
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
          />
          <SearchIcon className='size-4 absolute top-1/2 left-2 -translate-y-1/2' />
        </div>
        {isAnyFilterModified && (
            <Button 
              variant={"outline"}
              onClick={onClearFilters}
            >
              <XCircleIcon />
              Clear
            </Button>
          )
        }
      </div>

      {/* add-edit Dialog */}
      <AgentAddDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  )
}

export default AgentListHeader