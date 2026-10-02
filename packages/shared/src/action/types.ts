export type ActionId = string;
export type ProjectId = string;
export type AgentId = string;
export type ToolId = string;
export type TraceId = string;

export type Environment =
  | "development"
  | "staging"
  | "production";

export interface ActionAgent {
  id: AgentId;
  name?: string;
  version?: string;
}

export interface ActionContext {
  environment: Environment;
  sessionId?: string;
  traceId?: TraceId;
  userId?: string;
  metadata?: Record<string, unknown>;
}

export interface ActionRequest {
  id: ActionId;
  projectId: ProjectId;

  action: string;
  parameters: Record<string, unknown>;

  agent: ActionAgent;

  tool?: {
    id: ToolId;
    name: string;
  };

  context: ActionContext;

  requestedAt: string;
}