"use client";
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import AgentAddDialog from './agent-add-dialog';

const AgentListHeader = () => {
  const [isDialogOpen,setIsDialogOpen] = useState(false);
  return (
    <div className='py-4 px-4 md:px-8 flrx flex-col gap-y-4'>
      <div className='flex items-center justify-between'>
        <h5 className='font-medium text-xl'>My Agents</h5>
        <Button onClick={() => {
          setIsDialogOpen(true)
        }} className='cursor-pointer'>
          <Plus className='h-4 w-4'/>
          New Agent
        </Button>
      </div>
      <AgentAddDialog
        open={isDialogOpen}
        onOpenChange = {setIsDialogOpen}
      />
    </div>
  )
}

export default AgentListHeader