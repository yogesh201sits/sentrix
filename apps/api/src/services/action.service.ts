import { randomUUID } from "node:crypto";

import { createAction } from "@sentrix/database";

import type { CreateActionInput } from "../schemas/action";

export async function createActionService(
  projectId: string,
  input: CreateActionInput,
) {
  return createAction({
    id: randomUUID(),
    projectId,
    action: input.action,
    parameters: input.parameters,

    agentId: input.agent.id,
    agentName: input.agent.name,
    agentVersion: input.agent.version,

    environment: input.context.environment,
    sessionId: input.context.sessionId,
    traceId: input.context.traceId,
    userId: input.context.userId,
    metadata: input.context.metadata,

    requestedAt: input.requestedAt
      ? new Date(input.requestedAt)
      : new Date(),
  });
}