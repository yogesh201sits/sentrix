import type { ActionId, ProjectId } from "../action/types";

export type RiskLevel =
  | "low"
  | "medium"
  | "high"
  | "critical";

export type RiskFactorType =
  | "tool_capability"
  | "data_sensitivity"
  | "action_type"
  | "environment"
  | "agent"
  | "user"
  | "amount"
  | "frequency"
  | "custom";

export interface RiskFactor {
  type: RiskFactorType;

  name: string;

  score: number;

  reason: string;

  metadata?: Record<string, unknown>;
}

export interface RiskAssessment {
  actionId: ActionId;
  projectId: ProjectId;

  score: number;

  level: RiskLevel;

  factors: RiskFactor[];

  assessedAt: string;
}