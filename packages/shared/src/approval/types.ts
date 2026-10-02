import type { ActionId, AgentId, ProjectId } from "../action/types";

export type ApprovalId = string;

export type ApprovalStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "expired"
  | "cancelled";

export type ApprovalDecision =
  | "approve"
  | "reject";

export interface ApprovalRequest {
  id: ApprovalId;

  projectId: ProjectId;
  actionId: ActionId;

  agentId: AgentId;

  reason: string;

  status: ApprovalStatus;

  requestedAt: string;
  expiresAt?: string;

  decidedAt?: string;
  decidedBy?: string;

  metadata?: Record<string, unknown>;
}