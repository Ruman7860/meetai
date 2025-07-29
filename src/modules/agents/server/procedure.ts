import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { agentByIdSchema, agentFilterPaginationSchema, agentInsertSchema } from "../schemas/agents-schema";
import { and, count, desc, eq, ilike } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  getOne: protectedProcedure
  .input(agentByIdSchema)
  .query(async ({input}) => {
    const [agentById] = 
      await db
        .select()
        .from(agents)
        .where(eq(agents.id,input.id))
        .limit(1)
    
    if(!agentById){
      throw new TRPCError({code : "NOT_FOUND", message: "Agent not exists"})
    }

    return agentById;
  }),
  getMany: protectedProcedure
    .input(agentFilterPaginationSchema)
    .query(async ({input, ctx}) => {
      const {search, page, pageSize} = input
      const agentData = 
        await db
          .select()
          .from(agents)
          .where(
            and(
              eq(agents.userId,ctx.auth.session.userId),
              search ? ilike(agents.name,`%${search}%`) : undefined
            )
          ).orderBy(desc(agents.createdAt))
          .limit(pageSize)
          .offset((page-1) * pageSize);
      
      const [total] = 
        await 
          db.select({count : count()})
            .from(agents)
            .where(
              and(
                eq(agents.userId,ctx.auth.session.userId),
                search? ilike(agents.name,`%${search}%`) : undefined
              )
            );
      const totalPages = Math.ceil(total.count / pageSize)
      return {
        items:agentData,
        total: total.count,
        totalPages
      };
  }),

  create: protectedProcedure
    .input(agentInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const { auth } = ctx;
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: auth.session.userId
        })
        .returning();

      return createdAgent;
    }),
});