"use client"

import { GeneratedAvatar } from "@/components/generated-avatar"
import { Badge } from "@/components/ui/badge"
import { AgentGetOne } from "@/modules/agents/type"
import { ColumnDef } from "@tanstack/react-table"
import { CornerDownRightIcon, VideoIcon } from "lucide-react"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar
            seed={row.original.name}
            variant="botttsNeutral"
            className="size-6"
          />
          <span className="font-semibold capitalize">
            {row.original.name}
          </span>
        </div>
        <div className="flex items-center gap-x-1">
          <CornerDownRightIcon className="size-3 text-muted-foreground" />
          <span className="text-sm text-muted-foreground max-w-[200px] truncate">
            {row.original.instructions}
          </span>
        </div>

      </div>
    )
  },
  {
    accessorKey:"meetingCount",
    header:"Meetings",
    cell:({row}) => (
      <Badge
        variant={"outline"}
        className="flex items-center gap-x-2"
      >
        <VideoIcon className="text-blue-600 font-bold [&>svg]:size-4"/>
        {/* <span>{row.original.meetingCount}</span> */}
        <span>5 Meeting Count</span>
      </Badge>
    )
  }

]