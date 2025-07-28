import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { agentByIdSchema, agentInsertSchema } from "../schemas/agents-schema";
import { eq } from "drizzle-orm";

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
  getMany: protectedProcedure.query(async () => {
    const agentData = await db.select().from(agents);
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return agentData;
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