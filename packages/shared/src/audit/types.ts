import type {
  ActionId,
  AgentId,
  ProjectId,
} from "../action/types";

import type { DecisionOutcome } from "../decision/types";

export type AuditEventId = string;

export type AuditEventType =
  | "action.requested"
  | "action.allowed"
  | "action.denied"
  | "action.approval_required"
  | "action.executed"
  | "action.failed"
  | "action.blocked"
  | "approval.created"
  | "approval.approved"
  | "approval.rejected"
  | "policy.evaluated"
  | "risk.assessed";

export interface AuditEvent {
  id: AuditEventId;

  projectId: ProjectId;

  actionId?: ActionId;

  agentId?: AgentId;

  type: AuditEventType;

  outcome?: DecisionOutcome;

  timestamp: string;

  actor?: {
    type: "agent" | "user" | "system";
    id: string;
  };

  data?: Record<string, unknown>;

  metadata?: Record<string, unknown>;
}