'use client';
import ResponsiveDialog from '@/components/responsive-dialog';
import { Button } from '@/components/ui/button';
import React from 'react';
import AgentCreateEditForm from './agent-form';

interface AgentAddDialogProps {
    open: boolean;
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

const AgentAddDialog = ({open,onOpenChange}:AgentAddDialogProps) => {
  return (
    <ResponsiveDialog
        open = {open}
        onOpenChange={onOpenChange}
        title="Add Agent"
        description="Add a new agent"
    >
      <AgentCreateEditForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  )
}

export default AgentAddDialog