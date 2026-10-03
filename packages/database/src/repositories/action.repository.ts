import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../client";

export interface CreateActionInput {
  id: string;
  projectId: string;
  action: string;
  parameters: Record<string, unknown>;
  agentId: string;
  agentName?: string;
  agentVersion?: string;
  environment: string;
  sessionId?: string;
  traceId?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
  requestedAt: Date;
}

export async function createAction(input: CreateActionInput) {
  return prisma.action.create({
    data: {
      id: input.id,
      projectId: input.projectId,
      action: input.action,

      parameters: input.parameters as Prisma.InputJsonValue,

      agentId: input.agentId,
      agentName: input.agentName,
      agentVersion: input.agentVersion,
      environment: input.environment,
      sessionId: input.sessionId,
      traceId: input.traceId,
      userId: input.userId,

      metadata: input.metadata
        ? (input.metadata as Prisma.InputJsonValue)
        : undefined,

      requestedAt: input.requestedAt,
    },
  });
}

export async function getActionById(id: string) {
  return prisma.action.findUnique({
    where: {
      id,
    },
  });
}

export async function listActionsByProject(projectId: string) {
  return prisma.action.findMany({
    where: {
      projectId,
    },
    orderBy: {
      requestedAt: "desc",
    },
  });
}